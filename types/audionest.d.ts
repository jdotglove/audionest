declare module Audionest {
  interface DBModel {
    _id: string;
  };
  export interface Artist extends DBModel {
    genres: Array<string>;
    name: string;
    popularity: number;
    spotifyUri: string;
  };
  export interface Album extends DBModel {
    albumType: string;
    artists: Array<Artist['_id']>;
    availableMarkets: Array<string>;
    name: string;
    releaseDate: string;
    releaseDatePercision: string;
    spotifyUri: string;
    totalTracks: number;

  };
  export interface Track extends DBModel {
    album: Album['_id'];
    artists: Array<Artist['_id']>;
    availableMarkets: Array<string>;
    audioFeatures: {
      acousticness: number;
      analysisUrl: string;
      danceability: number;
      energy: number;
      instrumentalness: number;
      key: number;
      liveness: number;
      loudness: number;
      mode: number;
      speechiness: number;
      spotifyUri: string;
      tempo: number;
      timeSignature: number;
      valence: number;
    };
    explicit: boolean;
    name: string;
    popularity: number;
    spotifyUri: string;
    trackNumber: number;
  };
  export interface User extends DBModel {
    country: string;
    displayName: string;
    email: string;
    playlists: Array<Playlist['_id']>;
    spotifyUri: string;
    topArtists: Array<Artist['_id']>;
    topTracks: Array<Track['_id']>;
  };
  export interface Playlist extends DBModel {
    name: string;
    owner: User['_id'];
    spotifyUri: string;
    tracks: Array<Track['_id']>;
  };
}