require("dotenv").config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoute')
const bookRoutes = require('./routes/bookRoute')
const aiRoutes = require('./routes/aiRoute')
const exportRoutes = require('./routes/exportRoute')

const app = express()

// middleware to handle cors
app.use(
    cors({
        origin: [
        "https://ebook-creator-fullstack.vercel.app", 
        "http://localhost:5173"
    ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// connect db
connectDB()

// middlewaare
app.use(express.json())

// static folder for uploads
app.use('/backend/uploads', express.static(path.join(__dirname, "uploads")))

app.use('/api/auth', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/export', exportRoutes)

app.get('/', (req, res) => {
  res.send('Server is working')
})

// maget22841@acoxs.com

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
