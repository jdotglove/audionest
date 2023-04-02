import { Container } from 'react-bootstrap';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import AudionestNavbar from '../../src/components/Navbars/AudionestNavbar';
import styles from '../../styles/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <AudionestNavbar />
        <Container>
          <div>
            <h1>Spotify Integration</h1>
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
