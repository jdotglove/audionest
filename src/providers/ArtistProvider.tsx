import React, { Fragment } from 'react';

import axios from '../plugins/axios';
import { ArtistProviderState, ArtistProviderProps } from '../../types';
import { SpotifyCache } from '../cache';
import ArtistContext from '../contexts/ArtistContext'

class ArtistProvider extends React.Component<ArtistProviderProps, ArtistProviderState> {
  constructor(props: ArtistProviderProps | Readonly<ArtistProviderProps>) {
    super(props);
    this.state = {
      artistId: props.artistId,
      albums: undefined,
      name: '',
      genres: [],
      popularity: 0,
      uri: '',
      tracks: [],
    };
  }

  async componentDidMount() {
    const accessToken = SpotifyCache.get('token');
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/artist/${this.state.artistId}?token=${accessToken}`,
      method: 'get',
      headers: {
        authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    this.setState({ ...response.data})
  }


  render() {
    return (
      <ArtistContext.Provider
        value={{
          ...this.state,
        }}
      >
        {/* @ts-ignore */}
        <Fragment>{this.props.children}</Fragment>
      </ArtistContext.Provider>
    );
  }
}

export default ArtistProvider;
