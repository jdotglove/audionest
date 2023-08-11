import { createContext } from 'react';

const RecommendationContext = createContext({
  addSeedArtist: undefined,
  addSeedTrack: undefined,
  atLeastOneSeedSelected: undefined,
  clearSelectedSeeds: undefined,
  generateRecommendations: undefined,
  handleGenreInputChange: undefined,
  listOfSeedGenres: [] as Array<string>,
  recommendedTrackList: [] as Array<any>, // TODO: come back to typing
  selectedSeedArtists: [] as Array<any>,
  selectedSeedGenres: [] as Array<string>,
  selectedSeedTracks: [] as Array<any>,
});

export default RecommendationContext;