import { Row, Col, Container } from 'react-bootstrap';

// import { useSelector, useDispatch } from 'react-redux';

// import { getURLHash } from '../../../src/utils/spotify';
// import { setToken } from '../../../store/reducers/tokenReducer';

import SpotifyContext from '../../../src/contexts/SpotifyContext';
import SpotifyNavbar from '../../../src/components/Navbars/SpotifyNavbar';
import UserDetails from '../../../src/components/Containers/UserDetails';
// import { useEffect } from 'react';

export default function SpotifyDashboard() {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   async function handleAccessToken() {
  //     // @ts-ignore
  //     const accessToken = (await getURLHash()).access_token;
  //     dispatch(setToken(accessToken));
  //   }
  //   handleAccessToken();
  // });

  // const [currentSelectedTrack, setSelectedTrack ] = useState();
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyContext.Consumer>
      {({ isLoggedIn }) => (
        !isLoggedIn ? (
          <Container>
            <Row>
              <Col className="pt-3">
              </Col>

            </Row>
          </Container>
        ) : (
          <Container>
            <h3>
              Welcome to the Audionest Spotify Hub!
            </h3>
            <Row>
              <Col style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}>
                <UserDetails />
              </Col>
            </Row>
          </Container>
        ))}
      </SpotifyContext.Consumer>
    </>
  );
}
