import NextImage from "next/image";
import React, { Fragment, useRef, useEffect, useContext } from "react";
import {
  Image,
  Form,
  Button,
  CardGroup,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import placeholderImg from "../../../public/placeholder.png";
import SpotifyContext from "../../contexts/SpotifyContext";
import RecommendationProvider from "../../providers/RecommendationProvider";
import RecommendationContext from "../../contexts/RecommendationContext";

export default function RecommendationGenerator() {
  const spotifyContext = useContext(SpotifyContext);
  const searchArtistInput = useRef(null);
  const searchTrackInput = useRef(null);

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
          addSeedArtist,
          addSeedTrack,
          atLeastOneSeedSelected,
          generateRecommendations,
          handleGenreInputChange,
          listOfSeedGenres,
        }) => (
          <Fragment>
            {/* <Card
                  bg="light"
                  className="mx-3 text-bg-light"
                  style={{ width: "24rem", height: "24rem" }}
                >
                  <Card.Title>
                    <h2 className="px-3 text-black">Seed Genres</h2>
                  </Card.Title>
                  <Card.Body className="overflow-scroll">
                    <Form>
                      {listOfSeedGenres.map((genre) => (
                        <div
                          key={`inline-${genre}`}
                          className="mb-3 text-black"
                        >
                          <Form.Check
                            inline
                            label={genre}
                            onClick={(e) =>
                              handleGenreInputChange(genre, e.target)
                            }
                            id={`inline-${genre}-3`}
                          />
                        </div>
                      ))}
                    </Form>
                  </Card.Body>
                </Card> */}
            <Card
              className="mx-3 text-bg-light"
              style={{ width: "24rem", height: "22rem" }}
            >
              <Card.Title>
                <h2 className="px-3 text-black">Seed Artists</h2>
                <p className="px-3 text-black">Limited to top 3 results</p>
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
            <Card
              className="mx-3 text-bg-light"
              style={{ width: "24rem", height: "22rem" }}
            >
              <Card.Title>
                <h2 className="px-3 text-black">Seed Tracks</h2>
                <p className="px-3">Limited to top 3 results</p>
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
                        <div key={track.id} onClick={() => addSeedTrack(track)}>
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
          </Fragment>
        )}
      </RecommendationContext.Consumer>
    </Fragment>
  );
}
