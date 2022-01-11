import React from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar.js';


const PageLayout = ({ children }) => {

  
  


  return (
    <div>
      <NavBar />
      <div className=" my-4">
        <div className="row">
          <SideBar />
          <div className="col-md-9 my-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout