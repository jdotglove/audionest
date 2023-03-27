import { Row } from 'react-bootstrap';

import styles from '../styles/Home.module.css';
import Navbar from '../src/components/Navbar';
export default function AboutUs() {
  return (
    <div className={styles.container}>
      <Row>
        <Navbar />
      </Row>
      <span>
        <title>This is about us</title>
        <meta name='description' content='about us' />
      </span>
      <main className={styles.main}>
        <p className={styles.description}>
          This is our story and we hope you enjoy hearing about it
        </p>
      </main>
    </div>
  );
}
