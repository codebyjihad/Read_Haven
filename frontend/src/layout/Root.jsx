import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Root = () => {
  return (
    <>
      <Navbar/>
       <main className='min-h-[calc(100vh-100px)]'>
          <Outlet/>
       </main>
      <Footer/>
    </>
  )
}

export default Root