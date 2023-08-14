import { Fragment, useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  Offcanvas,
  ListGroup,
  Image,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import NextImage from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { parseUriForId } from "../../utils/spotify";
import placeholderImg from "../../../public/placeholder.png";
import RecommendationContext from "../../contexts/RecommendationContext";
import SpotifyContext from "../../contexts/SpotifyContext";

export default function RecommendationSeedSearch() {
  const [searchTarget, setSeedTarget] = useState("Artists");
  const trackSearchSelected = useRef(null);
  const artistSearchSelected = useRef(null);
  const spotifyContext = useContext(SpotifyContext);
  const searchArtistInput = useRef(null);
  const searchTrackInput = useRef(null);
  useEffect(() => {
    console.log("Artist Selected: ", artistSearchSelected.current?.value);
    console.log("Track Selected: ", trackSearchSelected.current?.value);
  }, [trackSearchSelected, artistSearchSelected]);

  const onOptionChange = (e) => {
    setSeedTarget(e.target.value);
  };

  const handleSearchArtists = () => {
    const searchValue = searchArtistInput.current.value;
    if (searchValue !== "") {
      spotifyContext.searchItems("artist", searchValue);
    }
  };
  const handleSearchTracks = () => {
    const searchValue = searchTrackInput.current.value;
    if (searchValue !== "") {
      spotifyContext.searchItems("track", searchValue);
    }
  };
  return (
    <Fragment>
      <RecommendationContext.Consumer>
        {({
          toggleShowSeedSearch,
          showSeedSearch,
          addSeedArtist,
          addSeedTrack,
        }) => (
          <Fragment>
            <Offcanvas
              placement="start"
              show={showSeedSearch}
              onHide={() => toggleShowSeedSearch(false)}
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title>Playlist Seed Search</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Row className="px-3">
                  <Col md={3}>
                    <input
                      type="radio"
                      id="artists-search"
                      name="seed_search_selection"
                      checked={searchTarget === "Artists"}
                      value="Artists"
                      ref={artistSearchSelected}
                      onChange={onOptionChange}
                    />{" "}
                    <label htmlFor="artist-search">Artists</label>
                  </Col>
                  <Col md={3}>
                    <input
                      type="radio"
                      id="track-search"
                      name="seed_search_selection"
                      checked={searchTarget === "Tracks"}
                      value="Tracks"
                      ref={trackSearchSelected}
                      onChange={onOptionChange}
                    />{" "}
                    <label htmlFor="track-search">Tracks</label>
                  </Col>
                </Row>
                <ListGroup className="pt-3" variant="flush">
                  <Fragment>
                    {searchTarget === "Artists" ? (
                      <Card style={{ width: "24rem", height: "35rem" }}>
                        <Card.Title>
                          <h2 className="px-3 text-white">Seed Artists</h2>
                          <div className="px-3 input-group mb-3">
                            <span
                              className="text-black input-group-text"
                              id="search-artists"
                            >
                              <SearchIcon />
                            </span>
                            <input
                              type="text"
                              ref={searchArtistInput}
                              aria-label="Search Artists"
                              aria-describedby="search-artists"
                            />
                            <Button
                              type="button"
                              className="btn btn-primary px-1 mx-1"
                              onClick={handleSearchArtists}
                            >
                              Search
                            </Button>
                          </div>
                          <div className="px-3">
                            <h5>Search Results:</h5>
                          </div>
                        </Card.Title>
                        <Card.Body className="overflow-scroll">
                          <SpotifyContext.Consumer>
                            {({ artistSearchResults }) => (
                              <ListGroup variant="flush">
                                {artistSearchResults.map((artist) => (
                                  <div
                                    key={artist.id}
                                    onClick={() => addSeedArtist(artist)}
                                  >
                                    <ListGroup.Item
                                      action
                                      variant="light"
                                      className="d-flex justify-content-between align-items-center"
                                    >
                                      {artist.images[0] ? (
                                        <Image
                                          src={artist.images[0]?.url}
                                          height={55}
                                          width={55}
                                          roundedCircle
                                          alt="Artist Profile Picture"
                                        />
                                      ) : (
                                        <NextImage
                                          src={placeholderImg}
                                          height={55}
                                          width={55}
                                          alt="Default Artist Profile Picture"
                                        />
                                      )}
                                      {artist.name}
                                      <AddIcon />
                                    </ListGroup.Item>
                                  </div>
                                ))}
                              </ListGroup>
                            )}
                          </SpotifyContext.Consumer>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card
                        style={{ width: "24rem", height: "35rem" }}
                      >
                        <Card.Title>
                          <h2 className="px-3 text-white">Seed Tracks</h2>
                          <div className="px-3 input-group mb-3">
                            <span
                              className="text-black input-group-text"
                              id="search-tracks"
                            >
                              <SearchIcon />
                            </span>
                            <input
                              type="text"
                              ref={searchTrackInput}
                              aria-label="Search Tracks"
                              aria-describedby="search-tracks"
                            />
                            <Button
                              type="button"
                              className="btn btn-primary px-1 mx-1"
                              onClick={handleSearchTracks}
                            >
                              Search
                            </Button>
                          </div>
                          <div className="px-3">
                            <h5>Search Results:</h5>
                          </div>
                        </Card.Title>
                        <Card.Body className="overflow-scroll">
                          <SpotifyContext.Consumer>
                            {({ trackSearchResults }) => (
                              <ListGroup variant="flush">
                                {trackSearchResults.map((track) => (
                                  <div
                                    key={track.id}
                                    onClick={() => addSeedTrack(track)}
                                  >
                                    <ListGroup.Item
                                      action
                                      variant="light"
                                      className="d-flex justify-content-between align-items-center"
                                    >
                                      {track.album.images[0] ? (
                                        <Image
                                          src={track.album.images[0]?.url}
                                          height={55}
                                          width={55}
                                          roundedCircle
                                          alt="Track Album Picture"
                                        />
                                      ) : (
                                        <NextImage
                                          src={placeholderImg}
                                          height={55}
                                          width={55}
                                          alt="Default Album Profile Picture"
                                        />
                                      )}
                                      {track.name} - {track.artists[0].name}
                                      <AddIcon />
                                    </ListGroup.Item>
                                  </div>
                                ))}
                              </ListGroup>
                            )}
                          </SpotifyContext.Consumer>
                        </Card.Body>
                      </Card>
                    )}
                  </Fragment>
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
