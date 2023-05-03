import { Row, Col, Container } from 'react-bootstrap';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import SpotifyContext from '../../../src/contexts/SpotifyContext';
import SpotifyNavbar from '../../../src/components/Navbars/SpotifyNavbar';
import PlaylistDisplay from '../../../src/components/Playlist/Display';
import PlaylistDetails from '../../../src/components/Containers/PlaylistDetails';
import TrackStatistics from '../../../src/components/Containers/TrackStatistics';

export default function SpotifyPlaylistAnalysis() {
  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyContext.Consumer>
      {({ isLoggedIn, login }) => (
        isLoggedIn ? (
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
          <Container>
            <Row>
              <Col className="pa-0" style={{ display: 'flex',  justifyContent:'center', alignItems:'center', height: '15vh' }}>
                <h1>Login to Spotify to continue your <span style={{ color: '#98611F' }}>journey</span>...</h1>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}>
                <SpotifyAuth
                  redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL}
                  clientID={process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID}
                  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
                  onAccessToken={(token: string) => {
                    window.localStorage.setItem('token', token);
                    login();
                  }}
                />
              </Col>
            </Row>
          </Container>
        ))}
      </SpotifyContext.Consumer>
    </>
  );
}
