import { Fragment } from "react";
import { Button, Row, Col, Container, Tabs, Tab } from "react-bootstrap";

import CrateDiggerInfo from "../../../src/components/Modals/CrateDiggerInfo";
import RecommendationGenerator from "../../../src/components/Recommendation/Generator";
import PlaylistAnalysis from "../../../src/components/Playlist/Analysis";
import SpotifyContext from "../../../src/contexts/SpotifyContext";
import SpotifyProvider from "../../../src/providers/SpotifyProvider";
import SpotifyNavbar from "../../../src/components/Navbars/SpotifyNavbar";
import UserProfile from "../../../src/components/Containers/UserProfile";

export default function SpotifyDashboard() {
  return (
    <Fragment>
      <Row>
        <Col>
          <SpotifyNavbar />
        </Col>
      </Row>
      <SpotifyProvider>
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
                        className="text-white"
                        eventKey="recommendation-generator"
                        title="Recommendation Generator"
                      >
                        <RecommendationGenerator />
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
      </SpotifyProvider>
    </Fragment>
  );
}
