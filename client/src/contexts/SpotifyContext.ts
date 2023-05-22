import { createContext } from 'react';

const SpotifyContext = createContext({
  authenticateSpotifyUser: undefined,
  currentSelectedPlaylist: undefined,
  currentSelectedTracks: undefined,
  getSeedRecommendations: undefined,
  getAvailableGenreSeeds: undefined,
  isLoggedIn: undefined,
  login: undefined,
  recommendations: undefined,
  playlists: undefined,
  setSelectedPlaylist: undefined,
  setSelectedTracks: undefined,
  topTracks: undefined,
  user: undefined,
});

export default SpotifyContext;