import { Fragment } from "react";
import { Alert, Row, Col, Container, Tabs, Tab, Card, Button } from "react-bootstrap";

import RecommendationDisplay from "../../../src/components/Recommendation/Display";
import RecommendationGenerator from "../../../src/components/Recommendation/Generator";
import RecommendationSelection from "../../../src/components/Recommendation/Selection";
import PlaylistAnalysis from "../../../src/components/Playlist/Analysis";
import SpotifyContext from "../../../src/contexts/SpotifyContext";
import SpotifyNavbar from "../../../src/components/Navbars/SpotifyNavbar";
import UserDetails from "../../../src/components/Containers/UserDetails";
import RecommendationProvider from "../../../src/providers/RecommendationProvider";
import RecommendationContext from "../../../src/contexts/RecommendationContext";
import PlaylistProvider from "../../../src/providers/PlaylistProvider";
import PlaylistContext from "../../../src/contexts/PlaylistContext";

export default function SpotifyDashboard() {
  return (
    <Fragment>
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
                            dismissAddToQueueAlert,
                            selectedSeedArtists,
                            selectedSeedTracks,
                            clearSelectedSeeds,
                            showQueueAlert,
                            queueAddResult,
                          }) => (
                            <Card
                              className="my-2"
                              text="dark"
                              bg="light"
                              key="seed-alert"
                            >
                              <Card.Header>
                                <h5>Selected Seeds (Max 5 in total)</h5>
                              </Card.Header>
                              <Card.Body>
                                <div>
                                  Tracks:{" "}
                                  {selectedSeedTracks.map((trackObj, idx) => (
                                    <Fragment key={trackObj.id}>
                                      {trackObj.name}
                                      {selectedSeedTracks[idx + 1] ? (
                                        <Fragment>, </Fragment>
                                      ) : (
                                        <Fragment></Fragment>
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
                                      <Fragment></Fragment>
                                    )}
                                  </Fragment>
                                ))}
                              </Card.Body>
                              <Card.Footer>
                                <Row>
                                  <Col md={4}>
                                    <Button
                                      variant="danger"
                                      onClick={clearSelectedSeeds}
                                    >
                                      Clear Seeds
                                    </Button>
                                  </Col>
                                  <PlaylistContext.Consumer>
                                    {({ toggleShowPlaylistBuilder }) => (
                                      <Col md={{ span: 2, offset: 6 }}>
                                        <Button
                                          variant="dark"
                                          onClick={() =>
                                            toggleShowPlaylistBuilder(true)
                                          }
                                        >
                                          View Playlist
                                        </Button>
                                      </Col>
                                    )}
                                  </PlaylistContext.Consumer>
                                </Row>
                              </Card.Footer>
                              <Alert
                                show={showQueueAlert}
                                variant={queueAddResult}
                                onClose={() => dismissAddToQueueAlert()}
                                dismissible
                              >
                                {queueAddResult === 'success' ? (
                                  <div>Added To Queue!</div>) : (
                                    <div>Error Adding To Queue</div>
                                  )
                                }
                              </Alert>
                            </Card>
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
                      <RecommendationSelection user={user} />
                    </RecommendationProvider>
                  </Tab>
                </Tabs>
              </Row>
            </Container>
          )
        }
      </SpotifyContext.Consumer>
    </Fragment>
  );
}
