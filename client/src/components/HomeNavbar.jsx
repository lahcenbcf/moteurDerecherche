import React from 'react'
import docLibLogo from "../assets/docLibLogo.svg"
import { Link } from 'react-router-dom'
function HomeNavbar() {
  const userInfo=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  return (
    <header className='bg-white px-3'>
    <navbar className="container mx-auto flex justify-between items-center">
      {/* logo */}
      <Link to={"/home"} className='w-[12rem] mt-3'>
      <img src={docLibLogo} className='w-[100%]' alt='docLibLogo' />
      </Link>

      <div className=' flex gap-8 lg:gap-20 items-center '>
      {/* a propos */}
      <Link to={"/about"} className='font-semibold text-black'>A PROPOS</Link>
          {/* About */}

      {userInfo ? <Link to={"/profile"} className='font-semibold text-black'>Profile</Link>
      :
      <Link to={"/login"}>
          <button className='loginBtn'>Login/Sign Up</button>
      </Link>
  }
      </div>

      
      </navbar>
    </header>
  )
}

export default HomeNavbar
