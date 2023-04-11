import { Col, Container, Row } from 'react-bootstrap';

import MainNavbar from '../src/components/Navbars/MainNavbar';
import DashedTriangle from '../src/components/Animations/DashedTriangle';

export default function Home() {

  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="pt-3">
          <Col>
              <h1 style={{
                fontSize: 'xxx-large',
                fontWeight: 800,
              }}>
                Welcome to <span style={{ color: '#98611F' }}>AudioNest</span>
              </h1>
              <p style={{
                fontSize: 'x-large',
                fontWeight: 400,
              }}>
                The nest you never want to leave...
              </p>
            </Col>
        </Row>
        <Row style={{
          fontSize: 'x-large',
          fontWeight: 250,
        }}>
          <Col>
            <p>
              The <span style={{ color: '#98611F' }}>aim</span> of this project is to <span style={{ color: '#98611F' }}>explore</span> different
              types of audio integrations as well as <span style={{ color: '#98611F' }}>music and audio</span> in general. I look to house any in features or
              findings in a central place <span style={{ color: '#98611F' }}>for anyone</span> who might find it useful or interesting.
            </p>
            <p>
              Hope you <span style={{ color: '#98611F' }}>enjoy</span> your stay!
            </p>
          </Col>
        </Row>
        <DashedTriangle />
      </Container>
    </div>
  );
}
