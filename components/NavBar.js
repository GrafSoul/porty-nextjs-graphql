import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark fj-mw9">
                <Navbar.Brand className="mr-3 font-weight-bold" href="#">
                    Porty
                </Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link className="mr-3" href="#">
                            Portfolio
                        </Nav.Link>
                        <Nav.Link className="mr-3" href="#">
                            Forum
                        </Nav.Link>
                        <Nav.Link className="mr-3" href="#">
                            Cv
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="mr-3" href="#">
                            Sign Up
                        </Nav.Link>
                        <Nav.Link
                            className="mr-3 btn btn-success bg-green-2 bright"
                            href="#"
                        >
                            Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
