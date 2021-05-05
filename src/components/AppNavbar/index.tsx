
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import styles from './styles.module.scss'
export default function AppNavbar(props) {

  const router = useRouter();

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="xl"
      bg="dark"
      variant="dark"
      fixed="top"
      id="js_header"
      {...props}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src="/logo/ecordel-white.png" alt="e-cordel" width="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => router.push('/')}> Home </Nav.Link >
          </Nav>
          <Button variant="outline-primary">login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
