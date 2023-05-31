import { Button } from 'react-bootstrap';
import SpotifyContext from '../../contexts/SpotifyContext';
import { Container } from 'react-bootstrap';

export default function RecommendationsSections() {
  return (
    <SpotifyContext.Consumer>
      {({ getSeedRecommendations, recommendations }) => (
        <Container>
          {recommendations ? (
            <div>{recommendations}</div>
          ) : (
            <Button onClick={getSeedRecommendations}>
              Get Seeds Recommendations!
            </Button>
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
