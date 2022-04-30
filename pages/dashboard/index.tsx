import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AudioNestNavbar from '../../src/components/Navbar';
import PlaylistDisplay from '../../src/components/Playlist/Display';
import PlaylistDetails from '../../src/components/Containers/PlaylistDetails';
import TrackStatistics from '../../src/components/Containers/TrackStatistics';
import styles from '../../styles/Home.module.css';

export default function Dashboard() {
  // const [currentSelectedTrack, setSelectedTrack ] = useState();
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
          <PlaylistDetails />
        </Col>
        <Col>
        <TrackStatistics />
        </Col>
      </Row>
    </>
  );
}
