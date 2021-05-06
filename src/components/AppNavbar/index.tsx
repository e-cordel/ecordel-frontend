
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import styles from './styles.module.scss'



export default function AppNavbar(props) {

  const [scrooled, setScrooled] = useState(false)

  const router = useRouter();

  useEffect(() => {
    window.onscroll = () => handleScroll();
  }, []);

  const Logo = useMemo(() => (
    <img
      src="/logo/ecordel-white.png"
      alt="e-cordel"
      className={styles[scrooled ? 'logo_small' : 'logo_big']} />
  ), [scrooled]);

  function handleScroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setScrooled(true);
    } else {
      setScrooled(false);
    }
  }

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="xl"
      bg="dark"
      variant="dark"
      fixed="top"
      {...props}
    >
      <Container>
        <Navbar.Brand href="#home">
          {Logo}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => router.push('/')}> Home </Nav.Link >
          </Nav>
          <Button variant="outline-primary"  >login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
