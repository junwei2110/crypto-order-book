"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const orderbook_1 = __importDefault(require("./routes/orderbook"));
const orderbook_2 = require("./webCall/orderbook");
//Global WebSocket Data Obj
global.wsOrderBookDataObj = {};
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 8080;
app.use("/orderbook", orderbook_1.default);
(0, orderbook_2.createOrderBookWebSocket)();
app.listen(port, () => {
    return console.log("Express is listening at port: " + port);
});
//# sourceMappingURL=app.js.map