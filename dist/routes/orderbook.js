"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderbook_1 = require("../controllers/orderbook");
const router = (0, express_1.Router)();
router.get("/", orderbook_1.retrieveMidPrice);
exports.default = router;
//# sourceMappingURL=orderbook.js.map