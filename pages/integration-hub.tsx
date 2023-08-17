import { Button, Container, Row, Col } from "react-bootstrap";

import MainNavbar from "../src/components/Navbars/MainNavbar";
import styles from "../styles/IntegrationHub.module.css";
import { authenticateSpotify } from "../src/middleware/spotify";

export default function IntegrationHub() {
  const authenticateSpotifyUser = async () => {
    await authenticateSpotify();
  };

  return (
    <div className={styles.container}>
      <MainNavbar />
      <Container>
        <Row className="py-2">
          <Col>
            <h1>
              Virtual <span style={{ color: "#98611F" }}>Spotify</span> Crate
              Digger
            </h1>
          </Col>
        </Row>
        <Row className="py-2" md={3}>
          <Col>
            <div className="d-grid gap-2">
              <Button
                size="lg"
                onClick={async () => {
                  await authenticateSpotifyUser();
                }}
              >
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
