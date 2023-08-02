/// <reference types="spotify-api" />

export interface SpotifyProviderProps { }

export interface PlaylistProviderProps { }

export interface RecommendationProviderProps { }

export interface TrackProviderProps {
  trackId: string;
}

export interface ArtistProviderProps {
  artistId: string;
}

export type SelectedTrackRecord = Pick<SpotifyApi.TrackObjectFull, 'id'> & Pick<SpotifyApi.TrackObjectFull, 'name'>;

export interface SpotifyProviderState {
  authenticateSpotifyUser: Function;
  currentSelectedPlaylist: {
    id: string;
    name: string;
    tracks: Array<Audionest.Track['_id']> | null;
  };
  currentSelectedTracks: Array<Audionest.Track['_id'] | string>;
  genreSeeds: any;
  isLoggedIn: boolean;
  playlists: Array<Audionest.Playlist['_id'] | string>;
  user: Audionest.User;
  searchItems: Function;
  token: any;
  topArtists: Array<Audionest.Artist['_id'] | string>;
  topTracks: Array<Audionest.Track['_id'] | string>;
}

export type PlaylistProviderState = {
  tracks: any;
};

export type RecommendationProviderState = {
  addSeedArtist: () => void;
  generateRecommendations: () => Audionest.Recommendation;
  listOfSeedGenres: Array<Audionest.Track['genre']>;
  selectedSeedArtists: Array<string>;
  selectedSeedGenres: Array<string>;
  selectedSeedTracks: Array<string>;
};

export type TrackProviderState = {
  album: Audionest.Album['_id'] | string,
  artists: Array<Audionest.Artist['_id'] | string>;
  audioFeatures: {
    acousticness: number;
    analysisUrl: string;
    danceability: number
    energy: number;
    instrumentalness: number;
    key: number;
    liveness: number
    loudness: number;
    mode: number;
    speechiness: number;
    spotifyUri: string;
    tempo: number;
    timeSignature: number;
    valence: number;
  },
  availableMarkets: Array<string>;
  durationMs: number;
  explicit: boolean;
  name: string;
  popularity: number;
  spotifyUri: string;
  trackNumber: number;
  trackId: Audionest.Track['_id'] | string;
};

export type ArtistProviderState = {
  albums: Array<Audionest.Album['_id'] | string>;
  artistId: Audionest.Artist['_id'] | string;
  genres: Array<string>;
  name: string;
  popularity: number;
  spotifyUri: string;
  tracks: Array<Audionest.Track['_id'] | string>;
  // TODO: come back to average audio features
  // averageAudioFeatures: {
  //   acousticness: number;
  //   analysisUrl: string;
  //   danceability: number;
  //   energy: number;
  //   instrumentalness: number;
  //   key: number;
  //   liveness: number;
  //   loudness: number;
  //   mode: number;
  //   speechiness: number;
  //   spotifyUri: string;
  //   tempo: number;
  //   timeSignature: number;
  //   valence: number;
  // },
};

export type ChartProviderState = {
  chartData: any;
};