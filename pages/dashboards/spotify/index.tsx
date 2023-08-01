import { useState } from 'react';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';

// import { useSelector, useDispatch } from 'react-redux';

// import { getURLHash } from '../../../src/utils/spotify';
// import { setToken } from '../../../store/reducers/tokenReducer';
import RecommendationGenerator from '../../../src/components/Containers/RecommendationGenerator';
import PlaylistAnalysis from '../../../src/components/Containers/PlaylistAnalysis';
import SpotifyContext from '../../../src/contexts/SpotifyContext';
import SpotifyNavbar from '../../../src/components/Navbars/SpotifyNavbar';
import UserDetails from '../../../src/components/Containers/UserDetails';
// import { useEffect } from 'react';

export default function SpotifyDashboard() {
  const [selectedTab, setSelectedTab] = useState('profile')
  return (
    <>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyContext.Consumer>
        {({ isLoggedIn, user }) =>
          !isLoggedIn ? (
            <Container>
              <Row>
                <Col className="pt-3"></Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <h3>Welcome to the Audionest Spotify Hub!</h3>
              <Row>
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="profile" title="User Profile">
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <UserDetails />
                    </Col>
                  </Tab>
                  <Tab eventKey="playlist-analysis" title="Playlist Analysis">
                    <PlaylistAnalysis />
                  </Tab>
                  <Tab eventKey="playlist-generator" title="Playlist Generator">
                    <RecommendationGenerator />
                  </Tab>
                </Tabs>
              </Row>
            </Container>
          )
        }
      </SpotifyContext.Consumer>
    </>
  );
}
