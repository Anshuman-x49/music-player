import React, { useState, useEffect } from 'react';
import { getAllTracks } from '../api/musicApi';
import { usePlayer } from '../context/PlayerContext';

const ICON_POOL = [
  { icon: 'cloud', color: 'indigo', iconColor: 'text-indigo-200' },
  { icon: 'dark_mode', color: 'pink', iconColor: 'text-pink-200' },
  { icon: 'wb_twilight', color: 'amber', iconColor: 'text-amber-200' },
  { icon: 'eco', color: 'emerald', iconColor: 'text-emerald-200' },
  { icon: 'palette', color: 'purple', iconColor: 'text-purple-200' },
  { icon: 'diamond', color: 'rose', iconColor: 'text-rose-200' },
  { icon: 'music_note', color: 'cyan', iconColor: 'text-cyan-200' },
  { icon: 'headphones', color: 'teal', iconColor: 'text-teal-200' },
];

const fallbackTracks = [
  { id: 1, title: 'Cloud Nine', artist: 'Ethereal Drifts', album: 'Skyward Anthology', date: '2 days ago', duration: '3:45', icon: 'cloud', color: 'indigo', iconColor: 'text-indigo-200' },
  { id: 2, title: 'Moonlight Glow', artist: 'Nightfall Melodies', album: 'Starlight Sessions', date: '2 days ago', duration: '4:12', icon: 'dark_mode', color: 'pink', iconColor: 'text-pink-200' },
  { id: 3, title: 'Velvet Sky', artist: 'Soft Horizons', album: 'Dusk Till Dawn', date: '5 days ago', duration: '2:58', icon: 'wb_twilight', color: 'amber', iconColor: 'text-amber-200' },
  { id: 4, title: 'Morning Dew', artist: 'Nature Whisper', album: 'Forest Vibes', date: '1 week ago', duration: '4:05', icon: 'eco', color: 'emerald', iconColor: 'text-emerald-200' },
  { id: 5, title: 'Pastel Dreams', artist: 'Watercolor Beats', album: 'Canvas of Sound', date: 'Oct 12, 2023', duration: '3:20', icon: 'palette', color: 'purple', iconColor: 'text-purple-200' },
  { id: 6, title: 'Rose Quartz', artist: 'Mineral Melodies', album: 'Gems of Sound', date: 'Oct 10, 2023', duration: '5:12', icon: 'diamond', color: 'rose', iconColor: 'text-rose-200' },
];

const TrackList = () => {
  const [tracks, setTracks] = useState(fallbackTracks);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await getAllTracks();
        if (data && data.length > 0) {
          const mapped = data.map((track, idx) => {
            const style = ICON_POOL[idx % ICON_POOL.length];
            return {
              id: track._id,
              title: track.title,
              artist: track.artist?.username || 'Unknown Artist',
              album: '—',
              date: 'Recently added',
              duration: '—',
              uri: track.uri,
              ...style,
            };
          });
          setTracks(mapped);
        }
      } catch (err) {
        console.log('Using fallback tracks:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const handleTrackClick = (track) => {
    if (!track.uri) return;
    playTrack(track, tracks);
  };

  return (
    <>
      <section className="actions-bar">
        <button className="play-fab" onClick={() => tracks.length > 0 && tracks[0].uri && playTrack(tracks[0], tracks)}>
          <span className="material-symbols-outlined fill-1 text-3xl">play_arrow</span>
        </button>
        <button className="action-icon">
          <span className="material-symbols-outlined text-3xl">favorite_border</span>
        </button>
        <button className="action-icon">
          <span className="material-symbols-outlined text-3xl">more_horiz</span>
        </button>
      </section>

      <section className="tracks-section">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-slate-400, #94a3b8)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>progress_activity</span>
            <p style={{ marginTop: '0.5rem' }}>Loading tracks...</p>
          </div>
        ) : (
          <table className="tracks-table">
            <thead>
              <tr className="tracks-header">
                <th className="px-4 py-3 w-12 text-center rounded-tl-lg">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Album</th>
                <th className="px-4 py-3 hidden lg:table-cell">Date Added</th>
                <th className="px-4 py-3 text-right pr-8 rounded-tr-lg">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, idx) => {
                const isActive = currentTrack && currentTrack.id === track.id;
                return (
                  <tr key={track.id} className="track-row group cursor-pointer" onClick={() => handleTrackClick(track)}>
                    <td className="px-4 py-3 text-center">
                      {isActive && isPlaying ? (
                        <span className="material-symbols-outlined text-primary text-sm">equalizer</span>
                      ) : (
                        <>
                          <span className="track-num group-hover:hidden">{idx + 1}</span>
                          <span className="material-symbols-outlined hidden group-hover:inline-block text-white text-sm">play_arrow</span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="track-title-cell">
                        <div className={`track-icon bg-${track.color}-400-30 ${track.iconColor}`}>
                          <span className="material-symbols-outlined text-xl">{track.icon}</span>
                        </div>
                        <div className="track-info">
                          <span className={`font-bold transition-colors ${isActive ? 'text-primary' : 'text-slate-100 group-hover:text-primary'}`}>{track.title}</span>
                          <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{track.artist}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-400 text-sm">{track.album}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-sm">{track.date}</td>
                    <td className="px-4 py-3 text-right pr-8 text-slate-400 text-sm">{track.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default TrackList;

