import { LogoutBtn } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'
import '../styles/mediaquery.scss'
import Burger from './Burger'
const header = () => {
  return (
    <div className='header'>
        <div className='todonav'>
            <h2>Todo.</h2>
        </div>
        <article className=''>
            <Link className='media' href={"/"}>Home</Link>
            <Link className='media' href={"/profile"}>Profile</Link>
            <LogoutBtn  />
            <Burger />
        </article>
    </div>
  )
}


export default header