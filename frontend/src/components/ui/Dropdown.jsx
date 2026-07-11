import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Dropdown = ({ trigger, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="cursor-pointer flex items-center gap-1 text-[#3674B5] hover:text-[#578FCA] transition-colors"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl shadow-[#3674B5]/10 border border-[#A1E3F9]/30 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50"
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby="menu-button" 
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export const DropdownItem = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm text-[#3674B5] hover:bg-[#D1F8EF] transition-colors duration-150 flex items-center gap-2 ${className}`}
      role="menuitem"
      tabIndex="-1"
    >
      {children}
    </button>
  )
}

export default Dropdown