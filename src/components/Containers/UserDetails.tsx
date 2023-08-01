import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, SSRProvider } from "react-bootstrap";

import ArtistProvider from "../../providers/ArtistProvider";
import ArtistContext from "../../contexts/ArtistContext";
import TrackProvider from "../../providers/TrackProvider";
import TrackContext from "../../contexts/TrackContext";
import SpotifyContext from "../../contexts/SpotifyContext";
import styles from "../../../styles/StatisticsSection.module.css";

export default function UserDetails() {
  return (
    <SpotifyContext.Consumer>
      {({ topTracks, topArtists }) => (
        <Container>
          <SSRProvider>
            <Row>
              <Col>
                {topTracks && (
                  <div>
                    <h3>Here are your current top tracks</h3>
                    <Card
                      className="overflow-scroll"
                      bg="light"
                      style={{ height: "24rem", width: "32rem" }}
                    >
                      <Card.Header
                        className={styles["playlist-track-container-header"]}
                      >
                        {topTracks.map((trackId, index) => (
                          // @ts-ignore
                          <TrackProvider
                            key={`track-${trackId}`}
                            trackId={trackId}
                          >
                            <TrackContext.Consumer>
                              {({ name, artists, getTrackArtist }) => (
                                <div>
                                  {index + 1}. {name} -{" "}
                                  {artists.map((artistId, idx) => (
                                    // @ts-ignore
                                    <ArtistProvider
                                      key={`track-artist-${artistId}`}
                                      artistId={artistId}
                                    >
                                      <ArtistContext.Consumer>
                                        {({ name: artistName }) => (
                                          <>
                                            {artistName}
                                            {artists.length - 1 > idx ? (
                                              <>, </>
                                            ) : (
                                              <> </>
                                            )}{" "}
                                          </>
                                        )}
                                      </ArtistContext.Consumer>
                                    </ArtistProvider>
                                  ))}
                                </div>
                              )}
                            </TrackContext.Consumer>
                          </TrackProvider>
                        ))}
                      </Card.Header>
                    </Card>
                  </div>
                )}
              </Col>
              <Col>
                {topArtists.length > 0 && (
                  <div>
                    <h3>Here are your current top artists</h3>
                    <Card
                      className="overflow-scroll"
                      bg="light"
                      style={{ height: "24rem", width: "32rem" }}
                    >
                      <Card.Header
                        className={styles["playlist-track-container-header"]}
                      >
                        {topArtists.map((artistId, index) => (
                          // @ts-ignore
                          <ArtistProvider
                            key={`artist-${artistId}`}
                            artistId={artistId}
                          >
                            <ArtistContext.Consumer>
                              {({ name, popularity }) => (
                                <div>
                                  {index + 1}. {name} - Popularity: {popularity}
                                </div>
                              )}
                            </ArtistContext.Consumer>
                          </ArtistProvider>
                        ))}
                      </Card.Header>
                    </Card>
                  </div>
                )}
              </Col>
            </Row>
          </SSRProvider>
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
