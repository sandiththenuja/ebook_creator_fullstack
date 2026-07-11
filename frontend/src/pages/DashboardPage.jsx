import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/ui/Button'
import { Book, Plus, Sparkles, BookOpen, Trash2, AlertCircle } from 'lucide-react'
import BookCard from '../components/cards/BookCard'
import CreateBookModal from '../components/modals/CreateBookModal'

const BookCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-[#A1E3F9]/30 rounded-2xl shadow-sm overflow-hidden">
      <div className="w-full aspect-16/25 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9]/50 rounded-t-2xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-[#D1F8EF] rounded-lg w-3/4"></div>
        <div className="h-4 bg-[#D1F8EF] rounded-lg w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-[#D1F8EF] rounded-lg w-1/3"></div>
          <div className="h-8 bg-[#D1F8EF] rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3674B5]/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl shadow-[#3674B5]/20 border border-[#A1E3F9]/30 p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-[#3674B5]">{title}</h3>
        </div>
        <p className="text-[#3674B5]/70 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-4 py-2 text-[#3674B5] hover:bg-[#D1F8EF] rounded-lg transition-colors"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md shadow-red-500/25 transition-all duration-200 hover:scale-105"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS)
        setBooks(response.data)
      } catch (error) {
        toast.error("Error fetching books")
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const handleDeleteBook = async () => {
    if (!bookToDelete) return
    try {
      await axiosInstance.delete(`${API_PATHS.BOOKS.DELETE_BOOK}/${bookToDelete}`)
      setBooks(books.filter((book) => book._id !== bookToDelete))
      toast.success("Book deleted successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting book")
    } finally {
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
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3674B5]">My Books</h1>
            <p className="text-sm text-[#3674B5]/60 mt-1">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your library
            </p>
          </div>
          <Button
            className="bg-linear-to-r from-[#3674B5] to-[#578FCA] hover:from-[#578FCA] hover:to-[#3674B5] text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            onClick={handleCreateBookClick}
            icon={Plus}
          >
            Create Book
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#A1E3F9]/50">
            <div className="w-20 h-20 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Book className="w-10 h-10 text-[#3674B5]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3674B5] mb-2">No books found</h3>
            <p className="text-[#3674B5]/60 mb-6">Start your first eBook today</p>
            <Button
              onClick={handleCreateBookClick}
              icon={Plus}
              className="bg-linear-to-r from-[#3674B5] to-[#578FCA] hover:from-[#578FCA] hover:to-[#3674B5] text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-[#3674B5]/25 hover:shadow-[#3674B5]/40 transition-all duration-300 hover:scale-105"
            >
              Create a book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleDeleteBook}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
      />

      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBookCreated={handleBookCreated}
      />
    </DashboardLayout>
  )
}

export default DashboardPage