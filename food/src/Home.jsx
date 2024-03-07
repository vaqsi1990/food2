import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Parts/Header'
import Footer from './Pages/Footer'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
