import React from 'react'
import { PlaylistProviderState, SpotifyProviderProps } from '../../types';
import PlaylistContext from '../contexts/PlaylistContext';
import { spotifyApi } from './SpotifyProvider';


class PlaylistProvider extends React.Component<SpotifyProviderProps, PlaylistProviderState> {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }
  
  getPlaylistTracks = async (id: string) => {
    console.log('here!', id)
    try {
      // Get a user's playlists
      await spotifyApi.getPlaylistTracks(id)
        .then(function(data: { body: any }) {
          console.log('Retrieved playlists (in PlaylistProvider', data.body.items);
          this.setState({ playlists: data.body.items });
        })
    } catch (err: any) {
      console.log('ERROR: Could not retrieve user\'s playlists.', err);
    }
  }

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
