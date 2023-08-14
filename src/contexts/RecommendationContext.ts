import { createContext } from 'react';

const RecommendationContext = createContext({
  addToQueue: undefined,
  addSeedArtist: undefined,
  addSeedTrack: undefined,
  atLeastOneSeedSelected: undefined,
  dismissAddToQueueAlert: undefined,
  clearSelectedSeeds: undefined,
  generateRecommendations: undefined,
  handleGenreInputChange: undefined,
  listOfSeedGenres: [] as Array<string>,
  recommendedTrackList: [] as Array<any>, // TODO: come back to typing
  showQueueAlert: undefined,
  queueAddResult: undefined,
  selectedSeedArtists: [] as Array<any>,
  selectedSeedGenres: [] as Array<string>,
  selectedSeedTracks: [] as Array<any>,
  showSeedSearch: undefined,
  toggleShowSeedSearch: undefined,
});

export default RecommendationContext;