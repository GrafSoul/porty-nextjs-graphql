// Core
import { useState, useEffect } from 'react';
//Apollo
import withApollo from '@/hoc/withApollo';
import { useLazyGetUser } from '@/apollo/actions/useLazyGetUser';
// React Bootstrap
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// Preloader
import Router from 'next/router';
import NProgress from 'nprogress';
// Component
import AppLink from '../helpers/AppLink';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [hasResponse, setHasResponse] = useState(false);
    const [getUser, { data, error }] = useLazyGetUser();

    useEffect(() => {
        getUser();
    }, []);

    if (data) {
        if (data.user && !user) {
            setUser(data.user);
        }
        if (!data.user && user) {
            setUser(null);
        }
        if (!hasResponse) {
            setHasResponse(true);
        }
    }
    
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
                    {hasResponse && (
                        <Nav>
                            {user && (
                                <>
                                    <span className="nav-link mr-2">
                                        Welcome {user.username}
                                    </span>
                                    <span className="nav-link mr-2">
                                        <img
                                            className="avatar"
                                            src={user.avatar}
                                            alt={user.info}
                                        />
                                    </span>

                                    {(user.role === 'admin' ||
                                        user.role === 'instructor') && (
                                        <>
                                            <NavDropdown
                                                className="mr-2"
                                                title="Manage"
                                                id="basic-nav-dropdown"
                                            >
                                                <AppLink
                                                    href="/portfolio/new"
                                                    className="dropdown-item"
                                                >
                                                    Create Portfolio
                                                </AppLink>
                                                <AppLink
                                                    href="/instructor/[id]/dashboard"
                                                    as={`/instructor/${user._id}/dashboard`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </AppLink>
                                            </NavDropdown>
                                        </>
                                    )}

                                    <AppLink
                                        href="/logout"
                                        className="nav-link btn btn-danger"
                                    >
                                        Sign Out
                                    </AppLink>
                                </>
                            )}
                            {(error || !user) && (
                                <>
                                    <AppLink
                                        href="/login"
                                        className="mr-3 nav-link"
                                    >
                                        Sign In
                                    </AppLink>
                                    <AppLink
                                        href="/register"
                                        className="mr-3 btn btn-success bg-green-2 bright"
                                    >
                                        Sign Up
                                    </AppLink>
                                </>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withApollo(NavBar);
