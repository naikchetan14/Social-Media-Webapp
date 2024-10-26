import React from 'react'

const Button = ({ text,myFunc}) => {

  return (
    <button type="button" className='bg-black p-4 text-white m-4' onClick={myFunc}>{text}</button>
  )
}

export default Button