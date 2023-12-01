import React from 'react'
import { Link } from 'react-router-dom'

const LogOutNav = () => {
    return (
        <>
            <nav className="relative flex justify-between items-center w-full h-16 bg-transparent px-5 py-3 text-white z-10">
                <Link to="/" className='md:text-2xl text-xl text-blue-600 font-semibold'>Hack X</Link>


                <div className='flex items-center gap-5 md:gap-7'>
                    <Link to='/login' className='text-white text-base bg-green-500 rounded cursor-pointer py-0.5 px-2 md:py-1 md:px-3.5' >Sign in</Link>
                    <Link to='/signup' className='text-white text-base bg-blue-500 rounded cursor-pointer py-0.5 px-2 md:py-1 md:px-3.5' >Sign up</Link>
                </div>


            </nav>
        </>
    )
}

export default LogOutNav