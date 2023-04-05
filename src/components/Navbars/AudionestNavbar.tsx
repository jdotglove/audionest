import { Container, Nav, Navbar } from 'react-bootstrap';

export default function AudionestNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Audionest</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/integration-hub">Integration Hub</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/about-me">About Me</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
