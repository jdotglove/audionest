import React, { Fragment } from "react";
import NextImage from "next/image";
import { Button, Image, ListGroup } from "react-bootstrap";

import placeholderImg from "../../../public/placeholder.png"
import RecommendationContext from "../../contexts/RecommendationContext";
import RecommendationProvider from "../../providers/RecommendationProvider";
import { List } from "@mui/material";

export default function RecommendationDisplay() {
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          atLeastOneSeedSelected,
          generateRecommendations,
          recommendedTrackList,
          playlistToSave,
        }) => (
          <Fragment>
            <Button
              className="mx-3 mt-1"
              onClick={generateRecommendations}
              disabled={!atLeastOneSeedSelected()}
              variant={"light"}
            >
              Generate Playlist
            </Button>
            
            {playlistToSave() ? <Button
              className="mx-3 mt-1"
              onClick={generateRecommendations}
              variant={"light"}
            >
              Save Playlist
            </Button> : <></>}
            <ListGroup>
            {recommendedTrackList.map((track) => (
              <ListGroup.Item>
                {track.album.images[0] ? (
                  <Image
                    src={track.album.images[0]?.url}
                    height={55}
                    width={55}
                    roundedCircle
                    alt="Profile Picture"
                  />
                ) : (
                  <NextImage
                    src={placeholderImg}
                    height={55}
                    width={55}
                    alt="Profile Picture"
                  />
                )}
                <span className="px-2">
                {track.name} - {track.artists[0].name}
                </span>
              </ListGroup.Item>
            ))}
            </ListGroup>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
