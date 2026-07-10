import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/ui/Button'
import { Book, Plus } from 'lucide-react'
import BookCard from '../components/cards/BookCard'
import CreateBookModal from '../components/modals/CreateBookModal'

// skeleton loader for book card
const BookCardSkeleton = () => {
  return (
  <div className="animate-pulse bg-white border border-slate-200 rounded-lg shadow-sm">
    <div className="w-full aspect-16/25 bg-slate-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  </div>
)}

const ConfirmationModal = ({isOpen, onClose, onConfirm, title, message}) => {
  return (
    <div>
      <div className="" onClick={onClose}></div>

      <h3>{title}</h3>
      <p>{message}</p>

      <Button variant='secondary' onClick={onClose}>Cancel</Button>
      <Button variant='secondary' onClick={onConfirm}>Confirm</Button>
    </div>
  )
}

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
        setBooks(response.data)
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
    try {
      await axiosInstance.delete(`${API_PATHS.BOOKS.DELETE_BOOK}/${bookToDelete}`)
      setBooks(books.filter((book) => book._id !== bookToDelete))
      toast.success("Book deleted")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting book")
    }finally{
      setBookToDelete(null)
    }
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

      {isLoading ? (
        <div className="">
          {Array.from({length: 4}).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div>
          <Book />
          <h3>No books found</h3>
          <Button onClick={handleCreateBookClick} icon={Plus} >
            Create a book
          </Button>
        </div>
      ) : (
        <div className="">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={() => setBookToDelete(book._id)} />
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleDeleteBook}
        title="Delete Book"
        message="Confirm book delete" />

        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated} />
    </DashboardLayout>
  )
}

export default DashboardPage