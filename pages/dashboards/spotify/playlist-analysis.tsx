import { useContext, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import SpotifyContext from '../../../src/contexts/SpotifyContext';
import SpotifyNavbar from '../../../src/components/Navbars/SpotifyNavbar';
import PlaylistDisplay from '../../../src/components/Playlist/Display';
import PlaylistDetails from '../../../src/components/Containers/PlaylistDetails';
import TrackStatistics from '../../../src/components/Containers/TrackStatistics';

export default function SpotifyPlaylistAnalysis() {
  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  useEffect(() => {
    const spotifyContext = useContext(SpotifyContext);
    console.log('Spotify Context: ', spotifyContext);
  })
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyContext.Consumer>
      {({ user }) => (
        user ? (
          <Container>
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
          </Container>
        ) : (
          <></>
        ))}
      </SpotifyContext.Consumer>
    </>
  );
}
