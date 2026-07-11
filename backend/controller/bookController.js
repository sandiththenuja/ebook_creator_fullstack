const Book = require('../models/Book')

const createBook = async(req, res) => {
    try {
        const {title, author, subtitle, chapters} = req.body

        if(!title || !author){
            return res.status(400).json({message: "Enter title and author"})
        }

        const book = await Book.create({
            userId: req.user._id,
            title,
            author,
            subtitle,
            chapters: chapters || []
        })
        res.status(201).json(book)
    } catch (error) {
        console.error('❌ Create book error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const getBooks = async(req, res) => {
    try {
        const books = await Book.find({userId: req.user._id})
            .sort({createdAt: -1})
            .select('title author subtitle coverImage chapters status createdAt')
        
        res.status(200).json(books)
    } catch (error) {
        console.error('❌ Get books error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const getBookById = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized to view this book"})
        }

        res.status(200).json(book)
    } catch (error) {
        console.error('❌ Get book by id error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const updateBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized to update this book"})
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        )

        res.status(200).json(updatedBook)
    } catch (error) {
        console.error('❌ Update book error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const deleteBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized to delete this book"})
        }

        await book.deleteOne()

        res.status(200).json({message: "Book deleted successfully"})
    } catch (error) {
        console.error('❌ Delete book error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

const updateBookCover = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized to update this book"})
        }

        if(!req.file){
            return res.status(400).json({message: "No image file provided"})
        }

        const coverImageUrl = `/uploads/${req.file.filename}`
        book.coverImage = coverImageUrl

        const updatedBook = await book.save()

        // ✅ Return full URL for frontend
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`
        
        res.status(200).json({
            message: "Cover image updated successfully",
            book: {
                ...updatedBook._doc,
                coverImage: `${baseUrl}${coverImageUrl}`
            }
        })
    } catch (error) {
        console.error('❌ Update cover error:', error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover
}