// bootstrap css files
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="custom-navbar">
    <Container>
      <Navbar.Brand href="/">Menu</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/favourites">Favourites</Nav.Link>
          <Nav.Link href="/browse">Browse by Spirit Type</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

