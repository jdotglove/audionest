/// <reference types="spotify-api" />

export interface SpotifyProviderProps { }

export type SelectedTrackRecord = Pick<SpotifyApi.TrackObjectFull, 'id'> & Pick<SpotifyApi.TrackObjectFull, 'name'>;

export interface SpotifyProviderState {
  authenticateSpotifyUser: Function;
  currentSelectedPlaylist: {
    id: string;
    name: string;
    tracks: Array<SpotifyApi.PlaylistObjectSimplified> | null;
  };
  currentSelectedTracks: Array<SelectedTrackRecord>;
  genreSeeds: any;
  isLoggedIn: boolean;
  playlists: Array<SpotifyApi.PlaylistObjectSimplified>;
  user: AudioNestUser | null;
  token: any;
  topTracks: Array<TrackObjectFull>;
}

export type PlaylistProviderState = {
  tracks: any;
};

export type ChartProviderState = {
  chartData: any;
};
