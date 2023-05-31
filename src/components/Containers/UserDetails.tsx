import React, { useEffect, useState } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';

import SpotifyContext from '../../contexts/SpotifyContext';
import styles from '../../../styles/StatisticsSection.module.css';
// import TrackSelector from '../Buttons/TrackSelector';
// import ChartContext from '../../contexts/ChartContext';

export default function UserDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ topTracks, topArtists }) => (
        <Container>
          <Row>
            <Col>
              {topTracks && (
                <div>
                  <h3>Here are your current top tracks</h3>
                  <Card style={{ width: '30rem' }}>
                    <Card.Header
                      className={styles['playlist-track-container-header']}
                    >
                      {topTracks.map((track, index) => (
                        <div key={track._id}>
                          {index + 1}. {track.name} - {track.artists[0].name} <></>
                          {track.artists.length > 1 && (
                            <span>feat. {track.artists[1].name}</span>
                          )}
                        </div>
                      ))}
                    </Card.Header>
                  </Card>
                </div>
              )}
            </Col>
            <Col>
              {topArtists && (
                <div>
                  <h3>Here are your current top artists</h3>
                  <Card style={{ width: '30rem' }}>
                    <Card.Header
                      className={styles['playlist-track-container-header']}
                    >
                      {topArtists.map((artist, index) => (
                        <div key={artist._id}>
                          {index + 1}. {artist.name} - Popularity: {artist.popularity}
                        </div>
                      ))}
                    </Card.Header>
                  </Card>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
