import React from 'react'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className=' my-4'>
        <div className='row mx-auto'>
          <div className='col-md-3'>
            <SideBar />
          </div>
          <div className='col-md-9'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
