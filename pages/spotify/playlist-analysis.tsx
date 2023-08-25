import { Fragment } from "react";
import { Container } from "react-bootstrap";

import PlaylistAnalysisContainer from "../../src/components/Playlist/AnalysisContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";

export default function PlaylistAnalysisPage() {
  return (
    <Fragment>
      <SpotifyNavbar />
      <Container className="py-3">
        <PlaylistAnalysisContainer />
      </Container>
    </Fragment>
  );
}
