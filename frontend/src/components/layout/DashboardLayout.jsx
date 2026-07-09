import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'

const DashboardLayout = ({children}) => {
  const {user, logout} = useAuth()

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = () => {
      if(profileDropdownOpen){
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  })

  return (
    <div>
      <Link to="/dashboard">
        AI eBook Creator
      </Link>

      <ProfileDropdown
        isOpen={profileDropdownOpen}
        onToggle={(e) => {
          e.stopPropagation()
          setProfileDropdownOpen(!profileDropdownOpen)
        }}
        avatar={user?.avatar || ""}
        companyName={user?.name || ""}
        email={user?.email || ""}
        onLogout={logout}
      />

      <main>{children}</main>
    </div>
  )
}

export default DashboardLayout