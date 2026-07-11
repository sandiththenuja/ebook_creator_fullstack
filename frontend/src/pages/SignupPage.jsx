import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, BookOpen, User, Sparkles, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData)
      const { token } = response.data

      const profileResponse = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
        headers: { Authorization: `Bearer ${token}` }
      })

      login(profileResponse.data, token)
      toast.success("Account created successfully")
      navigate('/dashboard')

    } catch (error) {
      toast.error(error.response?.data?.message || "Try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#D1F8EF] via-white to-[#A1E3F9]/20 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A1E3F9] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3674B5] rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#D1F8EF] rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl shadow-[#3674B5]/10 border border-[#A1E3F9]/30 p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-[#3674B5] to-[#578FCA] rounded-2xl flex items-center justify-center shadow-lg shadow-[#3674B5]/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#3674B5]">Create Account</h2>
          <p className="mt-2 text-sm text-[#3674B5]/60">Start creating AI-powered eBooks today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            required
            className="focus:ring-[#3674B5] focus:border-[#3674B5]"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="abc@mail.com"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            required
            className="focus:ring-[#3674B5] focus:border-[#3674B5]"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            required
            className="focus:ring-[#3674B5] focus:border-[#3674B5]"
          />

          <div className="flex items-center">
            <input type="checkbox" className="rounded border-[#A1E3F9] text-[#3674B5] focus:ring-[#3674B5]" />
            <span className="ml-2 text-sm text-[#3674B5]/60">
              I agree to the <a href="#" className="text-[#3674B5] hover:underline">Terms</a> and <a href="#" className="text-[#3674B5] hover:underline">Privacy Policy</a>
            </span>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-linear-to-r from-[#3674B5] to-[#578FCA] hover:from-[#578FCA] hover:to-[#3674B5] text-white font-semibold py-3 rounded-xl shadow-lg shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40 transition-all duration-300 hover:scale-[1.02]"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#A1E3F9]/50"></div>
          <span className="text-xs text-[#3674B5]/40">OR</span>
          <div className="flex-1 h-px bg-[#A1E3F9]/50"></div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#3674B5]/60">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#3674B5] hover:text-[#578FCA] transition-colors hover:underline inline-flex items-center gap-1">
              Sign in
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage