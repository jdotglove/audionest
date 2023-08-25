import { Fragment } from "react";

import DiscoveryDisplay from "../../src/components/Discovery/Display";
import DiscoveryProvider from "../../src/providers/DiscoveryProvider";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import SpotifyProvider from "../../src/providers/SpotifyProvider";

export default function DiscoveryPage() {
  return (
    <Fragment>
      <SpotifyProvider>
        <SpotifyNavbar />
        <DiscoveryProvider>
          <DiscoveryDisplay />
        </DiscoveryProvider>
      </SpotifyProvider>
    </Fragment>
  );
}
