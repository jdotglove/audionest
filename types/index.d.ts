/// <reference types="spotify-api" />

interface BaseSpotifyState {
  authorizationError: boolean;
}

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

export interface SpotifyProviderState extends BaseSpotifyState {
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
  seenInfoModal: boolean;
  token: any;
  topArtists: Array<any>;
  topTracks: Array<any>;
  trackSearchResults: Array<any>;
}

export interface PlaylistProviderState extends BaseSpotifyState {
  selectedTracks: any;
  showPlaylistBuilder: boolean;
};

export interface RecommendationProviderState extends BaseSpotifyState {
  currentTrackBreakdown: any;
  listOfSeedGenres: Array<Audionest.Track['genre']>;
  recommendedTrackList: Array<any>;
  queueAddResult: string;
  seedAddResult: string;
  showQueueAlert: boolean;
  showSeedAlert: boolean;
  selectedSeedArtists: Array<any>;
  selectedSeedGenres: Array<string>;
  selectedSeedTracks: Array<any>;
  showSeedSearch: boolean;
  targetAudioFeaturesMap: Record<string, number>;
  noVibesAlert: boolean;
};

export interface TrackProviderState extends BaseSpotifyState
 {
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

export interface ArtistProviderState extends BaseSpotifyState {
  albums: Array<any>;
  artistId: any;
  genres: Array<string>;
  name: string;
  popularity: number;
  uri: string;
  tracks: Array<any>;
};

export interface ChartProviderState extends BaseSpotifyState {
  chartData: any;
};