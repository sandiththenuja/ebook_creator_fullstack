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

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [profileImageDropdown])

  return (
    <header>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <a href="/" className='flex items-center space-x-2.5 group'>
            <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-100">
              <BookOpen className='w-5 h-5 text-white' />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              AI eBook Creator
            </span>
          </a>

          {/* desktop navigaton */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-200'>
                {link.name}
              </a>
            ))}
          </nav>

          {/* auth buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <ProfileDropdown
              isOpen={profileImageDropdown}
              onToggle={(e) => {
                e.stopPropagation()
                setProfileImageDropdown(!profileImageDropdown)
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              userRole={user?.role || ""}
              onLogout={() => console.log("Logout")} />
            ) : (
              <>
                <a href="/login" className='px-4 py-2 text-sm font-medium text-gray-600 rounded-lg'>Login</a>
                <a href="/signup" className='px-4 py-2 text-sm font-medium text-gray-600 rounded-lg'>Get Started</a>
              </>
            )} 
          </div>

          {/* mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden p-2 rounded-lg text-gray-600'>
            {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className='block px-4 py-2.5 rounded-lg text-sm font-medium'>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="px-4 py-4 border-t">
            {isAuthenticated ? (
              <div className="">
                <div className="">
                  <div className="">
                    <span className="">
                      {user?.name?.charAt(0).toUpperCase()}
                     </span>
                  </div>
                </div>
                <div className="
                ">
                  {user?.name}
                </div>
                <div className="">{user?.email}</div>
                
                <button onClick={() => logout()} className=''>
                  <LogOut className='' />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="">
                <a href="/login" className='px-4 py-2 text-sm font-medium text-gray-600 rounded-lg'>Login</a>
                <a href="/signup" className='px-4 py-2 text-sm font-medium text-gray-600 rounded-lg'>Get Started</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar