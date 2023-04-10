import { Container } from 'react-bootstrap';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import AudioNestNavbar from '../src/components/Navbars/AudioNestNavbar';
import styles from '../styles/IntegrationHub.module.css';


export default function IntegrationHub() {
  return (
    <div className={styles.container}>
      <AudioNestNavbar />
        <Container>
          <div>
            <h1><span style={{ color: '#98611F' }}>Spotify</span> Integration</h1>
          </div>
          <div>
            <SpotifyAuth
              redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL}
              clientID={process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID}
              scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
              noLogo
              onAccessToken={(token: string) =>
                window.localStorage.setItem('token', token)
              }
            />
          </div>
      </Container>
    </div>
  );
}
