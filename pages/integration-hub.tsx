import { Container } from 'react-bootstrap';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import MainNavbar from '../src/components/Navbars/MainNavbar';
import styles from '../styles/IntegrationHub.module.css';


export default function IntegrationHub() {
  return (
    <div className={styles.container}>
      <MainNavbar />
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
