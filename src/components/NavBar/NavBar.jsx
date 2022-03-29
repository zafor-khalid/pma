import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contex/AuthContext'

export default function NavBar() {
  const { Logout, currentUserInfo } = useAuth()

  return (
    <>
      <Navbar bg='primary' expand='md' className='px-4 py-3'>
        <Navbar.Brand href='#home'>
          {' '}
          <Link to='/dashboard/1'>
            <h3 className='text-light'>Project Management Application</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className=' justify-content-end '
        >
          <Nav className='align-items-center'>
            <Nav.Link>
              <Link to='/dashboard/1'>
                <span className='text-light fw-bold'>Tasks</span>
              </Link>
            </Nav.Link>
            {currentUserInfo?.is_superuser && (
              <Nav.Link>
                <Link to='/create/'>
                  <span className='text-light fw-bold'>Create New Project</span>
                </Link>
              </Nav.Link>
            )}
            <Nav.Link>
              <button
                className='btn btn-outline-light fw-bold'
                style={{ borderRadius: '5rem' }}
                onClick={Logout}
              >
                Logout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <Navbar color='primary' expand='md' light>
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
      </Navbar> */}
    </>
  )
}
