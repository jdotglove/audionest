import { Fragment } from "react";
import { Container } from "react-bootstrap";

import CrateDiggerInfo from "../../src/components/Modals/CrateDiggerInfo";
import RecommendationGeneratorContainer from "../../src/components/Recommendation/GeneratorContainer";
import SpotifyNavbar from "../../src/components/Navbars/SpotifyNavbar";

export default function RecommendationGeneratorPage() {
  return (
    <Fragment>
      <SpotifyNavbar />
      <Fragment>
        <CrateDiggerInfo />
        <Container className="py-3">
          <RecommendationGeneratorContainer />
        </Container>
      </Fragment>
    </Fragment>
  );
}
