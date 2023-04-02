import styles from '../styles/Home.module.css';
import AudionestNavbar from '../src/components/Navbars/AudionestNavbar';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <div className={styles.container}>
      <AudionestNavbar />
      <Container fluid>
      <main className={styles.main}>
        <h1>About Me</h1>
      </main>
        <div>
          <p>
            I graduated from Tufts University where I played soccer and majored in Computer Science and have been with Verb
            since January 2020. Originally I started out of the Customer Experience team which gave me a first hand look at
            what goes into managing relationships with customers as well as getting used to what might be needed for agents
            on a CRM. I have developed as a Full Stack Engineer with a proclivity for Backend Engineering working
            mainly with Node.js, Vue, and GraphQL. I have also done some side project working using React, Django and WebRTC,
            looking to try and experiment with different music and audio technologies.
          </p>
          <p>
            Outside of tech, I am also a huge soccer fan (more specifically Liverpool) but also enjoy watching most sports.
            I am also very into music and freestyle dance, I mainly look to find new artists while also keeping a pulse on
            current popular music and new trends. Recently I have also picked up boxing and attending hip hop choreography
            classes in my free time along with playing soccer around the New York City in order to stay active.
          </p>
        </div>
      </Container>
    </div>
  );
}
