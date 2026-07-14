import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import { BookOpen, Menu, X, Home, Book, PlusCircle, User } from 'lucide-react'

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [profileDropdownOpen])

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Create Book', path: '/dashboard?create=true', icon: PlusCircle },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#D1F8EF]/20 via-white to-[#A1E3F9]/20">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#A1E3F9]/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link to="/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 bg-linear-to-br from-[#3674B5] to-[#578FCA] rounded-xl flex items-center justify-center shadow-lg shadow-[#3674B5]/30 group-hover:shadow-[#3674B5]/50 transition-all duration-300 group-hover:scale-105">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-[#3674B5] tracking-tight">
                  AI eBook Creator
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      isActive(link.path)
                        ? 'text-[#3674B5] bg-[#D1F8EF] shadow-sm'
                        : 'text-[#3674B5]/70 hover:text-[#3674B5] hover:bg-[#D1F8EF]/50'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                ))}
              </div>

              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation()
                  setProfileDropdownOpen(!profileDropdownOpen)
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || "Member"}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-[#A1E3F9]/30 animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#3674B5] bg-[#D1F8EF]'
                    : 'text-[#3674B5]/70 hover:text-[#3674B5] hover:bg-[#D1F8EF]/50'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <footer className="mt-auto border-t border-[#A1E3F9]/20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-[#3674B5]/40 text-center">
            © {new Date().getFullYear()} AI eBook Creator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default DashboardLayout