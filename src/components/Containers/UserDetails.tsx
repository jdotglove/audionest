import React from 'react';
import { Container, Card, Col, ListGroup, Row, Button } from 'react-bootstrap';
import SpotifyContext from '../../contexts/SpotifyContext';
import styles from '../../../styles/StatisticsSection.module.css';
import TrackSelector from '../Buttons/TrackSelector';
import ChartContext from '../../contexts/ChartContext';

export default function PlaylistDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ topTracks }) => (
        <Container>
          Hello
          { topTracks && (
            <Row>
              <Col>
                <h3>Selected Playlist Details:</h3>
                <Card style={{ width: '18rem' }}>
                  <Card.Header
                    className={styles['playlist-track-container-header']}
                  >
                    <h5> {topTracks} </h5>
                    
                  </Card.Header>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
