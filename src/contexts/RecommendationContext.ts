import { createContext } from 'react';

const RecommendationContext = createContext({
  addSeedArtist: undefined,
  addSeedTrack: undefined,
  generateRecommendations: undefined,
  listOfSeedGenres: [] as Array<string>,
  selectedSeedArtists: [] as Array<string>,
  selectedSeedGenres: [] as Array<string>,
  selectedSeedTracks: [] as Array<string>,
});

export default RecommendationContext;