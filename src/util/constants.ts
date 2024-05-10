export const exchanges = ["Binance", "Kraken", "Huobi"];

export const exchangesInput = {
    Binance: {
        url: "https://api.binance.com/api/v3/depth",
        setParams: (symbol: string) => {
            return {
                symbol,
                limit: 1,
            }
        }
    },

    Kraken: {
        url: "https://api.kraken.com/0/public/Depth",
        setParams: (symbol: string) => {
            return {
                pair: symbol,
                count: 1,
            }
        }
        
    },

    Huobi: {
        url: "https://api.huobi.pro/market/depth",
        setParams: (symbol: string) => {
            return {
                symbol: symbol.toLowerCase(),
                depth: 5,
                type: "step0"
            }
        }        
    }
};
