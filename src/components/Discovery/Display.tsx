import NextImage from "next/image";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Card, Container, Nav, Tab, Col, Row } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import DiscoveryContext from "../../contexts/DiscoveryContext";

export default function DiscoveryDisplay() {
  const { browsingCategories } = useContext(DiscoveryContext);
  const [newReleaseItems, setNewReleaseItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("New Releases");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (
    itemsArray: Array<any>,
    itemsCategory: string,
    refresh?: boolean
  ) => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    if (browsingCategories[itemsCategory]) {
      setIsLoading(true);
      const currentPage = refresh ? 0 : page;
      console.log(currentPage);
      let currentHasMore = refresh ? true : hasMore;
      setTimeout(async () => {
        await browsingCategories[itemsCategory](currentPage).then(
          (newReleasePage: Array<any>) => {
            const filteredArray = newReleasePage.filter((item) => item);
            console.log("Filtered: ", filteredArray);
            if (
              filteredArray &&
              (filteredArray.length === 0 || filteredArray.length < 16)
            ) {
              currentHasMore = false;
              setIsLoading(false);
            }
            if (refresh) {
              setNewReleaseItems([...filteredArray]);
            } else {
              setNewReleaseItems(itemsArray.concat(filteredArray));
            }
            setHasMore(currentHasMore);
            setPage(currentPage + 1);
          }
        );
      }, 200);
    }
  };

  const handleNewCategory = async (category: string) => {
    setCurrentCategory(category);
    await fetchData(newReleaseItems, category, true);
  };

  useEffect(() => {
    if (hasMore) {
      fetchData(newReleaseItems, currentCategory);
    }
  });

  return (
    <Fragment>
      <Tab.Container defaultActiveKey="New Releases">
        <Row>
          <Col
            sm={2}
            md={2}
            style={{
              height: "40rem",
            }}
            className="category-column overflow-scroll"
          >
            <Nav variant="pills" className="flex-column">
              <Fragment>
                {Object.keys(browsingCategories).map(
                  (category: string, idx) => (
                    <Nav.Item key={category}>
                      <Nav.Link
                        eventKey={category}
                        disabled={isLoading}
                        onClick={async () => await handleNewCategory(category)}
                      >
                        {category}{" "}
                        {idx === 0 ? (
                          <Fragment></Fragment>
                        ) : (
                          <Fragment>Playlists</Fragment>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  )
                )}
              </Fragment>
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey={currentCategory}>
                <Card
                  className="responsive"
                  style={{ height: "55rem", width: "100%" }}
                >
                  <Card.Header as="h2" style={{ textAlign: "center" }}>
                    New Releases
                  </Card.Header>
                  <Card.Body className="overflow-scroll">
                    <InfiniteScroll
                      dataLength={newReleaseItems.length * 2} //This is important field to render the next data
                      next={() => fetchData(newReleaseItems, currentCategory)}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {newReleaseItems.length > 0 &&
                        newReleaseItems.map((albumRelease, idx) => (
                          <Fragment key={`${albumRelease?.id}-${idx}`}>
                            {albumRelease ? (
                              <div className="responsive py-4">
                                <div className="gallery">
                                  <a
                                    target="_blank"
                                    href={albumRelease.external_urls.spotify}
                                  >
                                    <img
                                      src={albumRelease.images[0]?.url}
                                      alt={`${albumRelease.name}-image`}
                                      width={albumRelease.images[0]?.width}
                                      height={albumRelease.images[0]?.height}
                                    />
                                    <div className="album-name">
                                      {albumRelease.artists
                                        ? albumRelease.artists[0].name
                                        : albumRelease.name}
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <Fragment></Fragment>
                            )}
                          </Fragment>
                        ))}
                    </InfiniteScroll>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}
