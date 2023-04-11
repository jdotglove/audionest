import { Container, Nav, Navbar, Image } from 'react-bootstrap';

import SpotifyContext from '../../contexts/SpotifyContext';

export default function SpotifyNavbar() {
  return (
    <SpotifyContext.Consumer>
      {({ isLoggedIn, user }) => (
        <span>
        
        <Navbar className="d-none d-lg-block" style={{
          background: '#98611F',
        }} variant="light">
          <Container fluid>
            <Navbar.Brand href='/' >AudioNest</Navbar.Brand>
            {isLoggedIn ? (
              <Nav className='align-items-center'>
                <Navbar.Text>
                  Welcome, {user.display_name.split(' ')[0]}!
                </Navbar.Text>
                {user.images[0] && (
                  <Image
                    src={user.images[0].url}
                    height={30}
                    width={30}
                    roundedCircle
                    className='mx-2'
                    alt='Profile Picture'

                  />
                )}
              </Nav>
            ) : (
              <div />
            )}
          </Container>
        </Navbar>
        <Navbar className="d-lg-none" style={{
          background: '#98611F',
        }} variant="light">
          <Container fluid>
            <Navbar.Brand href='/' >AudioNest</Navbar.Brand>
            {isLoggedIn ? (
              <Nav className='align-items-center'>
                <Navbar.Text>
                  Welcome, {user.display_name.split(' ')[0]}!
                </Navbar.Text>
                {user.images[0] && (
                  <Image
                    src={user.images[0].url}
                    height={30}
                    width={30}
                    roundedCircle
                    className='mx-2'
                    alt='Profile Picture'

                  />
                )}
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
