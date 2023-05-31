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
    artists: Array<{
      reference: Artist['_id'];
      name: Artist['name'];
    }>;
    availableMarkets: Array<string>;
    name: string;
    releaseDate: string;
    releaseDatePercision: string;
    spotifyUri: string;
    totalTracks: number;

  };
  export interface Track extends DBModel {
    album: Album;
    artists: Array<{
      reference: Artist['_id'];
      name: Artist['name'];
    }>;
    availableMarkets: Array<string>;
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
    topArtists: Array<{
      name: Artist['name'];
      reference: Artists['_id'];
    }>;
    topTracks: Array<Track['_id']>;
  };
  export interface Playlist extends DBModel {
    name: string;
    owner: any;
    spotifyUri: string;
    tracks: Array<any>;
  };
}