import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Mail, Lock, BookOpen} from 'lucide-react'
import toast from 'react-hot-toast'

import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'

const SignupPage = () => {
  const [formData, setFormData] = useState({name: "", email: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData)
      const {token} = response.data

      const profileResponse = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
        headers: {Authorization: `Bearer ${token}`}
      })

      login(profileResponse.data, token)
      toast.success("Account created successfully")
      navigate('/dashboard')
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Try again")
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className=''>
        <InputField
            label="Name"
            name="name"
            type="name"
            placeholder="abc"
            // icon="email"
            value={formData.name}
            onChange={handleChange}
            required
          />
        <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="abc@mail.com"
            // icon="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="password"
            // icon={}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" isLoading={isLoading} className=''>
            Create Account
          </Button>
      </form>

      <p>
              Already have an account <Link to="/login">Sign In</Link>
            </p>
    </div>
  )
}

export default SignupPage