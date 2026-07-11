import React from 'react'

const TextareaField = ({
  icon: Icon,
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error = '',
  rows = 3,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-[#3674B5] mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
            <Icon className="h-5 w-5 text-[#3674B5]/40" />
          </div>
        )}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`w-full px-3 py-2.5 ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 border border-[#A1E3F9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5] focus:border-[#3674B5] transition-all duration-200 bg-white/50 resize-y min-h-20 ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default TextareaField