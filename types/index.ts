export interface SpotifyProviderProps {}

export interface SpotifyProviderState {
  user: AudioNestUser | null;
  isLoggedIn: boolean;
  token: string;
  playlists: Array<SpotifyAPI.Playlist>;
}

export type PlaylistProviderState = {
  data: any;
}

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
      url: string
    }>;
    product: string;
    type: string;
    uri: string;  
  }
  
  type Image = {
    height: number;
    url: string;
    width: number;
  }

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
    tracks: {
      href: string;
      total: number;
    }
    type: string;
    uri: string;
  }
}

export type AudioNestUser = SpotifyAPI.User & {}
