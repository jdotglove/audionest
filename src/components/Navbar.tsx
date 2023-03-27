import { Container, Nav, Navbar } from "react-bootstrap";

export default function CoffeeAppNavbar() {
  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand href="/">CoffeeApp</Navbar.Brand>
          <Nav className="align-items-center">
            <Navbar.Text>
              Welcome!
            </Navbar.Text>
          </Nav>
      </Container>
    </Navbar>
  );
}
