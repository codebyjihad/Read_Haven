import React from 'react'
import { useBooks } from '../../context/BookContext'
import BookGrid from './BookGrid'

const Shop = () => {

    const { books,
        currentBook,
        loading,
        error,
        filters,
        pagination, } = useBooks()

        const handleDeleteBook = () => {
            console.log('Boook deleted')
        }

    return (
        <div className='container mx-auto'>
            <div>
               Showing {pagination.totalBook > 0 ? (pagination.currentPage - 1) * filters.limit  + 1: 0} of 10 books
            </div>
            {/* books card */}
            <div className='py-8 md:px-8 '>
                <BookGrid books={books} loading={loading} error={error} onDeleteBook={handleDeleteBook}/>      
            </div>           
        </div>
    )
}

export default Shop