import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'

const Root = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </div>

      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default Root
