import { Container } from 'react-bootstrap';

import styles from '../styles/Home.module.css';
import AudionestNavbar from '../src/components/Navbars/AudionestNavbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <AudionestNavbar />
      <Container fluid>
        <main className={styles.main}>
          <h1>Contact Information</h1>
        </main>
        <div>
          <p>
            <strong>Email: </strong>
            glover.jarod@gmail.com
          </p>
          <p>
            <strong>Phone Number: </strong>
            (336) 823-5386
          </p>
        </div>
      </Container>
    </div>
  );
}
