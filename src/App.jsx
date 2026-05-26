import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import { ChevronLeft, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  // --- States ---
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ pages: 1, count: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter States
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');

  // Favorites System
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rickmorty_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modal State
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Debounce search text ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on new search
    }, 450);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Reset page when dropdown filters change
  useEffect(() => {
    setPage(1);
  }, [status, gender, species]);

  // --- Fetch Characters from API ---
  const fetchCharacters = useCallback(async () => {
    if (showFavoritesOnly) return; // Skip API fetch if displaying favorites

    setLoading(true);
    setError(null);

    // Build URL query params extraction of characters from API.
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(debouncedSearch && { name: debouncedSearch }),
      ...(status && { status }),
      ...(gender && { gender }),
      ...(species && { species }),
    });

    const url = `https://rickandmortyapi.com/api/character/?${queryParams.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          // No results found
          setCharacters([]);
          setInfo({ pages: 1, count: 0 });
          return;
        }
        throw new Error('Ocurrió un error al obtener los personajes');
      }

      const data = await response.json();
      setCharacters(data.results || []);
      setInfo(data.info || { pages: 1, count: 0 });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error de conexión con el portal de datos.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status, gender, species, showFavoritesOnly]);

  // Trigger fetch when dependencies change
  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // --- Local Storage Synchronization ---
  useEffect(() => {
    localStorage.setItem('rickmorty_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // --- Toggle Favorite Handler ---
  const handleToggleFavorite = (character) => {
    setFavorites((prevFavs) => {
      const isFav = prevFavs.some((fav) => fav.id === character.id);
      if (isFav) {
        return prevFavs.filter((fav) => fav.id !== character.id);
      } else {
        return [...prevFavs, character];
      }
    });
  };

  // --- Detail Modal Handlers ---
  const handleOpenModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Keep character selected for close animation, clear it after
    setTimeout(() => {
      setSelectedCharacter(null);
    }, 300);
  };

  // --- Clear Filters Handler ---
  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
    setGender('');
    setSpecies('');
    setPage(1);
  };

  // --- Local Filtering for Favorites View ---
  const getFilteredFavorites = () => {
    return favorites.filter((char) => {
      const matchName = char.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = status ? char.status?.toLowerCase() === status.toLowerCase() : true;
      const matchGender = gender ? char.gender?.toLowerCase() === gender.toLowerCase() : true;
      const matchSpecies = species ? char.species?.toLowerCase() === species.toLowerCase() : true;
      return matchName && matchStatus && matchGender && matchSpecies;
    });
  };

  // Decide source of characters based on view mode
  const displayedCharacters = showFavoritesOnly ? getFilteredFavorites() : characters;

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      {/* Main Content */}
      <main className="main-content container">
        {/* Search & Filters */}
        <Filters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          gender={gender}
          setGender={setGender}
          species={species}
          setSpecies={setSpecies}
          onClear={handleClearFilters}
        />

        {/* Section Header */}
        <h1 className="characters-section-title" id="section-title">
          <Sparkles size={24} className="text-primary" />
          {showFavoritesOnly
            ? `Tus Favoritos (${displayedCharacters.length})`
            : `Explorando Personajes (${info.count} en total)`
          }
        </h1>

        {/* Loading Spinner */}
        {loading && (
          <div className="loader-container" id="api-loader">
            <div className="portal-loader"></div>
            <p className="loader-text">Abriendo Portal Interdimensional...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="empty-state" id="api-error-state">
            <AlertCircle size={48} className="empty-state-icon" style={{ color: '#ef4444' }} />
            <h3>¡Error en el Portal!</h3>
            <p>{error}</p>
            <button className="view-btn" onClick={fetchCharacters} style={{ marginTop: '16px', width: 'auto', padding: '10px 24px' }}>
              Reintentar Conexión
            </button>
          </div>
        )}

        {/* Grid & Render */}
        {!loading && !error && (
          <>
            {displayedCharacters.length === 0 ? (
              <div className="empty-state" id="empty-results-state">
                <AlertCircle size={48} className="empty-state-icon" />
                <h3>No se encontraron personajes</h3>
                <p>Intenta ajustar o limpiar los filtros de búsqueda.</p>
                <button className="view-btn" onClick={handleClearFilters} style={{ marginTop: '16px', width: 'auto', padding: '10px 24px' }}>
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="characters-grid" id="characters-display-grid">
                {displayedCharacters.map((char) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    isFavorite={favorites.some((fav) => fav.id === char.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={handleOpenModal}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls (Hide if viewing favorites) */}
            {!showFavoritesOnly && displayedCharacters.length > 0 && info.pages > 1 && (
              <div className="pagination" id="pagination-controls">
                <button
                  id="prev-page-btn"
                  className="page-btn"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="page-info">
                  Página <strong className="page-current" id="current-page-num">{page}</strong> de <span id="total-pages-num">{info.pages}</span>
                </span>

                <button
                  id="next-page-btn"
                  className="page-btn"
                  onClick={() => setPage((prev) => Math.min(prev + 1, info.pages))}
                  disabled={page === info.pages}
                  aria-label="Página siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer" id="main-footer">
        <div className="container footer-content">
          <p>© 2026 Rick & Morty Portal Explorer. Desarrollado como demo.</p>
          <div className="footer-tech">
            <span className="tech-badge react">React</span>
            <span className="tech-badge vite">Vite</span>
            <span className="tech-badge cpanel">cPanel</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
