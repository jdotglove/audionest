import { Fragment } from "react";
import { Image, Row, Col, Container, Tabs, Tab } from "react-bootstrap";

import spotifyFullLogo from "../../../public/spotifyFullLogo.png";
import CrateDiggerInfo from "../../../src/components/Modals/CrateDiggerInfo";
import DiscoveryDisplay from "../../../src/components/Discovery/Display";
import RecommendationGenerator from "../../../src/components/Recommendation/Generator";
import PlaylistAnalysis from "../../../src/components/Playlist/Analysis";
import SpotifyContext from "../../../src/contexts/SpotifyContext";
import SpotifyProvider from "../../../src/providers/SpotifyProvider";
import DiscoveryProvider from "../../../src/providers/DiscoveryProvider";
import SpotifyNavbar from "../../../src/components/Navbars/SpotifyNavbar";
import UserProfile from "../../../src/components/Containers/UserProfile";

export default function SpotifyDashboard() {
  return (
    <Fragment>
      <SpotifyProvider>
        <Row>
          <Col>
            <SpotifyNavbar />
          </Col>
        </Row>
        <Row>
          <Col>
            <SpotifyContext.Consumer>
              {({ isLoggedIn }) =>
                !isLoggedIn ? (
                  <Container>
                    <Row>
                      <Col className="pt-3"></Col>
                    </Row>
                  </Container>
                ) : (
                  <Fragment>
                    <CrateDiggerInfo />
                    <Container className="py-3">
                      <Row>
                        <Tabs
                          defaultActiveKey="recommendation-generator"
                          id="uncontrolled-tab-example"
                          className="mb-3 text-white"
                        >
                          <Tab
                            eventKey="recommendation-generator"
                            title="Recommendation Generator"
                          >
                            <RecommendationGenerator />
                          </Tab>
                          <Tab
                            eventKey="discovery-display"
                            title="Discovery Display"
                          >
                            <DiscoveryProvider>
                              <DiscoveryDisplay />
                            </DiscoveryProvider>
                          </Tab>
                          <Tab
                            eventKey="playlist-analysis"
                            title="Playlist Analysis"
                          >
                            <PlaylistAnalysis />
                          </Tab>
                          <Tab eventKey="user-profile" title="User Profile">
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <UserProfile />
                            </Col>
                          </Tab>
                        </Tabs>
                      </Row>
                    </Container>
                  </Fragment>
                )
              }
            </SpotifyContext.Consumer>
          </Col>
        </Row>
      </SpotifyProvider>
    </Fragment>
  );
}
