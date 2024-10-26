import React from 'react'
import Loading from "../../assets/Loader.gif";
const Loader = () => {
  return (
    <div className='flex flex-row justify-center items-center h-[100vh]'>
     <img src={Loading} style={{ width: '50px', height: '50px' }}  alt="Description of the gif" />
    </div>
  )
}

export default Loader;