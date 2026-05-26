import React from 'react';
import { Heart, Compass } from 'lucide-react';

export default function Navbar({ favoritesCount, showFavoritesOnly, setShowFavoritesOnly }) {
  return (
    <nav className="navbar" id="main-nav">
      <div className="container navbar-content">
        <a href="#" className="logo-container" id="nav-logo" onClick={(e) => {
          e.preventDefault();
          setShowFavoritesOnly(false);
        }}>
          <div className="logo-portal"></div>
          <span className="logo-text">PORTAL EXPLORER</span>
        </a>
        
        <div className="nav-actions">
          <button 
            id="toggle-favorites-btn"
            className={`fav-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? <Compass size={18} /> : <Heart size={18} />}
            <span>{showFavoritesOnly ? 'Ver Todos' : 'Ver Favoritos'}</span>
            <span className="fav-count" id="favorites-badge">{favoritesCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
