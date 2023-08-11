import React, { Fragment } from "react";

import SpotifyContext from "../../contexts/SpotifyContext";
import PlaylistSelector from "../Buttons/PlaylistSelector";
<<<<<<< HEAD
import { Container, Card, ListGroup } from "react-bootstrap";
=======
import { Container } from "react-bootstrap";
>>>>>>> 5e972f4776011fa5e1cdd0b878045f71bda9da7c
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <Container>
          {playlists.length && (
<<<<<<< HEAD
            <Card className="d-grid m-3 gap-2" style={{ height: "50rem", maxWidth: "300px" }}>
                <h3>User Playlists</h3>
              <Card.Body className="overflow-scroll">
                <ListGroup>
                  {playlists.map(
                    (playlist: Audionest.Playlist, idx: number) => {
                      return (
                        <Fragment key={idx}>
                          <PlaylistSelector
                            playlist={playlist}
                            setSelectedPlaylist={setSelectedPlaylist}
                          />
                        </Fragment>
                      );
                    }
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
=======
            <div className="d-grid m-3 gap-2" style={{ maxWidth: "300px" }}>
              <h3>Let&#39;s see what we&#39;re working with...</h3>
              {playlists.map((playlist: Audionest.Playlist, idx: number) => {
                return (
                  <Fragment key={idx}>
                    <PlaylistProvider>
                      <PlaylistSelector
                        playlist={playlist}
                        setSelectedPlaylist={setSelectedPlaylist}
                      />
                    </PlaylistProvider>
                  </Fragment>
                );
              })}
            </div>
>>>>>>> 5e972f4776011fa5e1cdd0b878045f71bda9da7c
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
