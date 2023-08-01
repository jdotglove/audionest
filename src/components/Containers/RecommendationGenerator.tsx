import React, { Fragment, useRef, useEffect, useContext } from "react";
import { Container, Form, Button, CardGroup, Row, Card } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

import SpotifyContext from "../../contexts/SpotifyContext";
import RecommendationProvider from "../../providers/RecommendationProvider";
import RecommendationContext from "../../contexts/RecommendationContext";

export default function RecommendationGenerator() {
  const spotifyContext = useContext(SpotifyContext);
  const searchArtistInput = useRef('');
  const searchTrackInput = useRef('');

  const handleSearchArtists = () => {
    const searchValue = searchArtistInput.current.value;
    if (searchValue !== '') {
      spotifyContext.searchItems('artist', searchValue);
    }
  };
  const handleSearchTracks = () => {
    const searchValue = searchTrackInput.current.value;
    if (searchValue !== '') {
      spotifyContext.searchItems('track', searchValue);
    }
  };

  return (
    <Container>
      {/* @ts-ignore */}
      <RecommendationProvider>
        <RecommendationContext.Consumer>
          {({ listOfSeedGenres }) => (
            <Fragment>
              <Row>
                <div className="pb-3">
                  No more than 5 seed items can be selected in combination (ex.
                  2 genres, 2 artists, and 1 track)
                </div>
              </Row>
              <CardGroup>
                <Card
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
                            id={`inline-${genre}-3`}
                          />
                        </div>
                      ))}
                    </Form>
                  </Card.Body>
                </Card>
                <Card
                  className="mx-3 text-bg-light"
                  style={{ width: "24rem", height: "24rem" }}
                >
                  <Card.Title>
                    <h2 className="px-3 text-black">Seed Artists</h2>
                  </Card.Title>
                  <Card.Body className="overflow-scroll">
                    <Form>
                      <div className="input-group mb-3">
                        <span
                          className="text-black input-group-text"
                          id="search-artists"
                        >
                          <SearchIcon />
                        </span>
                        <input
                          type="text"
                          ref={searchArtistInput}
                          className="form-control"
                          aria-label="Search Artists"
                          aria-describedby="search-artists"
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          type="button"
                          className="btn btn-primary mb-3"
                          // @ts-ignore
                          onClick={handleSearchArtists}
                        >
                          Search
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <Card
                  className="mx-3 text-bg-light"
                  style={{ width: "24rem", height: "24rem" }}
                >
                  <Card.Title>
                    <h2 className="px-3 text-black">Seed Tracks</h2>
                  </Card.Title>
                  <Card.Body className="overflow-scroll">
                    <Form>
                      <div className="input-group mb-3">
                        <span
                          className="text-black input-group-text"
                          id="search-tracks"
                        >
                          <SearchIcon />
                        </span>
                        <input
                          type="text"
                          ref={searchTrackInput}
                          className="form-control"
                          aria-label="Search Tracks"
                          aria-describedby="search-tracks"
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          type="button"
                          className="btn btn-primary mb-3"
                          //@ts-ignore
                          onClick={handleSearchTracks}
                        >
                          Search
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Fragment>
          )}
        </RecommendationContext.Consumer>
      </RecommendationProvider>
    </Container>
  );
}
