"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowController_1 = require("../controllers/borrowController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post("/", validation_1.validateBorrowInput, borrowController_1.borrowBook);
router.get("/summary", borrowController_1.getBorrowSummary);
router.get("/", borrowController_1.getAllBorrows);
exports.default = router;
//# sourceMappingURL=borrows.js.map