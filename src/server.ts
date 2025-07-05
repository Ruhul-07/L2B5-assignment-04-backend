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


// --- ADD THESE LINES FOR DEBUGGING ---
console.log("Vercel Deployment Environment Variables:")
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);
// --- END DEBUGGING LINES ---

// Connect to database
connectDB()

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

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
