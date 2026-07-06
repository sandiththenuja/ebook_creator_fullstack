require("dotenv").config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoute')

const app = express()

// middleware to handle cors
app.use(
    cors({
        origin: "*",
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
