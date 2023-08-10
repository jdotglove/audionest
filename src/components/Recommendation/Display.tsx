import React, { Fragment, useContext, useState, useRef } from "react";
import NextImage from "next/image";
import { Button, Image, ListGroup, Row, Col, Card, Modal } from "react-bootstrap";

import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import { parseUriForId } from "../../utils/spotify";

export default function RecommendationDisplay({ user }) {
  const playlistTitleInput = useRef(null);
  const playlistDescriptionInput = useRef(null);
  const userSpotifyId = parseUriForId(user.uri);
  const [modelOpen, setModalOpen] = useState(false);
  const { savePlaylist } = useContext(RecommendationContext);
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleSave = () => {
    const title = playlistTitleInput.current.value;
    const description = playlistDescriptionInput.current.value;
    handleCloseModal();
    savePlaylist(user._id, userSpotifyId, title, description);
  }
  return (
    <Fragment>
      <Modal show={modelOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Playlist Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-2">
            <Col>
              Playlist Title:{' '}
              <input
                type="text"
                ref={playlistTitleInput}
                aria-label="Playlist Title"
                aria-describedby="playlist-title"
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              Playlist Description:{' '}
              <textarea
                maxLength={150}
                ref={playlistDescriptionInput}
                aria-label="Playlist Title"
                aria-describedby="playlist-title"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <RecommendationContext.Consumer>
        {({
          atLeastOneSeedSelected,
          generateRecommendations,
          recommendedTrackList,
          playlistToSave,
        }) => (
          <Fragment>
            <Row className="pb-2">
              <Col>
                <Button
                  className="mx-3 mt-1"
                  onClick={generateRecommendations}
                  disabled={!atLeastOneSeedSelected()}
                  variant={"light"}
                >
                  Generate New Playlist
                </Button>

                {playlistToSave() ? (
                  <Button
                    className="mx-3 mt-1"
                    onClick={handleOpenModal}
                    variant={"light"}
                  >
                    Save Playlist
                  </Button>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Card
              style={{ width: "32rem", height: "32rem" }}
              className="overflow-scroll"
            >
              <ListGroup variant="flush">
                {recommendedTrackList.map((track) => (
                  <ListGroup.Item key={track.id}>
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
