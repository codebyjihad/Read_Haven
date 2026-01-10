import React, { useEffect } from 'react'
import { useBooks } from '../../context/BookContext'
import BookGrid from './BookGrid'
import CategoryNav from './CategoryNav'
import SortBook from './SortBook'
import Pagination from './Pagination'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseUrl'
import { toast } from 'react-toastify'

const Shop = () => {

    const { books,
        currentBook,
        loading,
        error,
        filters,
        pagination, fetchBooks, updateFilters } = useBooks()

    const categories = ['All Collctions', 'Fiction', 'Adventure', 'Romance', 'Dystopian', 'Histirical', 'Non-Fiction']

    useEffect(() => {
        fetchBooks()
    }, [filters, fetchBooks])

    const handleCatrgoryChange = (category) => {
        updateFilters({
            genre: category === 'All Collctions' ? '' : category,
            page: 1
        })
    }

    const handleSortChange = (sortConfig) => {
        updateFilters({
            sortBy: sortConfig.sortBy,
            order: sortConfig.order,
            page:1
        })
    }

    const handlePageCHange = (newPage) => {
       updateFilters({
        page: newPage
       })
    }

    const handleDeleteBook =  async(id) => {
     try{
          await axios.delete(`${baseUrl}/books/${id}`)
          toast('Book Deleted Successfully !')
          fetchBooks()
     }catch(err){
        console.log(`Internal client  Error !${err}`)
     }
    }


    return (
        <div className='container mx-auto px-4 py-12 min-h-screen'>

            <div className='flex justify-between items-center flex-wrap border-b border-gray-200'>
                <CategoryNav activeCategory={filters.genre || "All Collctions"} categories={categories} onCategoryChange={handleCatrgoryChange} />
                <div className='py-4 justify-end px-4'>
                    <SortBook  currentSort={{
                        sortBy: filters.sortBy,
                        order: filters.order
                    }}  onSortChange={handleSortChange}/>
                </div>
            </div>
            <div>
                Showing {pagination.totalBook > 0 ? (pagination.currentPage - 1) * filters.limit + 1 : 0} - <span>{Math.min(pagination.currentPage * filters.limit, pagination.totalBook)}</span> of {pagination.totalBook}
            </div>
            {/* books card */}
            <div className='py-8 md:px-8 '>
                <BookGrid books={books} loading={loading} error={error} onDeleteBook={handleDeleteBook} />
            </div>
            {/* pagination */}
            {
                pagination.totalPages > 1 && <Pagination totalPages={pagination.totalPages} currentPage={pagination. currentPage} onPageChange={handlePageCHange}/>
            }
        </div>
    )
}

export default Shop