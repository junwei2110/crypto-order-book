"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveMidPrice = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderbook_1 = require("../webCall/orderbook");
const constants_1 = require("../util/constants");
const utility_1 = require("../util/utility");
exports.retrieveMidPrice = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const midPrices = [];
    for (let i = 0; i < constants_1.exchanges.length; i++) {
        const exchangeInput = constants_1.exchangesInput[constants_1.exchanges[i]];
        if (!exchangeInput.hasOwnProperty("setWs")) {
            const exchangeParam = exchangeInput.setParams(constants_1.symbol);
            const data = yield (0, orderbook_1.getOrderBook)(exchangeInput.url, exchangeParam);
            const midPrice = getMidPrice(data, exchangeInput);
            if (midPrice < Infinity) {
                midPrices.push(midPrice);
            }
        }
    }
    Object.values(global.wsOrderBookDataObj).forEach((wsMidPrice) => midPrices.push(wsMidPrice));
    console.log(midPrices);
    res.json({ midprice: (0, utility_1.calculateAverage)(midPrices) });
}));
const getMidPrice = (data, exchangeInput) => {
    let highestBidPrice;
    let LowestAskPrice;
    try {
        highestBidPrice = parseFloat((0, utility_1.findKeyValueJSON)(exchangeInput.restKeys.bidKey, data)[exchangeInput.restKeys.bidKey][0][0]);
        LowestAskPrice = parseFloat((0, utility_1.findKeyValueJSON)(exchangeInput.restKeys.askKey, data)[exchangeInput.restKeys.askKey][0][0]);
        return (highestBidPrice + LowestAskPrice) / 2;
    }
    catch (e) {
        console.log(e.message);
        return Infinity;
    }
};
//# sourceMappingURL=orderbook.js.map