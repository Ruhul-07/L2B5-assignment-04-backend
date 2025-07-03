import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database"
import bookRoutes from "./routes/books"
import borrowRoutes from "./routes/borrows"
import { errorHandler, notFound } from "./middleware/errorHandler"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)


// API routes
app.use("/api/books", bookRoutes)
app.use("/api/borrows", borrowRoutes)

// 404 handler
app.use(notFound)

// Error handling middleware
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`)
})

export default app
