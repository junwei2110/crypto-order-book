"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangesInput = exports.symbol = exports.exchanges = void 0;
exports.exchanges = ["Binance", "Kraken", "Huobi"];
exports.symbol = "btcusdt";
exports.exchangesInput = {
    Binance: {
        url: "https://api.binance.com/api/v3/depth",
        setWs: (symbol) => {
            return `wss://fstream.binance.com/ws/${symbol.toLowerCase()}@bookTicker`;
        },
        setParams: (symbol) => {
            return {
                symbol,
                limit: 1,
            };
        },
        restKeys: {
            bidKey: "bids",
            askKey: "asks"
        },
        wsKeys: {
            bidKey: "b",
            askKey: "a"
        }
    },
    Kraken: {
        url: "https://api.kraken.com/0/public/Depth",
        setParams: (symbol) => {
            return {
                pair: symbol,
                count: 1,
            };
        },
        restKeys: {
            bidKey: "bids",
            askKey: "asks"
        }
    },
    Huobi: {
        url: "https://api.huobi.pro/market/depth",
        setParams: (symbol) => {
            return {
                symbol: symbol.toLowerCase(),
                depth: 5,
                type: "step0"
            };
        },
        restKeys: {
            bidKey: "bids",
            askKey: "asks"
        }
    }
};
//# sourceMappingURL=constants.js.map