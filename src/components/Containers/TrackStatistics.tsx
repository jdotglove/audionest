import React, { useState } from 'react';
import { Container, Col, Row, Tab } from 'react-bootstrap';
import { SpotifyAPI } from '../../../types';
import TrackContext from '../../contexts/TrackContext';
import styles from '../../../styles/StatisticsSection.module.css';

export default function TrackStatistics(track: SpotifyAPI) {
  const [trackStats, updateTrackStats] = useState();
  return (
    <TrackContext.Consumer>
      {({ getTrackAudioFeatures, getTrackAudioAnalysis }) => (
        <Container>
          
        </Container>
      )}
    </TrackContext.Consumer>
  );
}
