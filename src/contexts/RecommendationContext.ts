import { createContext } from 'react';

const RecommendationContext = createContext({
  generateRecommendations: undefined,
  listOfSeedGenres: [] as Array<string>,
});

export default RecommendationContext;