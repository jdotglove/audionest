import React from "react";
import { Container, Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import SpotifyContext from "../../contexts/SpotifyContext";
import styles from "../../../styles/StatisticsSection.module.css";
import TrackSelector from "../Buttons/TrackSelector";
import ChartContext from "../../contexts/ChartContext";

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist, setSelectedTracks }) => (
        <Container>
          {currentSelectedPlaylist &&
            currentSelectedPlaylist.tracks &&
            currentSelectedPlaylist.tracks.length && (
              <Row>
                <Col>
                  <h3>Selected Playlist Details:</h3>
                  <Card bg="light" style={{ width: "18rem" }}>
                    <Card.Header
                      className={styles["playlist-track-container-header"]}
                    >
                      <h5> {currentSelectedPlaylist.name} </h5>
                      <ChartContext.Consumer>
                        {({ setChartData }) => (
                          <Button
                            onClick={async () => {
                              const trackIdArray =
                                currentSelectedPlaylist.tracks.map(
                                  ({ _id }) => _id
                                );
                              setSelectedTracks(trackIdArray);
                              await setChartData(trackIdArray);
                            }}
                          >
                            Show Full Playlist Breakdown
                          </Button>
                        )}
                      </ChartContext.Consumer>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup className={styles["playlist-track-group"]}>
                        {currentSelectedPlaylist.tracks.map((track) => (
                          <TrackSelector
                            key={track._id}
                            track={track}
                            setSelectedTracks={setSelectedTracks}
                          />
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
