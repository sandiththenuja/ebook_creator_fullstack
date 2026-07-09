import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/ui/Button'
import { Plus } from 'lucide-react'

const DashboardPage = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)
  const {user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS)

      } catch (error) {
        toast.error("Error fetching books")
      }finally{
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const handleDeleteBook = async() => {
    if(!bookToDelete) return

  }

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true)
  }

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false)
    navigate(`/editor/${bookId}`)
  }

  return (
    <DashboardLayout>
      <Button className='' onClick={handleCreateBookClick} icon={Plus}>
        Create Book
      </Button>
    </DashboardLayout>
  )
}

export default DashboardPage