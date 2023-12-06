import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { useState } from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [openNav, setOpenNav] = useState(true);
    const currentUser = useContext(AuthContext);

    return (
        <>
            <nav className="relative flex justify-between items-center w-full h-16 bg-blue-500 px-5 py-3 text-white z-10">
                <Link to="/" className='md:text-2xl text-xl font-semibold'>CriSys</Link>

                <button className="block md:hidden text-2xl" onClick={e => setOpenNav(!openNav)}>
                    {
                        !openNav ? <RiCloseFill className='icon' /> : <RiMenu2Line className='icon' />
                    }
                </button>

                <ul className={`w-full md:w-auto absolute top-16 left-0 ${openNav && 'left-[-100%]'} d-flex flex-col md:flex-row bg-blue-500 border-t border-blue-800 md:border-0 md:static py-5 gap-5 md:gap-6 lg:gap-8 md:py-0 transition-all duration-300 `}>
                    <li><Link className='text-sm md:text-base' to="/">Home</Link></li>
                    <li><Link className='text-sm md:text-base' to="/community">Community</Link></li>
                    <li><Link className='text-sm md:text-base' to="/create-feed">Create Feed</Link></li>
                    <li><Link className='text-sm md:text-base' to="/profile">Profile</Link></li>

                    <li>
                        <div className='d-flex gap-3 mt-2 md:hidden' >
                            <img className="w-10 h-10 rounded-full inline object-cover" src={currentUser?.photoURL} alt="Rounded avatar" />
                            <Link to="/">{currentUser?.displayName}</Link>
                            <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-4 py-1.5" onClick={() => signOut(auth)}>Log out</button>
                        </div>
                    </li>
                </ul>


                <div className='justify-center items-center gap-5 mt-2 md:flex hidden' >
                    <img className="w-10 h-10 rounded-full inline object-cover" src={currentUser?.photoURL} alt="Rounded avatar" />
                    <Link to="/profile" className='md:text-lg' >{currentUser?.displayName}</Link>
                    <button type="button" className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-4 py-1.5" onClick={() => signOut(auth)}>Log out</button>
                </div>

            </nav>
        </>
    )
}

export default Navbar