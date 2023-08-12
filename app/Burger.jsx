'use client'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/mediaquery.scss'
const burger = () => {

  const handleClick = () =>{
    document.getElementsByClassName("header")[0].classList.toggle("active");
  }
  return (
    <div className='burger' onClick={handleClick}>
    <MenuIcon onCli style={{"color":"white"}} />
    </div>
  )
}

export default burger