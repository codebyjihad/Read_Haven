import React, { useEffect, useState } from 'react'
import { useBooks} from '../context/BookContext'

const Home = () => {
  const { books,
    currentBook,
    loading,
    error } = useBooks()
    
 
    
  return (
    <>
      <div>
        {
          books.map(data => (
            <p key={data._id}>{data.title}</p>
          ))
        }
      </div>
    </>
  )
}

export default Home