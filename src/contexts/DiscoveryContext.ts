import { createContext } from 'react';

const DiscoveryContext = createContext({
  browsingCategories: undefined,
  newReleases: undefined,
  fetchNewReleases: undefined,
});

export default DiscoveryContext;