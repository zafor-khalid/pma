
import React from 'react';
import { AiFillNotification } from "react-icons/ai";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { useAuth } from '../../contex/AuthContext';
export default function NavBar() {
    const { Logout } = useAuth()
    return (
        <>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    PMA
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="ms-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/components/">
                                <AiFillNotification />
                                Notification
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <button onClick={Logout}>
                                Logout
                            </button>
                        </NavItem>

                    </Nav>

                </Collapse>
            </Navbar>
        </>

    )
}
