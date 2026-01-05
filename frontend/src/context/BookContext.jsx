import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios'

const BookContext = createContext(null)

export const BookProvider = ({ children }) => {
    const [books, SetBooks] = useState([])
    const [currentBook, SetCurrentBook] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [error, SetError] = useState(null)
    const [filters, setFilers] = useState({
        page: 1,
        limit: 8,
        genre: '',
        minYear: '',
        maxYear: '',
        author: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'title',
        order: 'asc',
        search: ''
    })

    const [pagination, setpagination] = useState({
        totalBook: 0,
        currentPage: 1,
        totalPages: 1
    })

    const fetchBooks = useCallback(async () => {
        try {
            SetLoading(true)
            SetError(null)
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '') {
                    params.append(key, value)
                }
            })

            const response = await axios.get(`http://localhost:3000/books?${params}`)
            SetBooks(response.data.books)
            setpagination({
                currentPage: response.data.currentPage,
                totalBook: response.data.totalBook,
                totalPages: response.data.totalPages
            })
        } catch (err) {
            SetError(err.message)
        } finally {
            SetLoading(false)
        }
    }, [filters])

    const clearCurrentBook = useCallback(() => {
        SetBooks(null)
    }, [])

    const updateFilters = useCallback(async (newFilters) => {
        setFilers(prev => ({
            ...prev,
            ...newFilters,
            page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
        }))
    }, [])

    const fetchBookdeitls = useCallback(async (bookid) => {
        try {
            SetLoading(true)
            SetError(null)

            const reponse = await axios.get(`http://localhost:3000/books${bookid}`)
            SetCurrentBook(reponse.data)

            return reponse.data
        } catch (err) {
            SetError(err.message)
            throw err
        } finally {
            SetLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBooks()
    }, [filters])

    const value = {
        books,
        currentBook,
        loading,
        error,
        filters,
        pagination,
        fetchBooks,
        clearCurrentBook,
        updateFilters,
        fetchBookdeitls

    }
    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    )
}

export const useBooks = () => {
    const context = useContext(BookContext)
    if (!context) {
        throw new Error('USeBooks Must be Withing a book Provider')
    }

    return context
}