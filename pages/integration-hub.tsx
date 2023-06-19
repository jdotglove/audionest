import { Button, Container, Row, Col } from 'react-bootstrap';

import SpotifyContext from '../src/contexts/SpotifyContext';
import MainNavbar from '../src/components/Navbars/MainNavbar';
import styles from '../styles/IntegrationHub.module.css';


export default function IntegrationHub() {

  return (
    <div className={styles.container}>
      <MainNavbar />
      <SpotifyContext.Consumer>
      {({ isLoggedIn, authenticateSpotifyUser }) => (
        !isLoggedIn ? (
        <Container>
          <Row className="py-2">
            <Col>
              <h1><span style={{ color: '#98611F' }}>Spotify</span> Integration</h1>
            </Col>
          </Row>
          <Row className="py-2" md={3}>
            <Col>
              <div className="d-grid gap-2">
                <Button size="lg" onClick={async () => {
                  authenticateSpotifyUser();
                }}>Login</Button>
                <Button size="lg" onClick={async () => {
                  authenticateSpotifyUser(true);
                }}>Create Account</Button>
              </div>
            </Col>
          </Row>
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
