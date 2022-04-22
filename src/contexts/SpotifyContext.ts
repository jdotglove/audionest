import { createContext } from 'react';

const SpotifyContext = createContext({
  user: undefined,
  isLoggedIn: undefined,
  login: undefined,
  getUserPlaylists: undefined,
  playlists: undefined,
  getSeedRecommendations: undefined,
  getAvailableGenreSeeds: undefined,
  setSelectedPlaylist: undefined,
  currentSelectedPlaylist: undefined,
  recommendations: undefined,
});

export default SpotifyContext;