import React, { useEffect, useRef, useState } from 'react'

const Dropdown = ({trigger, children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div className="" role='menu' aria-orientation='vertical' aria-labelledby='menu-button' tabIndex="-1">
          <div className="" role='none'>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export const DropdownItem = ({children, onClick}) => {
  return (
    <button
    onClick={onclick}
    className=''
    role='menuitem'
    tabIndex='-1'>
      {children}
    </button>
  )
}

export default Dropdown