import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap';
import SpotifyContext from '../contexts/SpotifyContext';

export default function AudioNestNavbar() {
  return (
    <SpotifyContext.Consumer>
      {({ isLoggedIn, login, user }) => (
        <Navbar bg="light">
          <Container fluid>
            <Navbar.Brand>AudioNest</Navbar.Brand>
            {isLoggedIn ? (
              <Nav className="align-items-center">
                <Navbar.Text>
                  Welcome, {user.display_name.split(' ')[0]}!
                </Navbar.Text>
                {user.images[0] && (
                  <Image
                    src={user.images[0].url}
                    height={30}
                    width={30}
                    roundedCircle
                    className="mx-2"
                    alt="Profile Picture"
                  />
                )}
              </Nav>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </Container>
        </Navbar>
      )}
    </SpotifyContext.Consumer>
  );
}
