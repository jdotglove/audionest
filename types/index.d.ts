/// <reference types="spotify-api" />

export interface SpotifyProviderProps { }

export type SelectedTrackRecord = Pick<SpotifyApi.TrackObjectFull, 'id'> & Pick<SpotifyApi.TrackObjectFull, 'name'>;

export interface SpotifyProviderState {
  user: AudioNestUser | null;
  isLoggedIn: boolean;
  token: string;
  currentSelectedPlaylist: {
    id: string;
    name: string;
    tracks: Array<SpotifyApi.PlaylistObjectSimplified> | null;
  }
  //currentSelectedTracks: Array<{ id: SpotifyApi.TrackObjectFull['id'], name: SpotifyApi.TrackObjectFull['name'] }>;
  currentSelectedTracks: Array<SelectedTrackRecord>
  genreSeeds: any;
  playlists: Array<SpotifyApi.PlaylistObjectSimplified>;
}

export type PlaylistProviderState = {
  tracks: any;
};

export type ChartProviderState = {
  chartData: any;
};
