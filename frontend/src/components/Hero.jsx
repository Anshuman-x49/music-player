import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-image pastel-gradient">
          <span className="material-symbols-outlined text-white text-7xl opacity-50">auto_awesome</span>
        </div>
        <div className="hero-details">
          <span className="text-xs font-bold text-primary uppercase" style={{letterSpacing: '0.2em'}}>Playlist</span>
          <h2 className="text-6xl font-black text-white" style={{letterSpacing: '-0.025em', marginBottom: '0.5rem'}}>Soft Vibez</h2>
          <div className="hero-meta">
            <span className="font-bold text-white">Alex Rivera</span>
            <span className="meta-dot"></span>
            <span>1,248 likes</span>
            <span className="meta-dot"></span>
            <span>24 songs, <span className="text-slate-400">1 hr 12 min</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
