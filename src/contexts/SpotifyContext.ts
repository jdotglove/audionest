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
  topArtists: undefined as Audionest.Artist[],
  topTracks: undefined as Audionest.Track[],
  user: undefined as Audionest.User,
});

export default SpotifyContext;