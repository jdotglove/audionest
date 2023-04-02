import { Container } from 'react-bootstrap';

import styles from '../styles/Home.module.css';
import AudionestNavbar from '../src/components/Navbars/AudionestNavbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <AudionestNavbar />
      <Container>
        <main className={styles.main}>
          <h1> Welcome to AudioNest </h1>
          <p className={styles.description}>
            The nest you never want to leave...
          </p>
        </main>
        <div>
          <p>
            The aim of this website is to explore different types of audio integrations
            and house them all in a central place for myself and anyone else who might find
            my add on features useful
          </p>
          <p>
            It also shows my ability to integrate with 3rd party services and APIs as a testament
            to my industry experience in Backend Web Development
          </p>
        </div>
      </Container>
    </div>
  );
}
