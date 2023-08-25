import { Fragment } from "react";

import DiscoveryDisplay from "../../src/components/Discovery/Display";
import DiscoveryProvider from "../../src/providers/DiscoveryProvider";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";

export default function DiscoveryPage() {
  return (
    <Fragment>
      <SpotifyNavbar />
      <DiscoveryProvider>
        <DiscoveryDisplay />
      </DiscoveryProvider>
    </Fragment>
  );
}
