import React, { useEffect, useState } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';

import SpotifyContext from '../../contexts/SpotifyContext';
import styles from '../../../styles/StatisticsSection.module.css';
import PlaylistDisplay from '../Playlist/Display';
import PlaylistDetails from './PlaylistDetails';
import TrackStatistics from './TrackStatistics';
// import TrackSelector from '../Buttons/TrackSelector';
// import ChartContext from '../../contexts/ChartContext';

export default class PlaylistAnalysis extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <PlaylistDisplay />
          </Col>
          <Col>
            <PlaylistDetails />
          </Col>
          <Col>
            <TrackStatistics />
          </Col>
        </Row>
      </Container>
    );
  }
}
