import React from 'react';
import { Link } from 'react-router-dom';
import { RiTaskFill } from "react-icons/ri";


function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 gap-4">
       <div className='bg-blue-600 p-1 rounded'>
        <RiTaskFill className='size-8'/>
        </div> 
        <span className="font-semibold text-xl tracking-tight">Home Work</span>
      </div>
      <Link to="/" className='text-blue-600'>Inicio</Link>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
