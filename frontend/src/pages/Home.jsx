import React from 'react'
import Hero from '../components/Home/Hero'
import { useBooks } from '../context/BookContext'

const Home = () => {
  const { books,
    currentBook,
    loading,
    error,
    filters, } = useBooks()
  return (
    <div>
      <Hero />
      <div>
        {books.length ? <>books found !</>

          : "No books Found !"}
      </div>
    </div>
  )
}

export default Home