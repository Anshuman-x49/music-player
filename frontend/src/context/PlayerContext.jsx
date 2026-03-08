/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentTrack = currentIndex >= 0 && currentIndex < playlist.length
    ? playlist[currentIndex]
    : null;

  // Sync volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const skipNextRef = useRef(null);

  // Update time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => skipNextRef.current?.();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const playTrack = useCallback((track, trackList) => {
    if (trackList) {
      setPlaylist(trackList);
      const idx = trackList.findIndex(t => t.id === track.id);
      setCurrentIndex(idx >= 0 ? idx : 0);
    }

    const audio = audioRef.current;
    // If same track, just toggle
    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    audio.src = track.uri;
    audio.load();
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error('Playback error:', err));
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!currentTrack) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Playback error:', err));
    }
  }, [currentTrack, isPlaying]);

  const seekTo = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const skipNext = useCallback(() => {
    if (playlist.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIdx);
    const audio = audioRef.current;
    audio.src = playlist[nextIdx].uri;
    audio.load();
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error('Playback error:', err));
  }, [playlist, currentIndex]);

  // Keep ref in sync
  skipNextRef.current = skipNext;

  const skipPrev = useCallback(() => {
    if (playlist.length === 0) return;
    // If more than 3s into the track, restart; otherwise go to previous
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIdx);
    const audio = audioRef.current;
    audio.src = playlist[prevIdx].uri;
    audio.load();
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error('Playback error:', err));
  }, [playlist, currentIndex]);

  const changeVolume = useCallback((v) => {
    setVolume(Math.max(0, Math.min(1, v)));
  }, []);

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      playlist,
      playTrack,
      togglePlay,
      seekTo,
      skipNext,
      skipPrev,
      changeVolume,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
