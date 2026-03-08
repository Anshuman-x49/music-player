import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const playlists = [
    'Lofi Morning Melodies',
    'Dreamy Pop Essentials',
    'Soft Acoustic Chill',
    'Vaporwave Sunsets',
    'Ethereal Drifts'
  ];

  return (
    <aside className="sidebar-wrapper glass-sidebar">
      <div className="sidebar-content">
        {/* Logo/Branding */}
        <div className="logo-container">
          <div className="logo-icon pastel-gradient">
            <span className="material-symbols-outlined text-white text-2xl">blur_on</span>
          </div>
          <div className="logo-text-col">
            <h1 className="text-slate-100 text-base font-bold">Soft Vibez</h1>
            <p className="text-slate-400 text-xs font-normal">Your pastel space</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : 'inactive'}`}
          >
            <span className="material-symbols-outlined fill-1">home</span>
            <span className="text-sm font-medium">Home</span>
          </NavLink>
          <NavLink 
            to="/search" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : 'inactive'}`}
          >
            <span className="material-symbols-outlined">search</span>
            <span className="text-sm font-medium">Search</span>
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : 'inactive'}`}
          >
            <span className="material-symbols-outlined">library_music</span>
            <span className="text-sm font-medium">Your Library</span>
          </NavLink>
        </nav>
        
        {/* Playlists Section */}
        <div className="playlists-section">
          <div className="playlists-header">
            <p className="text-slate-500 text-[11px] font-bold uppercase">Playlists</p>
            <span className="material-symbols-outlined text-slate-500 text-sm cursor-pointer" style={{'&:hover': {color: 'var(--color-slate-300)'}}}>add</span>
          </div>
          <div className="playlists-list">
            {playlists.map((playlist) => (
              <a key={playlist} className="playlist-link" href="#">
                {playlist}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="user-profile">
        <div className="user-profile-btn">
          <div 
            className="logo-icon pastel-gradient" 
            style={{ width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="material-symbols-outlined text-white text-sm">person</span>
          </div>
          <span className="text-sm font-medium text-slate-300">{user?.username || 'Guest'}</span>
          <button 
            onClick={handleLogout}
            className="action-icon"
            style={{marginLeft: 'auto'}}
            title="Log out"
          >
            <span className="material-symbols-outlined text-slate-500 text-base">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
