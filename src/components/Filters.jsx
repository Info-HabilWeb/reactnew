import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export default function Filters({
  search,
  setSearch,
  status,
  setStatus,
  gender,
  setGender,
  species,
  setSpecies,
  onClear
}) {
  return (
    <section className="search-filter-section" id="filters-container">
      {/* Search Input */}
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          id="search-input-field"
          type="text"
          placeholder="Buscar personaje (ej: Rick Sanchez, Morty Smith)..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Selects Grid */}
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="status-select" className="filter-label">Estado</label>
          <select
            id="status-select"
            className="filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender-select" className="filter-label">Género</label>
          <select
            id="gender-select"
            className="filter-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="species-select" className="filter-label">Especie</label>
          <select
            id="species-select"
            className="filter-select"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="human">Humano</option>
            <option value="alien">Alienígena</option>
            <option value="humanoid">Humanoide</option>
            <option value="poopybutthole">Poopybutthole</option>
            <option value="mythological creature">Criatura Mitológica</option>
            <option value="robot">Robot</option>
            <option value="cronenberg">Cronenberg</option>
            <option value="disease">Enfermedad</option>
            <option value="animal">Animal</option>
          </select>
        </div>

        <button 
          id="clear-filters-btn"
          className="clear-btn" 
          onClick={onClear}
        >
          <RotateCcw size={16} />
          Limpiar
        </button>
      </div>
    </section>
  );
}
