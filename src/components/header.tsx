import React from 'react'
import { FaGear } from "react-icons/fa6";
import { IoHome, IoLogoGithub } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Header() {
   return (
      <div className="header">
         <Link to="/" className="header-link">
            {' '}
            <IoHome size={24} />{' '}
         </Link>
         <Link to="/Config" className="header-link">
            {' '}
            <FaGear size={22} />{' '}
         </Link>
         <Link
            to="https://github.com/diegoandersonn"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
         >
            {' '}
            <IoLogoGithub size={24} />{' '}
         </Link>
      </div>
   )
}
