import React from 'react';
import { Heart, Info } from 'lucide-react';

export default function CharacterCard({ character, isFavorite, onToggleFavorite, onViewDetails }) {
  const { id, name, image, status, species, gender, location, origin } = character;

  // Translation helpers
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
    <article className="character-card" id={`character-card-${id}`}>
      {/* Favorite Button */}
      <button 
        id={`fav-btn-${id}`}
        className={`fav-card-btn ${isFavorite ? 'is-fav' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(character);
        }}
        aria-label="Agregar a favoritos"
      >
        <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} />
      </button>

      {/* Image Wrapper */}
      <div className="card-img-wrapper">
        <img src={image} alt={name} className="card-img" loading="lazy" />
        
        {/* Status Badge */}
        <span className="status-badge" id={`status-badge-${id}`}>
          <span className={`status-dot ${status?.toLowerCase()}`}></span>
          {translateStatus(status)}
        </span>
      </div>

      {/* Info Container */}
      <div className="card-info">
        <h3 className="card-title" id={`card-title-${id}`}>{name}</h3>
        
        <div className="card-meta">
          <span>{species}</span>
          <span className="meta-divider">•</span>
          <span>{translateGender(gender)}</span>
        </div>

        <div className="card-detail-group">
          <span className="card-detail-label">Última ubicación:</span>
          <span className="card-detail-val">{location?.name || 'Desconocida'}</span>
        </div>

        <div className="card-detail-group" style={{ marginBottom: '20px' }}>
          <span className="card-detail-label">Origen:</span>
          <span className="card-detail-val">{origin?.name || 'Desconocido'}</span>
        </div>

        <button 
          id={`view-details-${id}`}
          className="view-btn"
          onClick={() => onViewDetails(character)}
        >
          <Info size={16} />
          Ver Detalles
        </button>
      </div>
    </article>
  );
}
