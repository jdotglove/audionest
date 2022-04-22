import { createContext } from 'react';

const TrackContext = createContext({
  getTrackAudioFeatures: undefined,
  getTrackAudioAnalysis: undefined,
});

export default TrackContext;