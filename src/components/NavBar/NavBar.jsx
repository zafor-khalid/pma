import React from 'react'
import { Link } from 'react-router-dom'
// import { AiFillNotification } from "react-icons/ai";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap'
import { useAuth } from '../../contex/AuthContext'

export default function NavBar() {
  const { Logout, currentUserInfo } = useAuth()

  return (
    <>
      <Navbar color='primary' expand='md' light>
        <NavbarBrand>
          <Link to='/dashboard/1'>
            <h3 className='text-light'>Project Management Application</h3>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className='ms-auto' navbar>
            <NavLink>
              <Link to='/dashboard/1'>
                <span className='text-light'>Tasks</span>
              </Link>{' '}
            </NavLink>
            {currentUserInfo?.is_superuser && (
              <NavItem>
                <NavLink>
                  <Link to='/create/'>
                    <span className='text-light'>Create New Project</span>
                  </Link>{' '}
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <button
                className='btn btn-outline-light'
                style={{ borderRadius: '5rem' }}
                onClick={Logout}
              >
                Logout
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}
