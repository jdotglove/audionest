import NextImage from "next/image";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";

import InfiniteScroll from 'react-infinite-scroll-component';
import DiscoveryContext from "../../contexts/DiscoveryContext";

export default function DiscoveryDisplay() {
  const { fetchNewReleases } = useContext(DiscoveryContext);
  const [newReleaseItems, setNewReleaseItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(async () => {
      const newReleasePage = await fetchNewReleases(page);
      if (newReleasePage.length === 0) {
        setHasMore(false);
        return;
      }
      setNewReleaseItems(
        newReleaseItems.concat(newReleasePage)
      );
      setPage(page + 1);
    }, 500);
  };

  useEffect(() => {
    fetchData();
  })


  return (
    <Fragment>
      <Card
        className="responsive"
        style={{ height: "50rem", width: "100%" }}
      >
        <Card.Header as="h2" style={{ textAlign: "center" }}>
          New Releases
        </Card.Header>
        <Card.Body className="overflow-scroll">
            <Fragment>
              <InfiniteScroll
                dataLength={newReleaseItems.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //   <h3 style={{ textAlign: "center" }}>
                //     &#8595; Pull down to refresh
                //   </h3>
                // }
                // releaseToRefreshContent={
                //   <h3 style={{ textAlign: "center" }}>
                //     &#8593; Release to refresh
                //   </h3>
                // }
              >
                {newReleaseItems.length > 0 && newReleaseItems.map((albumRelease, idx) => (
                  <Fragment key={`${albumRelease.id}-${idx}`}>
                    <div className="responsive py-5">
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
                            {albumRelease.artists[0].name}
                          </div>
                        </a>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </InfiniteScroll>
            </Fragment>
          {error && <p>Error: {error.message}</p>}
        </Card.Body>
       </Card>
    </Fragment>
  );
}
