import React, { useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PlayerBar = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    skipNext,
    skipPrev,
    seekTo,
    changeVolume,
  } = usePlayer();

  const scrubberRef = useRef(null);
  const volumeRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrubberClick = (e) => {
    const rect = scrubberRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    changeVolume(ratio);
  };

  const volumeIcon = volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up';

  return (
    <footer className="player-bar glass-player">
      {/* Currently Playing */}
      <div className="player-track-info">
        <div className="player-cover">
          <span className="material-symbols-outlined text-emerald-200 text-2xl">
            {currentTrack ? 'music_note' : 'eco'}
          </span>
        </div>
        <div className="player-details">
          <a className="player-track-name" href="#">
            {currentTrack?.title || 'No track selected'}
          </a>
          <a className="player-artist-name" href="#">
            {currentTrack?.artist || '—'}
          </a>
        </div>
        <button className="action-icon" style={{marginLeft: '0.5rem'}}>
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="player-buttons">
          <button className="action-icon">
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button className="action-icon" onClick={skipPrev}>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button className="player-center-play shadow-lg shadow-white/20" onClick={togglePlay}>
             <span className="material-symbols-outlined fill-1 text-2xl">
               {isPlaying ? 'pause' : 'play_arrow'}
             </span>
          </button>
          <button className="action-icon" onClick={skipNext}>
             <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button className="action-icon">
             <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
        <div className="player-scrubber-container">
          <span className="player-time">{formatTime(currentTime)}</span>
          <div
            className="player-scrubber group"
            ref={scrubberRef}
            onClick={handleScrubberClick}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="player-scrubber-fill shadow-md shadow-primary/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="player-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="player-extras">
        <button className="action-icon">
           <span className="material-symbols-outlined text-xl">mic_external_on</span>
        </button>
        <button className="action-icon">
           <span className="material-symbols-outlined text-xl">queue_music</span>
        </button>
        <button className="action-icon">
           <span className="material-symbols-outlined text-xl">devices</span>
        </button>
        <div className="volume-container">
          <span
            className="material-symbols-outlined text-slate-400 text-xl"
            style={{ cursor: 'pointer' }}
            onClick={() => changeVolume(volume === 0 ? 0.7 : 0)}
          >
            {volumeIcon}
          </span>
          <div
            className="volume-slider group"
            ref={volumeRef}
            onClick={handleVolumeClick}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="volume-slider-fill shadow-sm"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
        <button className="action-icon">
           <span className="material-symbols-outlined text-xl">open_in_full</span>
        </button>
      </div>
    </footer>
  );
};

export default PlayerBar;

