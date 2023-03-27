import { Row } from 'react-bootstrap';

import styles from '../styles/Home.module.css';
import Navbar from '../src/components/Navbar';
export default function Contact() {
  return (
    <div className={styles.container}>
      <Row>
        <Navbar />
      </Row>
      <span>
        <title>This is our contact information</title>
        <meta name='description' content='contact information' />
      </span>
      <main className={styles.main}>
        <h1> (000) 000-000 </h1>
        <p className={styles.description}>
          glover.jarod@gmail.com
        </p>
      </main>
    </div>
  );
}
