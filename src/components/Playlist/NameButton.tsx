import { Button } from '@mui/material'
import React, { useState } from 'react'
import { SpotifyAPI } from '../../../types'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaylistContext from '../../contexts/PlaylistContext';

class NameButton extends React.Component<
  { playlist: SpotifyAPI.Playlist },
  { chosenPlaylists: string[], playlistData: Record<SpotifyAPI.Playlist['id'], SpotifyAPI.Playlist> }
> {
  constructor(props) {
    super(props);
    this.state = {
      chosenPlaylists: [] as string[],
      playlistData: {} as Record<SpotifyAPI.Playlist['id'], SpotifyAPI.Playlist>,
    }
  }

  pullPlaylist = async (getPlaylistTracks: Function, id: string) => {
    const data = await getPlaylistTracks(id)

    const newChosen = this.state.chosenPlaylists.concat(id)
    const newPlaylistData = {...this.state.playlistData, id: data}
    this.setState({
      chosenPlaylists: newChosen,
      playlistData: newPlaylistData,
    })
    console.log('playlistData', this.state.playlistData)
    console.log('chosenPlaylists', this.state.chosenPlaylists)
  }

  render () {
    return (
      <PlaylistContext.Consumer>
        {({ getPlaylistTracks }) => (
          <Button 
            color="secondary"
            variant="outlined"
            style={{
              justifyContent: 'space-between',
              textTransform: "none",
              borderRadius: '25px'
            }}
            endIcon={<ArrowForwardIosIcon sx={{fontSize: '12px !important'}} />}
            onClick={() => this.pullPlaylist(getPlaylistTracks, this.props.playlist.id)}
          >
            {this.props.playlist.name}
          </Button>
        )}
      </PlaylistContext.Consumer>
    )
  }
  
}

export default NameButton;
