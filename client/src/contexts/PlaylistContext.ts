import { createContext } from 'react';

const PlaylistContext = createContext({
  getPlaylistTracks: undefined,
});

export default PlaylistContext;