import React from 'react'

import "./Spinner.css";


const Spinner = () => {
  return (
    <div className='flex justify-center items-center w-[100%] h-screen text-indigo-600'>
      <div className='custom-loader'></div>
    </div>
  )
};

export default Spinner;