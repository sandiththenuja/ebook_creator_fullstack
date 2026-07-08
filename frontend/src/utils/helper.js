export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email) return "Email required"
    if(!emailRegex.test(email)) return "Enter valid email"
}

export const validatePassword = (password) => {
    if(!password) return "Password required"
    if(password.length < 6) return "Password must be at least 6 characters"
    return ""
}