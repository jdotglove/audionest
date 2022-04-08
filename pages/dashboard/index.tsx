import { Row, Col } from 'react-bootstrap';
import AudioNestNavbar from '../../src/components/Navbar';
import PlaylistDisplay from '../../src/components/Playlist/Display';
import PlaylistStatistics from '../../src/components/Containers/PlaylistStatistics';
import styles from '../../styles/Home.module.css';

export default function Dashboard() {
  return (
    <>
      <Row>
        <Col>
          <AudioNestNavbar />
        </Col>
      </Row>
      <Row className={styles.playlistRow}>
        <Col>
          <PlaylistDisplay />
        </Col>
        <Col>
          <PlaylistStatistics />
        </Col>
      </Row>
    </>
  );
}
