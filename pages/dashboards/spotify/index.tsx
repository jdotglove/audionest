import { useState } from "react";
import { Row, Col, Container, Tabs, Tab, Alert } from "react-bootstrap";

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
        {({ isLoggedIn }) =>
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
                          {({ }) => (
                            <Alert key="seed-alert" variant="info">
                              <Alert.Heading as="h5">
                                Selected Seeds
                              </Alert.Heading>
                              No more than 5 seed items can be selected in
                              combination (ex. 2 artists, and 3 tracks)
                            </Alert>
                          )}
                        </RecommendationContext.Consumer>
                      </Row>
                      <Row>
                        <Col>
                          <RecommendationGenerator />
                        </Col>
                        <Col>
                          <RecommendationDisplay />
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
