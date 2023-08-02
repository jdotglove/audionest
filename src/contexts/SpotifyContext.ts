import { createContext } from 'react';

const SpotifyContext = createContext({
  artistSearchResults: undefined,
  authenticateSpotifyUser: undefined,
  currentSelectedPlaylist: undefined,
  currentSelectedTracks: undefined,
  getSeedRecommendations: undefined,
  getAvailableGenreSeeds: undefined,
  isLoggedIn: undefined,
  login: undefined,
  recommendations: undefined,
  playlists: undefined,
  searchItems: undefined,
  setSelectedPlaylist: undefined,
  setSelectedTracks: undefined,
  trackSearchResults: undefined,
  topArtists: undefined as Audionest.Artist['_id'][],
  topTracks: undefined as Audionest.Track['_id'][],
  user: undefined as Audionest.User,
});

export default SpotifyContext;