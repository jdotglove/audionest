import { createContext } from 'react';

const RecommendationContext = createContext({
  recommendations: undefined,
  setRecommendationData: undefined,
});

export default RecommendationContext;