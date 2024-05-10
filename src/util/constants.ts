export const exchanges = ["Binance", "Kraken", "Huobi"];
export const symbol = "btcusdt"

export type ExchangesInput = {
    [key: string]: {
        url: string,
        setWs?: (symbol: string) => string;
        setParams: (symbol: string) => Record<string, any>,
        restKeys: Record<string, string>,
        wsKeys?: Record<string, string>
    }
}

export type ExchangeInput = {
    
        url: string,
        setWs?: (symbol: string) => string;
        setParams: (symbol: string) => Record<string, any>,
        restKeys: Record<string, string>,
        wsKeys?: Record<string, string>
    
}

export const exchangesInput: ExchangesInput = {
    Binance: {
        url: "https://api.binance.com/api/v3/depth",
        setWs: (symbol: string) => {
            return `wss://fstream.binance.com/ws/${symbol.toLowerCase()}@bookTicker`;
        },
        setParams: (symbol: string) => {
            return {
                symbol,
                limit: 1,
            }
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
        setParams: (symbol: string) => {
            return {
                pair: symbol,
                count: 1,
            }
        },
        restKeys: {
            bidKey: "bids",
            askKey: "asks"
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
        },
        restKeys: {
            bidKey: "bids",
            askKey: "asks"
        }        
    }
};
