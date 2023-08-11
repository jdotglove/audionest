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
                <Nav>
                  <Navbar.Text>
                    Welcome, {user.display_name}!
                  </Navbar.Text>
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
