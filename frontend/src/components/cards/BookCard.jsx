import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash2, BookOpen } from 'lucide-react'
import { BASE_URL } from '../../utils/apiPaths'

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate()

  const coverImageUrl = book.coverImage?.startsWith('http')
      ? book.coverImage
      : `${BASE_URL}/backend${book.coverImage || ''}`.replace(/\\/g, '/')

  return (
    <div
      className="group bg-white rounded-2xl border border-[#A1E3F9]/30 shadow-sm hover:shadow-xl hover:shadow-[#3674B5]/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="relative aspect-16/20 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9]/50 flex items-center justify-center overflow-hidden">
        {coverImageUrl && coverImageUrl !== `${BASE_URL}/backend` ? (
          <img
            src={coverImageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = ""}
          />
        ) : (
          <BookOpen className="w-16 h-16 text-[#3674B5]/30 group-hover:text-[#3674B5]/50 transition-colors duration-300" />
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/editor/${book._id}`)
            }}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[#578FCA] hover:text-[#3674B5] shadow-sm transition-all hover:scale-110"
            title="Edit book"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(book._id)
            }}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-400 hover:text-red-500 shadow-sm transition-all hover:scale-110"
            title="Delete book"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/40 to-transparent p-3">
          <span className="text-xs font-medium text-white bg-[#3674B5]/70 px-2 py-0.5 rounded-full">
            {book.status || 'draft'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#3674B5] truncate text-base">{book.title}</h3>
        <p className="text-sm text-[#3674B5]/60 truncate">{book.author || 'Unknown author'}</p>
        <p className="text-xs text-[#3674B5]/40 mt-1">{book.chapters?.length || 0} chapters</p>
      </div>
    </div>
  )
}

export default BookCard