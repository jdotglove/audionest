import React, { useState } from 'react';
import { Container, Card, Col, ListGroup, Row, Tab } from 'react-bootstrap';
import SpotifyContext from '../../contexts/SpotifyContext';
import TrackContext from '../../contexts/TrackContext';
import styles from '../../../styles/StatisticsSection.module.css';
import TrackStatistics from './TrackStatistics';

export default function PlaylistStatistics() {
  const [currentTrackStats, setTrackStats] = useState(null);
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist }) => (
        <Container>
          {currentSelectedPlaylist && currentSelectedPlaylist.tracks.length && (
            <Tab.Container>
              <Row>
                <Col>
                  <h3>Selected Playlist Details:</h3>

                  <Card style={{ width: '18rem' }}>
                    <Card.Header
                      className={styles.playlistTrackContainerHeader}
                    >
                      <h5> {currentSelectedPlaylist.name} </h5>
                    </Card.Header>
                    <Card.Body>
                      <TrackContext.Consumer>
                        {({ getTrackAudioFeatures }) => (
                          <ListGroup className={styles.playlistTrackGroup}>
                            {currentSelectedPlaylist.tracks.map(
                              (
                                playlistTrackDetails: SpotifyApi.PlaylistTrackObject,
                              ) => {
                                return (
                                  <ListGroup.Item
                                    action
                                    variant="dark"
                                    key={playlistTrackDetails.track.id}
                                    eventKey={`${playlistTrackDetails.track.id}`}
                                    onClick={async () => {
                                      setTrackStats({
                                        ...(await getTrackAudioFeatures(
                                          playlistTrackDetails.track.id,
                                        )),
                                      });
                                    }}
                                  >
                                    {playlistTrackDetails.track.name}
                                  </ListGroup.Item>
                                );
                              },
                            )}
                          </ListGroup>
                        )}
                      </TrackContext.Consumer>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <h3> Track Statistics: </h3>
                  <Tab.Content>
                    {currentSelectedPlaylist.tracks.map(
                      (
                        playlistTrackDetails: SpotifyApi.PlaylistTrackObject,
                      ) => {
                        return (
                          <Tab.Pane
                            key={playlistTrackDetails.track.id}
                            eventKey={`${playlistTrackDetails.track.id}`}
                          >
                            {JSON.stringify(
                              currentTrackStats,
                              null,
                              4,
                            ) /* <TrackStatistics
                              trackStats={currentTrackStats}
                            /> */}
                          </Tab.Pane>
                        );
                      },
                    )}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
