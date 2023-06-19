import { createContext } from 'react';

const ArtistContext = createContext({
  artistId: '',
  albums: undefined,
  name: '',
  genres: [],
  popularity: 0,
  spotifyUri: '',
  tracks: [],
});

export default ArtistContext;