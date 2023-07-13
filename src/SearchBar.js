import React from 'react'
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className='search-box'>
        <input className='search-input' type='text' placeholder='Search'/>
        <button className='button'><FaSearch/></button>
    </div>
   
  )
}

export default SearchBar