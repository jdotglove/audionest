import { Row } from 'react-bootstrap';

import styles from '../styles/Home.module.css';
import Navbar from '../src/components/Navbar';
export default function Home() {
  return (
    <div className={styles.container}>
      <Row>
        <Navbar />
      </Row>
      <span>
        <title>CoffeeApp</title>
        <meta name='description' content='For all your coffee needs' />
      </span>
      <main className={styles.main}>
        <h1> Welcome to Coffee App </h1>
        <p className={styles.description}>
          For all your coffee needs
        </p>
      </main>
    </div>
  );
}
