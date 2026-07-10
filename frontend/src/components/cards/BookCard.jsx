import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/apiPaths'

const BookCard = ({book, onDelete}) => {
  const navigate = useNavigate()

  const convertImageUrl = book.convertImageUrl
    ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/")
    : ""

  return (
    <div onClick={() => navigate(`/view-book/${book._id}`)}>
      <img src={convertImageUrl} alt={book.title} onError={(e) => e.target.src = ""} />

      <div className="">
        <button 
        onClick={(e) => {e.stopPropagation(); navigate(`/editor/${book._id}`)}}>Edit</button>

        <button 
        onClick={(e) => {e.stopPropagation(); onDelete(book._id)}}>Delete</button>
      </div>

      {book.title}
      {book.author}

    </div>
  )
}

export default BookCard