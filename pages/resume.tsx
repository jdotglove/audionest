import AudioNestNavbar from '../src/components/Navbars/AudioNestNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import textStyles from '../styles/Text.module.css';

export default function Resume() {
  return (
    <div>
      <AudioNestNavbar />
      <Container>
        <Row>
          <Col>
            <h1 className={textStyles.Xl}>Work Showcase</h1>
          </Col>
        </Row>
        <div className={textStyles.textSmall}>
          <Row>
            <Col>
              <strong>Verb Services: </strong>
              <li>Helped build out new version of our in-house custom CRM (Customer Relationship Manager)</li>
              <li>Re-wrote out in-house text service code in typescript and helped scope out a priority queue setup</li>
              <li>Involved in QA whenever we are prepping for a new release</li>
              <li>Make sure our microservices ecosystem flows properly at all times</li>
              <li>Built out serverless functions within Realm Atlas the we are able to access in our different apps through GraphQL</li>
              <li>Team lead for our automated response integration with Google Dialogflow</li>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Verb Website: </strong>
              <li>Helped build out original architecture for static building</li>
              <li>
                Helped integrate with the CMS (Content Management Services) Contentful
                <ul>Allowed us to build out the site in a more modularized and reusable manner</ul>
              </li>
              <li>Built out the GTM tag integration and website triggers</li>
              <li>Involved in QA whenever we are prepping for a new release</li>
            </Col>
          </Row>
        </div>
      </Container>
      <Row className='verb-iframe-row'>
        <Col>
          <iframe className='verb-iframe' src='https://www.verbenergy.co/'/>
        </Col>
      </Row>
    </div>
  );
}
