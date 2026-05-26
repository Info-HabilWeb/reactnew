import React, { useEffect } from 'react';
import { X, Film } from 'lucide-react';

export default function CharacterModal({ character, isOpen, onClose }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!character) return null;

  const { name, image, status, species, gender, type, location, origin, episode } = character;

  // Extract episode numbers from URLs
  const getEpisodeNumbers = (episodesList) => {
    if (!episodesList) return [];
    return episodesList.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
  };

  const episodeNumbers = getEpisodeNumbers(episode);

  const translateStatus = (s) => {
    switch (s?.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Muerto';
      default: return 'Desconocido';
    }
  };

  const translateGender = (g) => {
    switch (g?.toLowerCase()) {
      case 'female': return 'Femenino';
      case 'male': return 'Masculino';
      case 'genderless': return 'Sin género';
      default: return 'Desconocido';
    }
  };

  return (
    <div 
      id="character-details-modal"
      className={`modal-overlay ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          id="close-modal-btn"
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Header Section */}
          <div className="modal-header-section">
            <div className="modal-avatar-wrapper">
              <img src={image} alt={name} className="modal-avatar" />
            </div>
            
            <div className="modal-title-info">
              <h2 className="modal-title" id="modal-character-name">{name}</h2>
              <div className="modal-badges">
                <span className={`badge-item status-${status?.toLowerCase()}`}>
                  {translateStatus(status)}
                </span>
                <span className="badge-item species">
                  {species}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="modal-details-grid">
            <div>
              <p className="detail-item-title">Género</p>
              <p className="detail-item-value">{translateGender(gender)}</p>
            </div>
            <div>
              <p className="detail-item-title">Subtipo / Tipo</p>
              <p className="detail-item-value">{type || 'N/A'}</p>
            </div>
            <div>
              <p className="detail-item-title">Origen</p>
              <p className="detail-item-value">{origin?.name || 'Desconocido'}</p>
            </div>
            <div>
              <p className="detail-item-title">Última Ubicación</p>
              <p className="detail-item-value">{location?.name || 'Desconocida'}</p>
            </div>
          </div>

          {/* Episodes List */}
          <div className="episodes-section">
            <h4 className="episodes-title">
              <Film size={18} className="text-primary" />
              Episodios en los que aparece ({episodeNumbers.length})
            </h4>
            
            <div className="episodes-grid" id="modal-episodes-list">
              {episodeNumbers.map((num) => (
                <div key={num} className="episode-tag">
                  Episodio {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
