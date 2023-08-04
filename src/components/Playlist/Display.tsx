import React, { Fragment } from "react";

import SpotifyContext from "../../contexts/SpotifyContext";
import PlaylistSelector from "../Buttons/PlaylistSelector";
import { Container } from "react-bootstrap";
import PlaylistProvider from "../../providers/PlaylistProvider";

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <Container>
          {playlists.length && (
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
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
