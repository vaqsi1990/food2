import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import { User } from '../User'
import { Link, useLocation } from 'react-router-dom'
import food from '../images/Food-Logo-Graphics-1-70.jpg'
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const {user} =  useContext(User)
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  return (
    <header>
   <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <ul className={`navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8 ${menuOpen ? 'menu-open' : ''}`}>
        <Link to="/">
          <img className='h-[70px]' src={food} alt="" />
        </Link>
        <input type="checkbox" id="check" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
        <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          
          <li>
            <Link to={user ? '/account' : "/login"} className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              {!!user && (
                <div>
                  {user.name}
                </div>
              )}
            </Link>
          </li>
          <label htmlFor="check" className="close-menu">X</label>
        </span>
        <label htmlFor="check" className="open-menu">Menu</label>
      </ul>
    </nav>
  </header>
  )
}
