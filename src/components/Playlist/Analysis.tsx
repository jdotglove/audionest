import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

import SpotifyContext from "../../contexts/SpotifyContext";
import styles from "../../../styles/StatisticsSection.module.css";
import PlaylistDisplay from "./Display";
import PlaylistDetails from "./Details";
import TrackStatistics from "../Track/Statistics";
// import TrackSelector from '../Buttons/TrackSelector';
// import ChartContext from '../../contexts/ChartContext';

export default function PlaylistAnalysis() {
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
