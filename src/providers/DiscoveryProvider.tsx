import React, { Fragment } from "react";

import axios from "../plugins/axios";
import { DiscoveryProviderState, DiscoveryProviderProps } from "../../types";
import { SpotifyCache } from "../cache";
import DiscoveryContext from "../contexts/DiscoveryContext";

class DiscoveryProvider extends React.PureComponent<
  DiscoveryProviderProps,
  DiscoveryProviderState
> {
  constructor(props: DiscoveryProviderProps | Readonly<DiscoveryProviderProps>) {
    super(props);
    this.state = {
      newReleases: [],
      authorizationError: false,
    };
  }
  fetchNewReleases = async (page?: number) => {
    try {
      const accessToken = SpotifyCache.get("token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/discovery/new-releases/?token=${accessToken}&page=${page}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
      //this.setState({ newReleases: [...response.data] });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.setState({
          authorizationError: true,
        });
      } else {
        console.error(
          "ERROR: Could not retrieve artist data.",
          error.response?.statusText || error.message
        );
      }
    }
  }

  render() {
    return (
      <DiscoveryContext.Provider
        value={{
          newReleases: this.state.newReleases,
          fetchNewReleases: (page: number) => this.fetchNewReleases(page),
        }}
      >
        <Fragment>{this.props.children}</Fragment>
      </DiscoveryContext.Provider>
    );
  }
}

export default DiscoveryProvider;
