import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import ChartContext from '../../contexts/ChartContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
export default function TrackStatistics() {
  return (
    <Container>
      <ChartContext.Consumer>
        {({ chartData }) => (
          chartData ? (
          <ListGroup>
            <Radar data={chartData} options={ { scales: { r: { min: 0, max: 100 } } }} />
          </ListGroup>) : (<p>
            Select a track to see analysis
          </p>)
        )}
      </ChartContext.Consumer>
    </Container>
  );
}
