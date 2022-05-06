import React from 'react';
import { PlaylistProviderState, SpotifyProviderProps } from '../../types';
import { PlaylistDataCache } from '../cache';
import PlaylistContext from '../contexts/PlaylistContext';
import { spotifyWebApi } from './SpotifyProvider';

class PlaylistProvider extends React.Component<SpotifyProviderProps, PlaylistProviderState> {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }
  
  getPlaylistTracks = async (id: string) => {
    if (PlaylistDataCache.get(id) !== -1) {
      return PlaylistDataCache.get(id)
    }
    try {
      // Get a user's playlists
      const { body: { items } } = await spotifyWebApi.getPlaylistTracks(id);
      PlaylistDataCache.put(id, items)
      this.setState({ tracks: items });
      return items;
    } catch (err: any) {
      console.error('ERROR: Could not retrieve user\'s playlists.', err);
    }
  };

  render() {
    return (
      <PlaylistContext.Provider
        value={{
          getPlaylistTracks: (id: string) => this.getPlaylistTracks(id),
        }}
      >
        <div>{this.props.children}</div>
      </PlaylistContext.Provider>
    );
  }
}

export default PlaylistProvider;
