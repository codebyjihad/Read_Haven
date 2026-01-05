import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Root = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Root
