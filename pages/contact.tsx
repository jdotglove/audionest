import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import MainNavbar from '../src/components/Navbars/MainNavbar';

export default function Contact() {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row>
          <Col>
            <main>
              <h1>Contact Information</h1>
            </main>
          </Col>
        </Row>
        <Row>
          <Col style={{ fontSize: 'x-large' }}>
            <div>
              <strong>Email: </strong>
              <a href="mailto:glover.jarod@gmail.com">glover.jarod@gmail.com</a>
            </div>
            <div>
              <strong>Phone Number: </strong>
              <a href="tel:+13368235386">(336) 823-5386</a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/jarod-glover-47b944129/">LinkedIn</a>
            </div>
          </Col>
        </Row>
        <em>Contact Submission Form Coming Soon!</em>
      </Container>
    </div>
  );
}
