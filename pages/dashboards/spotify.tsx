import { Row, Col } from 'react-bootstrap';

import SpotifyNavbar from '../../src/components/Navbars/SpotifyNavbar';
import PlaylistDisplay from '../../src/components/Playlist/Display';
import PlaylistDetails from '../../src/components/Containers/PlaylistDetails';
import TrackStatistics from '../../src/components/Containers/TrackStatistics';

export default function SpotifyDashboard() {
  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <Row>
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
