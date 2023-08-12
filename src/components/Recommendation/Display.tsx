import React, { Fragment } from "react";
import NextImage from "next/image";
import { Button, Image, ListGroup, Row, Col, Card } from "react-bootstrap";

import { parseUriForId } from "../../utils/spotify";
import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import PlaylistContext from "../../contexts/PlaylistContext";

export default function RecommendationDisplay({ user }) {
  const userSpotifyId = parseUriForId(user.uri);
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          addToQueue,
          atLeastOneSeedSelected,
          generateRecommendations,
          recommendedTrackList,
        }) => (
          <Fragment>
            <Row className="mx-2 pb-2">
              <Col>
                <Button
                  className="mt-1"
                  onClick={generateRecommendations}
                  disabled={!atLeastOneSeedSelected()}
                  variant={"light"}
                >
                  Generate Recommendations
                </Button>
              </Col>
              <Col>
                <Button
                  className="mt-1"
                  onClick={addToQueue}
                  disabled={recommendedTrackList.length === 0}
                  variant={"light"}
                >
                  Add All To Queue
                </Button>
              </Col>
            </Row>
            <Card
              style={{ width: "40rem", height: "32rem" }}
              className="mx-2 overflow-scroll"
            >
              <ListGroup variant="flush">
                {recommendedTrackList.map((track) => (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    key={track.id}
                  >
                    {track.album.images[0] ? (
                      <Image
                        src={track.album.images[0]?.url}
                        height={55}
                        width={55}
                        roundedCircle
                        alt="Track Picture"
                      />
                    ) : (
                      <NextImage
                        src={placeholderImg}
                        height={55}
                        width={55}
                        alt="Default Track Picture"
                      />
                    )}
                    <span className="px-2">
                      {track.name} - {track.artists[0].name}
                    </span>
                    <PlaylistContext.Consumer>
                      {({ addToPlaylistBuilder }) => (
                        <Fragment>
                          <Button
                            variant="link"
                            onClick={() => addToPlaylistBuilder(track)}
                          >
                            Add To Playlist
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => addToQueue(userSpotifyId, track)}
                          >
                            Add To Queue
                          </Button>
                        </Fragment>
                      )}
                    </PlaylistContext.Consumer>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
