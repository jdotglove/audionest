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
    const accessToken = (await getURLHash()).access_token;
    console.log('Get URL Hash: ', accessToken);
    if (accessToken && !this.state.isLoggedIn) {
      await this.login(accessToken);
    }
    console.log('Mounted In Provider!', this.state);
  }

  login = async (accessToken: string) => {
    SpotifyTokenCache.set('token', accessToken);
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/login`;
      const response = await axios({
        url: fetchUrl,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          spotifyToken: accessToken,
        }),
      });
      this.getUserTopArtists(response.data._id);
      this.getUserTopTracks(response.data._id);
      this.getUserPlaylists(response.data._id);
      this.setState({ user: { ...response.data }, isLoggedIn: true, token: accessToken});
    } catch (error) {
      console.error('ERROR: Could not login user.', error);
    }
  };

  getUserTopArtists = async (userId: string) => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/top-artists`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topArtists: [ ...(response?.data || []) ] });
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  getUserTopTracks = async (userId: string) => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/top-tracks`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ topTracks: [...(response?.data || [])] });
      console.log('Top Tracks: ', this.state.topTracks);
    } catch (err) {
      console.error('ERROR: Could not retrieve user playlists.', err);
    }
  };

  getUserPlaylists = async (userId: string) => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/playlists`,
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

  setSelectedTracks = async (trackRecord: SelectedTrackRecord) => {
    this.setState({
      currentSelectedTracks: this.state.currentSelectedTracks.concat(
        trackRecord,
      ),
    });
  };

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
