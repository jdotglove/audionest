import { Row, Col, Container, Button } from 'react-bootstrap';

import SpotifyContext from '../../../src/contexts/SpotifyContext';
import SpotifyNavbar from '../../../src/components/Navbars/SpotifyNavbar';
import UserDetails from '../../../src/components/Containers/UserDetails';

export default function SpotifyDashboard() {

  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyContext.Consumer>
      {({ isLoggedIn, login }) => (
        !isLoggedIn ? (
          <Container>
            <Row>
              <Col className="pt-3">
                <h3>
                  Welcome to the Integration Hub!
                </h3>
                <Button onClick={async () => {
              
                  login(); 
                }}>Login</Button>

                <UserDetails />
              </Col>

            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col className="pa-0" style={{ display: 'flex',  justifyContent:'center', alignItems:'center', height: '15vh' }}>
                <h1>Login to Spotify to continue your <span style={{ color: '#98611F' }}>journey</span>...</h1>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}>

              </Col>
            </Row>
          </Container>
        ))}
      </SpotifyContext.Consumer>
    </>
  );
}
