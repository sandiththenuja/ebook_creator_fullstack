import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import DashboardLayout from '../components/layout/DashboardLayout'
import { Book, Sparkles } from 'lucide-react'
import ViewBook from '../components/view/ViewBook'

const ViewBookSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-[#D1F8EF] rounded-lg w-1/2 mb-4"></div>
    <div className="h-4 bg-[#D1F8EF] rounded-lg w-1/4 mb-8"></div>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 lg:w-1/4">
        <div className="aspect-16/20 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] rounded-2xl"></div>
      </div>
      <div className="md:w-2/3 lg:w-3/4 space-y-4">
        <div className="h-6 bg-[#D1F8EF] rounded-lg w-3/4"></div>
        <div className="h-4 bg-[#D1F8EF] rounded-lg w-1/2"></div>
        <div className="h-20 bg-[#D1F8EF] rounded-lg"></div>
        <div className="h-10 bg-[#D1F8EF] rounded-lg w-1/3"></div>
      </div>
    </div>
  </div>
)

const ViewBookPage = () => {
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { bookId } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`)
        setBook(response.data)
      } catch (error) {
        toast.error("Error loading eBook")
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [bookId])

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {isLoading ? (
          <ViewBookSkeleton />
        ) : book ? (
          <ViewBook book={book} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#A1E3F9]/50">
            <div className="w-20 h-20 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Book className="w-10 h-10 text-[#3674B5]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3674B5] mb-2">eBook Not Found</h3>
            <p className="text-[#3674B5]/60">The eBook you are looking for does not exist</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ViewBookPage