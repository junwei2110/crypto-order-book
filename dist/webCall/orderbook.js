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
exports.createOrderBookWebSocket = exports.getOrderBook = void 0;
const utility_1 = require("../util/utility");
const constants_1 = require("../util/constants");
const axios_1 = __importDefault(require("axios"));
const ws_1 = __importDefault(require("ws"));
function getOrderBook(url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = {};
        try {
            data = yield axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json'
                },
                params,
            }).then((response) => response.data);
        }
        catch (e) {
            console.log(e.message);
        }
        return data;
    });
}
exports.getOrderBook = getOrderBook;
function createOrderBookWebSocket() {
    for (let i = 0; i < constants_1.exchanges.length; i++) {
        const exchangeInput = constants_1.exchangesInput[constants_1.exchanges[i]];
        if (exchangeInput.hasOwnProperty("setWs") && exchangeInput.hasOwnProperty('wsKeys')) {
            const wsUrl = exchangeInput.setWs("btcusdt");
            const ws = new ws_1.default(wsUrl);
            ws.on('open', function open() {
                console.log(`Connected to WebSocket for order book ${wsUrl}`);
            });
            ws.on('message', function incoming(data) {
                const midPrice = getWsMidPrice(data.toString(), exchangeInput);
                if (midPrice < Infinity) {
                    global.wsOrderBookDataObj[constants_1.exchanges[i]] = midPrice;
                }
            });
            ws.on('error', function error(err) {
                console.error('WebSocket error:', err);
            });
            ws.on('close', function close() {
                console.log('WebSocket connection closed');
            });
        }
    }
}
exports.createOrderBookWebSocket = createOrderBookWebSocket;
const getWsMidPrice = (data, exchangeInput) => {
    var _a, _b, _c, _d;
    let highestBidPrice;
    let LowestAskPrice;
    try {
        highestBidPrice = parseFloat((0, utility_1.findKeyValueJSON)((_a = exchangeInput.wsKeys) === null || _a === void 0 ? void 0 : _a.bidKey, JSON.parse(data))[(_b = exchangeInput.wsKeys) === null || _b === void 0 ? void 0 : _b.bidKey]);
        LowestAskPrice = parseFloat((0, utility_1.findKeyValueJSON)((_c = exchangeInput.wsKeys) === null || _c === void 0 ? void 0 : _c.askKey, JSON.parse(data))[(_d = exchangeInput.wsKeys) === null || _d === void 0 ? void 0 : _d.askKey]);
        return (highestBidPrice + LowestAskPrice) / 2;
    }
    catch (e) {
        console.log(e.message);
        return Infinity;
    }
};
//# sourceMappingURL=orderbook.js.map