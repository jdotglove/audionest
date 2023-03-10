import { Row, Col, Button } from 'react-bootstrap';
import AudioNestNavbar from '../../src/components/Navbar';
import PlaylistDisplay from '../../src/components/Playlist/Display';
import PlaylistDetails from '../../src/components/Containers/PlaylistDetails';
import TrackStatistics from '../../src/components/Containers/TrackStatistics';
import styles from '../../styles/Home.module.css';
import RecommendationContext from '../../src/contexts/RecommendationContext';

export default function Dashboard() {
  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  return (
    <>
      <Row>
        <RecommendationContext.Consumer>
          {(data) => (
            <Button>{JSON.stringify(data, null, 4)}</Button>
          )}
        </RecommendationContext.Consumer>
      </Row>
      <Row>
        <Col>
          <AudioNestNavbar />
        </Col>
      </Row>
      <Row className={styles['playlist-row']}>
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
