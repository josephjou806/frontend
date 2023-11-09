import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
                <Link to={"/movies"}>Movies</Link>  
            </Nav.Link>
            <Nav.Link>
                { user?(<span>Logout User</span>):(<Link to = {"/login"}>Log In</Link>
                )}
                </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbar;