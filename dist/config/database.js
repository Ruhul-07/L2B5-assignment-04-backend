"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        await mongoose_1.default.connect(mongoURI);
        console.log("✅ Connected to MongoDB");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
mongoose_1.default.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
process.on("SIGINT", async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
    }
    catch (error) {
        console.error("Error during MongoDB disconnection:", error);
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=database.js.map