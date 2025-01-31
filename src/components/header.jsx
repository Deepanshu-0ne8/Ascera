import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from './ui/button'
const Header = () => {
  return (
    <div>
      <nav className='py-2 flex justify-between items-center'>
        <Link>
        <img src="/logo.png" className='h-10' />
        </Link>

        <Button variant="outline">Login</Button>
      </nav>
    </div>
  )
}

export default Header