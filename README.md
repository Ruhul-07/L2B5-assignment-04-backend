# Library Management System - Backend API

A robust TypeScript backend API for the Library Management System built with Express.js, MongoDB, and Mongoose.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **MongoDB & Mongoose** - Document database with ODM
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Centralized error handling with custom error classes

## 📁 Project Structure

\`\`\`
server/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection
│   ├── controllers/
│   │   ├── bookController.ts    # Book CRUD operations
│   │   └── borrowController.ts  # Borrow operations
│   ├── middleware/
│   │   ├── errorHandler.ts      # Error handling middleware
│   │   └── validation.ts        # Input validation
│   ├── models/
│   │   ├── Book.ts             # Book schema
│   │   └── Borrow.ts           # Borrow schema
│   ├── routes/
│   │   ├── books.ts            # Book routes
│   │   └── borrows.ts          # Borrow routes
│   ├── scripts/
│   │   └── seed.ts             # Database seeding
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── server.ts               # Main server file
├── dist/                       # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env.example
\`\`\`

## 🛠️ Installation & Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment setup:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

3. **Build the project:**
   \`\`\`bash
   npm run build
   \`\`\`

4. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📚 API Endpoints

### Books
- `GET /api/books` - Get all books (with pagination)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Borrows
- `POST /api/borrows` - Borrow a book
- `GET /api/borrows/summary` - Get borrow summary
- `GET /api/borrows` - Get all borrow records


## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run type-check` - Type check without compilation

## 🛡️ Security Features

- **CORS** - Cross-origin resource sharing
- **Input Validation** - Sanitize and validate requests
- **Error Handling** - Secure error responses

## 📊 Type Safety

Full TypeScript implementation with:
- Interface definitions for all data models
- Typed request/response objects
- Generic type parameters
- Strict type checking enabled

## 🗄️ Database Schema

### Book Model
\`\`\`typescript
interface IBook {
  title: string
  author: string
  genre: string
  isbn: string
  description?: string
  copies: number
  available: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Borrow Model
\`\`\`typescript
interface IBorrow {
  bookId: ObjectId
  bookTitle: string
  isbn: string
  quantity: number
  dueDate: Date
  borrowDate: Date
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Build the project: `npm run build`
4. Start with: `npm start`

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper type definitions
3. Include error handling
4. Write descriptive commit messages
