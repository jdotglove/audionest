import { Fragment } from "react";
import { Container } from "react-bootstrap";

import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";
import UserProfileContainer from "../../src/components/Containers/UserProfileContainer";

export default function UserProfilePage() {
  return (
    <Fragment>
      <SpotifyNavbar />
      <Container className="py-3">
        <UserProfileContainer />
      </Container>
    </Fragment>
  );
}
