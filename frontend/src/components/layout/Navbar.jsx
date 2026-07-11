import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProfileDropdown from './ProfileDropdown'
import { Menu, X, BookOpen, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [profileImageDropdown, setProfileImageDropdown] = useState(false)

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" }
  ]

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileImageDropdown) {
        setProfileImageDropdown(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [profileImageDropdown])

  return (
    <header className="bg-white border-b border-[#A1E3F9]/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className='flex items-center space-x-2.5 group'>
            <div className="w-9 h-9 bg-linear-to-br from-[#3674B5] to-[#578FCA] rounded-xl flex items-center justify-center shadow-lg shadow-[#3674B5]/30 group-hover:shadow-[#3674B5]/50 transition-all duration-300 group-hover:scale-105">
              <BookOpen className='w-5 h-5 text-white' />
            </div>
            <span className="text-xl font-semibold text-[#3674B5] tracking-tight">
              AI eBook Creator
            </span>
          </a>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className='px-4 py-2 text-sm font-medium text-[#3674B5]/70 hover:text-[#3674B5] rounded-lg hover:bg-[#D1F8EF] transition-all duration-200'
              >
                {link.name}
              </a>
            ))}
          </nav>

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
                onLogout={() => logout()}
              />
            ) : (
              <>
                <a href="/login" className='px-4 py-2 text-sm font-medium text-[#3674B5] hover:text-[#578FCA] rounded-lg hover:bg-[#D1F8EF] transition-all duration-200'>Login</a>
                <a href="/signup" className='px-4 py-2 text-sm font-medium text-white bg-[#3674B5] hover:bg-[#578FCA] rounded-lg shadow-md shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40 transition-all duration-200 hover:scale-105'>Get Started</a>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden p-2 rounded-lg text-[#3674B5] hover:bg-[#D1F8EF] transition-colors'>
            {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-[#A1E3F9]/30 animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className='block px-4 py-2.5 rounded-lg text-sm font-medium text-[#3674B5]/70 hover:text-[#3674B5] hover:bg-[#D1F8EF] transition-all duration-200'
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-[#A1E3F9]/30">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#3674B5] to-[#578FCA] flex items-center justify-center text-white font-semibold shadow-md">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-[#3674B5]">{user?.name}</div>
                    <div className="text-sm text-[#3674B5]/60">{user?.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => logout()} 
                  className='p-2 text-[#3674B5]/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200'
                >
                  <LogOut className='h-5 w-5' />
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <a href="/login" className='px-4 py-2.5 text-sm font-medium text-[#3674B5] hover:text-[#578FCA] rounded-lg hover:bg-[#D1F8EF] transition-all duration-200 text-center'>Login</a>
                <a href="/signup" className='px-4 py-2.5 text-sm font-medium text-white bg-[#3674B5] hover:bg-[#578FCA] rounded-lg shadow-md shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40 transition-all duration-200 text-center'>Get Started</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar