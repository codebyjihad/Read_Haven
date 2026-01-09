import React from 'react'
import Hero from '../components/Home/Hero'
import { useBooks } from '../context/BookContext'
import Shop from './shop/Shop'

const Home = () => {
  
  return (
    <div>
      <Hero />
      <Shop/>
    </div>
  )
}

export default Home