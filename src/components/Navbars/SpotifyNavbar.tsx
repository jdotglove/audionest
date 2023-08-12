import { Fragment } from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";

import SpotifyContext from "../../contexts/SpotifyContext";

export default function SpotifyNavbar() {
  return (
    <SpotifyContext.Consumer>
      {({ isLoggedIn, user }) => (
        <Fragment>
          <Navbar
            className="mx-0"
            style={{
              background: "#98611F",
            }}
            variant="light"
          >
            <Container fluid>
              {/* TODO: need to check into better routing flow */}
              {/* Might need to avoid nesting routes so deep and prefix them instead */}
              <Navbar.Brand href="/">AudioNest</Navbar.Brand>
              <Navbar.Text>
                Welcome, {user?.display_name}!
                {user?.images[0] && (
                  <Image
                    className="mx-2"
                    src={user.images[0].url}
                    height={30}
                    width={30}
                    roundedCircle
                    alt="Profile Picture"
                  />
                )}
              </Navbar.Text>
            </Container>
          </Navbar>
        </Fragment>
      )}
    </SpotifyContext.Consumer>
  );
}
