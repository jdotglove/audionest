export interface SpotifyProviderProps { }

export interface SpotifyProviderState {
  user: AudioNestUser | null;
  isLoggedIn: boolean;
  token: string;
  currentSelectedPlaylist: {
    id: string;
    name: string;
    tracks: Array<SpotifyAPI.PlaylistTrackDetails> | null;
  }
  genreSeeds: any;
  playlists: Array<SpotifyAPI.Playlist>;
}

export type PlaylistProviderState = {
  tracks: any;
};

// SPOTIFY USER TYPE START
export module SpotifyAPI {
  export type User = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    external_urls: {
      spotify: string;
    };
    followers: {
      href?: string;
      total: number;
    };
    href: string;
    id: string;
    images: Array<{
      height?: number | string;
      width?: number | string;
      url: string;
    }>;
    product: string;
    type: string;
    uri: string;
  };

  type Image = {
    height: number;
    url: string;
    width: number;
  };

  export type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls?: {
      spotify: string;
    }
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: any // TODO: Come back and clean up this type
    type: string;
    uri: string;
  };

  export type AlbumImage = {
    height: number;
    url: string;
    width: number;
  };
  export type Artist = {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  };
  export type Album = {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: AlbumImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  export type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    // The value will be between 0 and 100, with 100 being the most popular.
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  };
  export type SeedResponse = {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  };
  export type SeedRecommendation = {
    seeds: SeedResponse[];
    tracks: Track[];
  };

  export type PlaylistTrackDetails = {
    added_at: string;
    added_by: Partial<User>;
    is_local: boolean;
    primary_color: any;
    track: Track;
    video_thumbnail: {
      url: string | null;
    };
  };

}

export type AudioNestUser = SpotifyAPI.User & {};
