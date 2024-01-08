import React from 'react'
import {Outlet} from "react-router-dom"
import HomeNavbar from './components/HomeNavbar'
function AppLayout() {
  const userIsLogged=true;
  return (
    <div>
  
   <HomeNavbar />
  
      <Outlet />
    </div>
  )
}

export default AppLayout
