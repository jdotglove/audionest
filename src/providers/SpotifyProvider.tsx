import axios from '../plugins/axios';
import React, { Fragment } from 'react';

import { getURLHash } from '../utils/spotify';
import { SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';
import { authenticateSpotify } from '../middleware/spotify';
import { SpotifyCache } from '../cache';
// credentials are optional

class SpotifyProvider extends React.Component<
SpotifyProviderProps,
SpotifyProviderState
> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      artistSearchResults: [],
      currentSelectedPlaylist: null,
      currentSelectedTracks: [],
      genreSeeds: null,
      isLoggedIn: false,
      playlists: [],
      user: null,
      seenInfoModal: false,
      token: '',
      topTracks: [],
      topArtists: [],
      trackSearchResults: [],
    };
  }

  async componentDidMount() {
    // @ts-ignore
    let accessToken = (await getURLHash()).access_token;
    if (!accessToken) {
      accessToken = SpotifyCache.get('token');
    }
    if (accessToken && !this.state.isLoggedIn) {
      await this.login(accessToken);
    }
  }

  login = async (accessToken: string) => {
    SpotifyCache.set('token', accessToken);
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/login?token=${accessToken}`;
      const response = await axios({
        url: fetchUrl,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username: '',
          password: '',
        }),
      });
      await this.loadUserTopArtists(response.data.id);
      await this.loadUserTopTracks(response.data.id);
      await this.loadUserPlaylists(response.data.id);
      this.setState({ user: { ...response.data }, isLoggedIn: true, token: accessToken});
    } catch (error) {
      console.error('ERROR: Could not login user.', error.message);
    }
  };

  loadUserTopArtists = async (userSpotifyId: string) => {
    try {
      const accessToken = SpotifyCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/top-artists?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topArtists: [ ...(response?.data.map((artist: Audionest.Artist) => artist.id) || [])] });
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  loadUserTopTracks = async (userSpotifyId: string) => {
    try {
      const accessToken = SpotifyCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/top-tracks?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topTracks: [...(response?.data.map((track: Audionest.Track) => track.id) || [])] });
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  loadUserPlaylists = async (userSpotifyId: string) => {
    try {
      const accessToken = SpotifyCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/playlists?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ playlists: [...(response?.data || [])] });
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  searchItems = async (searchType: string, searchValue: string) => {
    try {
      const accessToken = SpotifyCache.get('token');
      let searchUrl = '';
      if (searchType === 'artist') {
        searchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/artist/search?token=${accessToken}`;
      } else if (searchType === 'track') {
        searchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/track/search?token=${accessToken}`;
      }
      const response = await axios({
        url: searchUrl,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          type: searchType,
          query: searchValue,
        }),
      });
      if (searchType === 'artist') {
        this.setState({ artistSearchResults: [...response.data as Array<any>]})
      } else if (searchType === 'track') {
        this.setState({ trackSearchResults: [...response.data as Array<any>]})
      }
    } catch (err) {
      console.error('ERROR: could not search spotify item.', err);
    }
  };

  setSelectedPlaylist = async (playlistData: any) => {
    this.setState({ currentSelectedPlaylist: playlistData });
  };

  setSelectedTracks = async (trackIdArray: Array<any>) => {
    const accessToken = SpotifyCache.get('token');
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/track?token=${accessToken}&ids=${trackIdArray.join(',')}`,
      method: 'get',
      headers: {
        authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    this.setState({
      currentSelectedTracks: response.data,
    });
  };
  checkIfSeenInfoModal = () => {
    const infoModalSeen = sessionStorage.getItem("seenInfoModal");
    if (infoModalSeen === 'true') {
      return true;
    }
    return this.state.seenInfoModal;
  }

  acknowledgeInfoModal = () => {
    sessionStorage.setItem("seenInfoModal", "true");
    this.setState({
      seenInfoModal: true,
    });
  }
  
  authenticateSpotifyUser = async () => {
    const token = await authenticateSpotify() ;
    this.setState({
      token: token,
    });
  };
  render() {
    return (
      <SpotifyContext.Provider
        value={{
          artistSearchResults: this.state.artistSearchResults,
          authenticateSpotifyUser: this.authenticateSpotifyUser,
          acknowledgeInfoModal: () => this.acknowledgeInfoModal(),
          checkIfSeenInfoModal: () => this.checkIfSeenInfoModal(),
          currentSelectedPlaylist: this.state.currentSelectedPlaylist,
          currentSelectedTracks: this.state.currentSelectedTracks,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          playlists: this.state.playlists,
          recommendations: null,
          searchItems: this.searchItems,
          setSelectedPlaylist: this.setSelectedPlaylist,
          setSelectedTracks: this.setSelectedTracks,
          trackSearchResults: this.state.trackSearchResults,
          topArtists: this.state.topArtists,
          topTracks: this.state.topTracks,
          user: this.state.user,
        }}
      >
        {/* @ts-ignore */}
        <Fragment>{this.props.children}</Fragment>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
