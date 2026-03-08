import React from 'react';

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="header-chevrons">
        <button className="chevron-btn">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="chevron-btn">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <div className="header-actions">
        <button className="upgrade-btn">UPGRADE</button>
        <div className="notification-btn">
          <span className="material-symbols-outlined text-slate-400">notifications</span>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
