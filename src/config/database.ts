import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI

    await mongoose.connect(mongoURI as string)

    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error)
})

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected")
})

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close()
    console.log("MongoDB connection closed through app termination")
    process.exit(0)
  } catch (error) {
    console.error("Error during MongoDB disconnection:", error)
    process.exit(1)
  }
})

export default connectDB
