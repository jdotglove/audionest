import { Button, Container, Row, Col } from 'react-bootstrap';

import SpotifyContext from '../client/src/contexts/SpotifyContext';
import MainNavbar from '../client/src/components/Navbars/MainNavbar';
import styles from '../styles/IntegrationHub.module.css';


export default function IntegrationHub() {

  return (
    <div className={styles.container}>
      <MainNavbar />
      <SpotifyContext.Consumer>
      {({ isLoggedIn, authenticateSpotifyUser }) => (
        !isLoggedIn ? (
        <Container>
          <div>
            <h1><span style={{ color: '#98611F' }}>Spotify</span> Integration</h1>
          </div>
          <div>
            <Button onClick={async () => {
              authenticateSpotifyUser();
            }}>Login</Button>
          </div>
        </Container>
        )  : (
          <Container>
            <Row>
              <Col className="pa-0" style={{ display: 'flex',  justifyContent:'center', alignItems:'center', height: '15vh' }}>
                <h1> Successfully Logged In </h1>
              </Col>
            </Row>
          </Container>
        ))}
      </SpotifyContext.Consumer>
    </div>
  );
}
