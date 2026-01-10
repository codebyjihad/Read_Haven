import React from 'react'
import { FaChevronLeft , FaChevronRight} from "react-icons/fa";

const Pagination = ({totalPages , currentPage , onPageChange}) => {

    const getPageNumbers = () => {
        const pages = []
        
        if(totalPages <= 7){
            for(let i = 1 ; i <= totalPages ; i++){
                pages.push(i)
            }
        }

        return pages
    }

  return (
    <div className='flex items-center justify-center space-x-2'>
         <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className='px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed' ><FaChevronLeft className='w-4 h-4'/> </button>
          {
            getPageNumbers().map((pages , index) => (
                <button key={index} onClick={() => onPageChange(pages)} className={`px-3 cursor-pointer py-2 rounded-lg border ${currentPage === pages ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>{pages}</button>
            ))
          }
         <button onClick={() => onPageChange(currentPage  + 1)}  disabled={currentPage === totalPages}  className='px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed' ><FaChevronRight className='w-4 h-4'/> </button>
    </div>
  )
}

export default Pagination