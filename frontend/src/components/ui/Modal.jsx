import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {
  return (
    <div>
      <div className="" onClick={onClose}>x</div>

      <h3>{title}</h3>
      <button onClick={onClose()}>x</button>

      <div>{children}</div>
    </div>
  )
}

export default Modal