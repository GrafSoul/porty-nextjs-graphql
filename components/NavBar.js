// React Bootstrap
import { Navbar, Nav } from 'react-bootstrap';
// Preloader
import Router from 'next/router';
import NProgress from 'nprogress';
// Component
import AppLink from './AppLink';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const NavBar = () => {
    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark fj-mw9">
                <AppLink
                    href="/"
                    className="navbar-brand mr-3 font-weight-bold"
                >
                    VisitCard
                </AppLink>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <AppLink href="/portfolio" className="mr-3 nav-link">
                            Portfolio
                        </AppLink>
                        <AppLink
                            href="/forum/categories"
                            className="mr-3 nav-link"
                        >
                            Forum
                        </AppLink>
                        <AppLink href="/cv" className="mr-3 nav-link">
                            Cv
                        </AppLink>
                    </Nav>
                    <Nav>
                        <AppLink href="/login" className="mr-3 nav-link">
                            Sign Up
                        </AppLink>
                        <AppLink
                            href="/register"
                            className="mr-3 btn btn-success bg-green-2 bright"
                        >
                            Sign In
                        </AppLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
