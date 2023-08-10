import { Fragment } from "react";
import { Row, Col, Container, Tabs, Tab, Alert, Button } from "react-bootstrap";

import RecommendationDisplay from "../../../src/components/Recommendation/Display";
import RecommendationGenerator from "../../../src/components/Recommendation/Generator";
import PlaylistAnalysis from "../../../src/components/Playlist/Analysis";
import SpotifyContext from "../../../src/contexts/SpotifyContext";
import SpotifyNavbar from "../../../src/components/Navbars/SpotifyNavbar";
import UserDetails from "../../../src/components/Containers/UserDetails";
import RecommendationProvider from "../../../src/providers/RecommendationProvider";
import RecommendationContext from "../../../src/contexts/RecommendationContext";

export default function SpotifyDashboard() {
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
            <Container className="py-3">
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
                    <RecommendationProvider>
                      <Row>
                        <RecommendationContext.Consumer>
                          {({
                            selectedSeedArtists,
                            selectedSeedTracks,
                            clearSelectedSeeds,
                          }) => (
                            <Alert key="seed-alert" variant="light">
                              <Alert.Heading as="h5">
                                Selected Seeds (Max 5 in total)
                              </Alert.Heading>
                              <div>
                                Tracks:{" "}
                                {selectedSeedTracks.map((trackObj, idx) => (
                                  <Fragment key={trackObj.id}>
                                    {trackObj.name}
                                    {selectedSeedTracks[idx + 1] ? (
                                      <Fragment>, </Fragment>
                                    ) : (
                                      <></>
                                    )}
                                  </Fragment>
                                ))}
                              </div>
                              Artists:{" "}
                              {selectedSeedArtists.map((artistObj, idx) => (
                                <Fragment key={artistObj.id}>
                                  {artistObj.name}
                                  {selectedSeedArtists[idx + 1] ? (
                                    <Fragment>, </Fragment>
                                  ) : (
                                    <></>
                                  )}
                                </Fragment>
                              ))}
                              <hr />
                              <Button
                                variant="dark"
                                onClick={clearSelectedSeeds}
                              >
                                Clear Seeds
                              </Button>
                            </Alert>
                          )}
                        </RecommendationContext.Consumer>
                      </Row>
                      <Row>
                        <Col>
                          <RecommendationGenerator />
                        </Col>
                        <Col>
                          <RecommendationDisplay user={user} />
                        </Col>
                      </Row>
                    </RecommendationProvider>
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
