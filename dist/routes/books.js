"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get("/", bookController_1.getAllBooks);
router.get("/:id", validation_1.validateObjectId, bookController_1.getBookById);
router.post("/", validation_1.validateBookInput, bookController_1.createBook);
router.patch("/:id", validation_1.validateObjectId, validation_1.validateBookInput, bookController_1.updateBook);
router.delete("/:id", validation_1.validateObjectId, bookController_1.deleteBook);
exports.default = router;
//# sourceMappingURL=books.js.map