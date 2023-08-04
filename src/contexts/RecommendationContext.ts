import { createContext } from 'react';

const RecommendationContext = createContext({
  addSeedArtist: undefined,
  addSeedTrack: undefined,
  atLeastOneSeedSelected: undefined,
  generateRecommendations: undefined,
  handleGenreInputChange: undefined,
  listOfSeedGenres: [] as Array<string>,
  playlistToSave: undefined,
  recommendedTrackList: [] as Array<any>, // TODO: come back to typing
  selectedSeedArtists: [] as Array<any>,
  selectedSeedGenres: [] as Array<string>,
  selectedSeedTracks: [] as Array<any>,
});

export default RecommendationContext;