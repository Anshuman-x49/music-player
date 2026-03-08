import React from 'react';
import TopHeader from '../components/TopHeader';

const Search = () => {
  return (
    <main className="main-content">
      <div className="library-bg-decor"></div>
      
      <TopHeader />

      <div className="search-container">
         <div className="search-icon-lg">
            <span className="material-symbols-outlined text-5xl text-slate-400">search</span>
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Search Something New</h2>
         <p className="text-slate-400 text-center" style={{maxWidth: '24rem'}}>Discover your next favorite song, playlist, or artist in our vast library.</p>
         
         <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-input-icon">search</span>
            <input 
              className="search-input" 
              placeholder="What do you want to listen to?" 
              type="text" 
            />
          </div>
      </div>
    </main>
  );
};

export default Search;
