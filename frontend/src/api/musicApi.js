import api from './axios';

export const getAllTracks = async () => {
  const response = await api.get('/music/all');
  return response.data.tracks;
};

export const getAllAlbums = async () => {
  const response = await api.get('/music/albums');
  return response.data.albums;
};

export const searchTracks = async (query) => {
  const response = await api.get(`/music/search?q=${encodeURIComponent(query)}`);
  return response.data.tracks;
};
