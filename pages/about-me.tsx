import AudioNestNavbar from '../src/components/Navbars/AudioNestNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import textStyles from '../styles/Text.module.css';

export default function AboutMe() {
  return (
    <div>
      <AudioNestNavbar />
      <Container>
        <Row>
          <Col>
            <h1 className={textStyles.medium}>About Me</h1>
          </Col>
        </Row>
        <Row>
          <Col className={textStyles.medium}>
            <p>
              I graduated from Tufts University where I played soccer and majored in Computer Science and have been with Verb
              since January 2020. I really enjoyed the opportunity to take class such as AI where I first saw how code could be written
              to learn from previous interations and GUI (Graphical User Interface) Object-Oriented Programming where I built a
              suggestion app that would suggest either a playlist, restaurant or Nature spot based on an initial survey and a facial
              analysis that could detect the displayed emotion.
            </p>
            <p>  
              After graduating I worked a Tech consulting position before joining the Customer Experience team at Verb Energy. 
              This position allowed me to have a first hand look at what goes into managing relationships with customers
              as well as getting used to what might be needed for agents on a CRM. Eventually, I migrated over to the Engineering team
              where I have developed as a Full Stack Engineer with a proclivity for Backend Engineering working mainly with Node.js, Vue,
              and GraphQL. I have also done some side project working using React, Django and WebRTC, looking to try and experiment with different
              music and audio technologies.
            </p>
            <p>
              Outside of tech, I am also a huge soccer fan (more specifically Liverpool) but also enjoy watching most sports.
              I am also very into music, boxing, and freestyle dance. In my free time I can be found, boxing, dancing, playing soccer around New York City,
              or playing chess.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
