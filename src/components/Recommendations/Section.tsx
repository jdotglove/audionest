import { Button } from 'react-bootstrap';
import SpotifyContext from '../../contexts/SpotifyContext';

export default function RecommendationsSections() {
  return (
    <SpotifyContext.Consumer>
      {({ getSeedRecommendations, recommendations }) => (
        <div>
          {recommendations ? (
            <div>{recommendations}</div>
          ) : (
            <Button onClick={getSeedRecommendations}>
              Get Seeds Recommendations!
            </Button>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
