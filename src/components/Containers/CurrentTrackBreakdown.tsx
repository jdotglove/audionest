import React, { Fragment, useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";

import RecommendationContext from "../../contexts/RecommendationContext";
import ChartContext from "../../contexts/ChartContext";
import TrackStatistics from "../Track/Statistics";

export default function CurrentTrackBreakdown() {
  const { currentTrackBreakdown, noVibesAlert } = useContext(RecommendationContext);
  const { setChartData } = useContext(ChartContext);
  useEffect(() => {
    if (currentTrackBreakdown && currentTrackBreakdown.item) {
      setChartData([currentTrackBreakdown.item.id])
    }
  },[currentTrackBreakdown])
  return (
    <Fragment>
      {currentTrackBreakdown && currentTrackBreakdown.item ? (
        <Fragment>
          Current Item: {currentTrackBreakdown.item.name} -{" "}
          {currentTrackBreakdown.item.artists[0].name}
          <TrackStatistics />
        </Fragment>
      ) : (
        <Fragment>
          {noVibesAlert ? (
            <Alert
              variant="info"
            >
              Play a track to checkout your current vibes
            </Alert>
          ) : (<Fragment></Fragment>)}
        </Fragment>
      )}
    </Fragment>
  );
}
