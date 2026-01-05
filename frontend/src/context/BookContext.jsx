import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const BookContext = createContext(null)

export const BookProvider = ({children}) => {
    const [books , SetBooks] = useState([])
    const [currentBook , SetCurrentBook] = useState(null)
    const [loading , SetLoading] = useState(false)
    const [error , SetError] = useState(null)
    const [filters , setFilers] = useState({
        page: 1,
        limit:8,
        genre:'',
        minYear:'',
        maxYear:'',
        author:'',
        minPrice:'',
        maxPrice:'',
        sortBy:'title',
        order:'asc',
        search:''
    })
   
    const [pagination , setpagination] = useState({
       totalBook: 11,
       currentPage: 1,
        totalPages: 2
    })
    
    const fetchBooks = async () => {
        try{
          SetLoading(true)
          SetError(null)
          const response = await axios.get('http://localhost:3000/books')
          SetBooks(response.data.books)
        }catch(err){
           console.log('internal client error')
        }
    }

    useEffect(() => {
        fetchBooks()
    } , [])
    
    const  value = {
        books,
        currentBook,
        loading,
        error
    }
    return (
        <BookContext.Provider value={value}>
             {children}
        </BookContext.Provider>
    )
}

export const useBooks = () => {
    const context = useContext(BookContext)
    if(!context){
        throw new Error('USeBooks Must be Withing a book Provider')
    }
    
    return context
}