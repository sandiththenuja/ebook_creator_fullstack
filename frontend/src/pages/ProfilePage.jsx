import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import DashboardLayout from '../components/layout/DashboardLayout'
import InputField from '../components/ui/InputField'
import { Mail, User, Sparkles, Save } from 'lucide-react'
import Button from '../components/ui/Button'

const ProfilePage = () => {
  const { user, updateUser, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: formData.name
      })
      updateUser(response.data)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <DashboardLayout activeMenu="profile">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3674B5]"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout activeMenu="profile">
      <div className="p-4 md:p-6 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#3674B5] to-[#578FCA] rounded-xl flex items-center justify-center shadow-lg shadow-[#3674B5]/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3674B5]">Profile</h1>
              <p className="text-sm text-[#3674B5]/60">Manage your account details</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-[#3674B5]/5 border border-[#A1E3F9]/30 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              value={formData.email}
              disabled
              readOnly
              className="opacity-70"
            />

            <div className="flex justify-end pt-4 border-t border-[#A1E3F9]/30">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                icon={Save}
                className="min-w-35"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 p-4 bg-[#D1F8EF]/30 rounded-xl border border-[#A1E3F9]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3674B5]/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#3674B5]" />
            </div>
            <div>
              <p className="text-sm text-[#3674B5] font-medium">Account Type</p>
              <p className="text-xs text-[#3674B5]/60 capitalize">{user?.role || 'Member'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage