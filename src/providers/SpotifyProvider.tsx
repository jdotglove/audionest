import axios from '../plugins/axios';
import React from 'react';

import { getURLHash } from '../utils/spotify';
import { SelectedTrackRecord, SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';
import { authenticateSpotify } from '../middleware/spotify';
import { SpotifyTokenCache } from '../cache';
// credentials are optional

class SpotifyProvider extends React.Component<
SpotifyProviderProps,
SpotifyProviderState
> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      authenticateSpotifyUser: null,
      currentSelectedPlaylist: null,
      currentSelectedTracks: [],
      genreSeeds: null,
      isLoggedIn: false,
      playlists: [],
      user: null,
      token: '',
      topTracks: [],
      topArtists: [],
    };
  }

  async componentDidMount() {
    // @ts-ignore
    let accessToken = (await getURLHash()).access_token;
    if (!accessToken) {
      accessToken = SpotifyTokenCache.get('token');
    }
    console.log('Get URL Hash: ', accessToken);
    if (accessToken && !this.state.isLoggedIn) {
      await this.login(accessToken);
    }
    console.log('Mounted In Provider!', this.state);
  }

  login = async (accessToken: string) => {
    SpotifyTokenCache.set('token', accessToken);
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
      this.loadUserTopArtists(response.data._id);
      this.loadUserTopTracks(response.data._id);
      this.loadUserPlaylists(response.data._id);
      this.setState({ user: { ...response.data }, isLoggedIn: true, token: accessToken});
    } catch (error) {
      console.error('ERROR: Could not login user.', error);
    }
  };

  loadUserTopArtists = async (userId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      console.log('Access Token: ', accessToken);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/top-artists?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topArtists: [ ...(response?.data.map((artist: Audionest.Artist) => artist._id) || [])] });
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  loadUserTopTracks = async (userId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      console.log('Access Token: ', accessToken);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/top-tracks?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topTracks: [...(response?.data.map((track: Audionest.Track) => track._id) || [])] });
      console.log('Top Tracks: ', this.state.topTracks);
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  loadUserPlaylists = async (userId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      console.log('Access Token: ', accessToken);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/playlists?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ playlists: [...(response?.data || [])] });
      console.log('Playlists: ', this.state.playlists);
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  getSeedRecommendations = async () => {
    // Get Recommendations Based on Seeds
    // const response = await spotifyWebApi.getRecommendations({
    //   min_energy: 0.4,
    //   min_popularity: 50,
    // });
    // console.log(
    //   'GET SEED RECOMMENDATIONS: ',
    //   JSON.stringify(response, null, 4),
    // );
  };

  getAvailableGenreSeeds = async () => {
    // Get available genre seeds
    // const { body: genreSeeds } = await spotifyWebApi.getAvailableGenreSeeds();
    // this.setState({ genreSeeds });
  };

  setSelectedPlaylist = async (playlistData: any) => {
    this.setState({ currentSelectedPlaylist: playlistData });
  };

  setSelectedTracks = async (trackIdArray: Audionest.Track['_id'][]) => {
    const accessToken = SpotifyTokenCache.get('token');
    console.log('Access Token: ', accessToken);
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/track?token=${accessToken}&ids=${trackIdArray.join(',')}`,
      method: 'get',
      headers: {
        authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    console.log('Selected Tracks Response: ', JSON.stringify(response));
    this.setState({
      currentSelectedTracks: response.data
    });
  };

  authenticateSpotifyUser = async (newUser: boolean) => {
    const token = await authenticateSpotify() ;
    this.setState({
      token: token,
    });
  };
  render() {
    return (
      <SpotifyContext.Provider
        value={{
          authenticateSpotifyUser: this.authenticateSpotifyUser,
          currentSelectedPlaylist: this.state.currentSelectedPlaylist,
          currentSelectedTracks: this.state.currentSelectedTracks,
          getAvailableGenreSeeds: this.getAvailableGenreSeeds,
          getSeedRecommendations: this.getSeedRecommendations,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          playlists: this.state.playlists,
          recommendations: null,
          setSelectedPlaylist: this.setSelectedPlaylist,
          setSelectedTracks: this.setSelectedTracks,
          topArtists: this.state.topArtists,
          topTracks: this.state.topTracks,
          user: this.state.user,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
