import React from 'react';
import { Card, Col, ListGroup, Row, Tab } from 'react-bootstrap';
import { SpotifyAPI } from '../../../types';
import SpotifyContext from '../../contexts/SpotifyContext';
import styles from '../../../styles/StatisticsSection.module.css';

export default function PlaylistStatistics() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist }) => (
        <div>
          {currentSelectedPlaylist && currentSelectedPlaylist.tracks.length && (
            <Tab.Container>
              <Row className="d-flex">
                <Col>
                  <h3>Selected Playlist Details:</h3>
                  
                  <Card style={{ width: '18rem' }}>
                    <Card.Header
                      className={styles.playlistTrackContainerHeader}
                    >
                      <h5> { currentSelectedPlaylist.name } </h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup>
                        {currentSelectedPlaylist.tracks.map(
                          (
                            playlistTrackDetails: SpotifyAPI.PlaylistTrackDetails,
                          ) => {
                            return (
                              <ListGroup.Item
                                action
                                variant="dark"
                                key={playlistTrackDetails.track.id}
                                eventKey={`${playlistTrackDetails.track.id}`}
                              >
                                {playlistTrackDetails.track.name}
                              </ListGroup.Item>
                            );
                          },
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <h3> Popularity: </h3>
                  <Tab.Content>
                    {currentSelectedPlaylist.tracks.map(
                      (
                        playlistTrackDetails: SpotifyAPI.PlaylistTrackDetails,
                      ) => {
                        return (
                          <Tab.Pane
                            key={playlistTrackDetails.track.id}
                            eventKey={`${playlistTrackDetails.track.id}`}
                          >
                            {playlistTrackDetails.track.popularity}
                          </Tab.Pane>
                        );
                      },
                    )}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
