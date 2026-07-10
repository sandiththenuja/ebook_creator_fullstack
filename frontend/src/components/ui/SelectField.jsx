import React from 'react'

const SelectField = ({icon: Icon, label, name, options, ...props}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {Icon && (
        <Icon />
      )}

      <select 
      name={name} 
      id={name}
      {...props}
      className=''>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField