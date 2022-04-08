import { Row, Col } from 'react-bootstrap';
import AudioNestNavbar from '../../src/components/Navbar';
import PlaylistList from '../../src/components/Playlist/List';
import RecommendationsSection from '../../src/components/Recommendations/Section';

export default function Dashboard() {
  return (
    <>
      <Row>
        <Col>
          <AudioNestNavbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <PlaylistList />
        </Col>
        <Col>
          <RecommendationsSection />
        </Col>
      </Row>
    </>
  );
}
