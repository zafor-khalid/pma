
import React from 'react';
// import { AiFillNotification } from "react-icons/ai";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { useAuth } from '../../contex/AuthContext';
export default function NavBar() {
    const { Logout, currentUserInfo } = useAuth()

    return (
        <>
            <Navbar
                color="primary"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    <h3 className='text-light'>Project Management Application</h3>
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="ms-auto"
                        navbar
                    >
                        {/* <NavItem>
                            <NavLink href="#/">
                                <span className='text-light'>Notification</span>
                            </NavLink>
                        </NavItem> */}
                        {currentUserInfo?.is_superuser && <NavItem>
                            <NavLink href="/create/">
                                {/* <AiFillNotification /> */}
                                <span className='text-light'>Create New Project</span>
                            </NavLink>
                        </NavItem>}
                        <NavItem>
                            <button className='btn btn-light' onClick={Logout}>
                                Logout
                            </button>
                        </NavItem>

                    </Nav>

                </Collapse>
            </Navbar>
        </>

    )
}
