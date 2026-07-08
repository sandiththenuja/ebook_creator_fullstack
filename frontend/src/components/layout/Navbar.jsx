import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProfileDropdown from './ProfileDropdown'
import { Menu, X, BookOpen, LogOut } from 'lucide-react'

const Navbar = () => {
  const {user, logout, isAuthenticated} = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [profileImageDropdown, setProfileImageDropdown] = useState(false)

  const navLinks = [
    {name: "Features", hreef: "#features"},
    {name: "Testimonials", href: "#testimonials"}
  ]

  useEffect(() => {
    const handleClickOutside = () => {
      if(ProfileDropdown){
        setProfileImageDropdown(false)
      }
    }
  })

  return (
    <div>Navbar</div>
  )
}

export default Navbar