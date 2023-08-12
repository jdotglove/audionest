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
  artistSearchResults: Array<any>
  currentSelectedPlaylist: {
    id: string;
    name: string;
    tracks: Array<any> | null;
  };
  currentSelectedTracks: Array<any>;
  genreSeeds: any;
  isLoggedIn: boolean;
  playlists: Array<any>;
  user: Audionest.User;
  token: any;
  topArtists: Array<any>;
  topTracks: Array<any>;
  trackSearchResults: Array<any>;
}

export type PlaylistProviderState = {
  selectedTracks: any;
  showPlaylistBuilder: boolean;
};

export type RecommendationProviderState = {
  listOfSeedGenres: Array<Audionest.Track['genre']>;
  recommendedTrackList: Array<any>;
  queueAddResult: string;
  showQueueAlert: boolean;
  selectedSeedArtists: Array<any>;
  selectedSeedGenres: Array<string>;
  selectedSeedTracks: Array<any>;
};

export type RecommendationProviderState = {
  listOfSeedGenres: Array<Audionest.Track['genre']>;
  recommendedTrackList: Array<any>;
  selectedSeedArtists: Array<any>;
  selectedSeedGenres: Array<string>;
  selectedSeedTracks: Array<any>;
};

export type TrackProviderState = {
  album: any,
  artists: Array<any>;
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
    uri: string;
    tempo: number;
    timeSignature: number;
    valence: number;
  },
  availableMarkets: Array<string>;
  durationMs: number;
  explicit: boolean;
  name: string;
  popularity: number;
  uri: string;
  trackNumber: number;
  trackId: any;
};

export type ArtistProviderState = {
  albums: Array<any>;
  artistId: any;
  genres: Array<string>;
  name: string;
  popularity: number;
  uri: string;
  tracks: Array<any>;
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
  //   uri: string;
  //   tempo: number;
  //   timeSignature: number;
  //   valence: number;
  // },
};

export type ChartProviderState = {
  chartData: any;
};