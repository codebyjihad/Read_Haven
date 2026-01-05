import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useBooks } from '../../context/BookContext';


const Hero = () => {
    const [searchinput , setSearchInput] = useState('')
    const {books , filters,  updateFilters} = useBooks()
    const handleSumbit = (e) => {
      e.preventDefault()
      updateFilters({
        search:searchinput.trim(),
        page:1
      })
    }

    console.log(books)

  return (
    <div className='bg-gray-900 min-h-[600px] relative overflow-hidden'>
        <div className='container mx-auto px-4 py-36 flex flex-col-reverse md:flex-row items-center justify-between gap-7'>
           <div className='w-full lg:w-1/2 text-white z-10 text-center md:text-start'>
               <h1 className='text-2xl md:text-4xl font-bold'>Welcome to Our Books - <br></br> ReadHaven for book Lovers</h1>
               <form onSubmit={handleSumbit} className='mt-8 max-w-md flex mx-auto md:mx-0'>
                <div className=' relative'>
                    <input
                     value={searchinput}
                     onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='Enter title' className='bg-white px-4 py-2 w-full   border text-black  rounded-l-md'/>
                     <CiSearch className=' absolute z-10 left-1 top-3 text-black font-bold'/>
                </div>
                <button type='submit' className='bg-amber-300 py-2 px-6 text-black rounded-r-md cursor-pointer'>Search</button>
               </form>
           </div>
    
           <div className='w-full lg:w-1/2 '>
                <img src="/hero.jpg" alt="" className='w-full md:w-[700px] md:h-[500px] h-full object-cover rounded-2xl'/>
           </div>
        </div>
    </div>
  )
}

export default Hero