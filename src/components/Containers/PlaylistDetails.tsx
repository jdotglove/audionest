import React from 'react';
import { Container, Card, Col, ListGroup, Row } from 'react-bootstrap';
import SpotifyContext from '../../contexts/SpotifyContext';
import styles from '../../../styles/StatisticsSection.module.css';
import TrackSelector from '../Buttons/TrackSelector';

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ currentSelectedPlaylist, setSelectedTracks }) => (
        <Container>
          {currentSelectedPlaylist && currentSelectedPlaylist.tracks.length && (
            <Row>
              <Col>
                <h3>Selected Playlist Details:</h3>
                <Card style={{ width: '18rem' }}>
                  <Card.Header className={styles.playlistTrackContainerHeader}>
                    <h5> {currentSelectedPlaylist.name} </h5>
                  </Card.Header>
                  <Card.Body>
                  {/* <p>{ JSON.stringify(currentSelectedPlaylist.tracks[0].track, null, 4) }</p> */}
                        <ListGroup>
                          {currentSelectedPlaylist.tracks.map(
                            (
                              { track },
                            ) => (
                              <TrackSelector key={track.id} track={track} setSelectedTracks={setSelectedTracks} />
                            ),
                          )}
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
