import React from 'react'

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#3674B5] to-[#578FCA] hover:from-[#578FCA] hover:to-[#3674B5] text-white shadow-lg shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40',
    secondary: 'bg-[#D1F8EF] hover:bg-[#A1E3F9] text-[#3674B5] hover:text-[#3674B5]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/25 hover:shadow-red-500/40',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-500/25 hover:shadow-green-500/40',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md shadow-yellow-500/25 hover:shadow-yellow-500/40',
    outline: 'border-2 border-[#3674B5] text-[#3674B5] hover:bg-[#D1F8EF] transition-all duration-200',
    ghost: 'text-[#3674B5] hover:bg-[#D1F8EF] transition-all duration-200',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3674B5]'

  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {children}
        </span>
      )}
    </button>
  )
}

export default Button