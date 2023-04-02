import { Row, Col } from 'react-bootstrap';

import SpotifyNavbar from '../../src/components/Navbars/SpotifyNavbar';
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
          <SpotifyNavbar />
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
