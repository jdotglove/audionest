import { createContext } from 'react';

const DiscoveryContext = createContext({
  newReleases: undefined,
  fetchNewReleases: undefined,
});

export default DiscoveryContext;