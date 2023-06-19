import { Container, Nav, Navbar, Image } from 'react-bootstrap';

import SpotifyContext from '../../contexts/SpotifyContext';

export default function SpotifyNavbar() {
  return (
    <SpotifyContext.Consumer>
      {({ isLoggedIn, user }) => (
        <span>
          <Navbar
            className="d-none d-lg-block"
            style={{
              background: '#98611F',
            }}
            variant="light"
          >
            <Container fluid>
              {/* TODO: need to check into better routing flow */}
              {/* Might need to avoid nesting routes so deep and prefix them instead */}
              <Navbar.Brand href="/">AudioNest</Navbar.Brand>
              {isLoggedIn ? (
                <Nav className="me-auto">
                  <Nav.Link className="text-black" href="spotify/user-details">
                    User Details
                  </Nav.Link>
                  <Nav.Link className="text-black" href="spotify/playlist-analysis">
                    Playlist Analysis
                  </Nav.Link>
                  <Nav.Link className="text-black" href="spotify/playlist-generator">
                    Playlist Generator
                  </Nav.Link>
                </Nav>
              ) : (
                <div />
              )}
              <Navbar.Text>
                Welcome, {user?.displayName}!
              </Navbar.Text>
              {/* {user?.images[0] && (
                <Image
                  src={user.images[0].url}
                  height={30}
                  width={30}
                  roundedCircle
                  className="mx-2"
                  alt="Profile Picture"
                />
              )} */}
            </Container>
          </Navbar>
          <Navbar
            className="d-lg-none"
            style={{
              background: '#98611F',
            }}
            variant="light"
          >
            <Container fluid>
              <Navbar.Brand href="/">AudioNest</Navbar.Brand>
              {isLoggedIn ? (
                <Nav className="align-items-center">
                  <Navbar.Text>
                    Welcome, {user.displayName}!
                  </Navbar.Text>
                  {/* {user.images[0] && (
                    <Image
                      src={user.images[0].url}
                      height={30}
                      width={30}
                      roundedCircle
                      className="mx-2"
                      alt="Profile Picture"
                    />
                  )} */}
                </Nav>
              ) : (
                <div />
              )}
            </Container>
          </Navbar>
        </span>
      )}
    </SpotifyContext.Consumer>
  );
}
