"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangesInput = exports.exchanges = void 0;
exports.exchanges = ["Binance", "Kraken", "Huobi"];
exports.exchangesInput = {
    Binance: {
        url: "https://api.binance.com/api/v3/depth",
        setParams: (symbol) => {
            return {
                symbol,
                limit: 1,
            };
        }
    },
    Kraken: {
        url: "https://api.kraken.com/0/public/Depth",
        setParams: (symbol) => {
            return {
                pair: symbol,
                count: 1,
            };
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
        }
    }
};
//# sourceMappingURL=constants.js.map