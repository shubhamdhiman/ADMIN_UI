// import React from 'react'

// function SearchBar({dummyData}) {
//   return (
//     <div className='mt-12'>
//         <input className='w-full p-2 mx-auto border-2 border-gray-300' type='text' id='search' placeholder='Search by name, email or role'/>
//     </div>
//   )
// }

// export default SearchBar

import React, { useState } from 'react';

function SearchBar({ data, dummyData, setDummyData }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter data based on the search input
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.email.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.role.toLowerCase().includes(inputValue.toLowerCase())
    );

    // If the search input is empty, reset to the original data
    if (inputValue === '') {
      setDummyData(data);
    } else {
      // Otherwise, update with the filtered data
      setDummyData(filteredData);
    }
  };

  return (
    <div className='mt-12'>
      <input
        className='w-full p-2 mx-auto border-2 border-gray-300'
        type='text'
        id='search'
        placeholder='Search by name, email, or role'
        value={searchInput}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;