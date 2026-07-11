import React, { useRef, useEffect } from 'react'
import { LogOut, User, Settings, BookOpen, ChevronDown, Sparkles } from 'lucide-react'

const ProfileDropdown = ({ isOpen, onToggle, avatar, companyName, email, userRole, onLogout }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle(event)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#D1F8EF] transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#3674B5] to-[#578FCA] flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-[#3674B5]/20 group-hover:shadow-[#3674B5]/40 transition-shadow duration-200">
          {avatar ? (
            <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            companyName?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-[#3674B5] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#A1E3F9]/30 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-4 py-3 border-b border-[#A1E3F9]/30 bg-linear-to-r from-[#D1F8EF]/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#3674B5] to-[#578FCA] flex items-center justify-center text-white font-semibold text-sm shadow-md shrink-0">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  companyName?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#3674B5] truncate">{companyName}</p>
                <p className="text-sm text-[#3674B5]/60 truncate">{email}</p>
              </div>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#3674B5]/10 rounded-full text-xs font-medium text-[#3674B5]">
              <Sparkles className="w-3 h-3" />
              {userRole || 'Member'}
            </div>
          </div>

          <div className="py-1">
            <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3674B5] hover:bg-[#D1F8EF] transition-colors duration-150">
              <User className="w-4 h-4" />
              Profile
            </a>
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3674B5] hover:bg-[#D1F8EF] transition-colors duration-150">
              <BookOpen className="w-4 h-4" />
              My Books
            </a>
            <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3674B5] hover:bg-[#D1F8EF] transition-colors duration-150">
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </div>

          <div className="border-t border-[#A1E3F9]/30 py-1">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown