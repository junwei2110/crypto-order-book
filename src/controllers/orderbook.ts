import asyncHandler from 'express-async-handler';
import { getOrderBook } from '../webCall/orderbook';
import { exchangesInput, exchanges, ExchangeInput, symbol } from '../util/constants';
import { findKeyValueJSON, calculateAverage } from '../util/utility';


export const retrieveMidPrice = asyncHandler(async (_req, res) => {
    const midPrices = [];
    for (let i = 0; i < exchanges.length; i++) {
        const exchangeInput = exchangesInput[exchanges[i]];

        if (!exchangeInput.hasOwnProperty("setWs")) {
            const exchangeParam = exchangeInput.setParams(symbol);
           
            const data = await getOrderBook(exchangeInput.url, exchangeParam as Record<string, string>);
        
            const midPrice = getMidPrice(data, exchangeInput);
            if (midPrice < Infinity) {
                midPrices.push(midPrice);
            }

        }

    }
    Object.values(global.wsOrderBookDataObj).forEach((wsMidPrice) => midPrices.push(wsMidPrice));
    console.log(midPrices);

    res.json({ midprice: calculateAverage(midPrices) });

});


const getMidPrice = (data: Record<string, any>, exchangeInput: ExchangeInput) => {
    let highestBidPrice: number;
    let LowestAskPrice: number;
    try {
        highestBidPrice = parseFloat(findKeyValueJSON(exchangeInput.restKeys.bidKey, data)[exchangeInput.restKeys.bidKey][0][0]);
        LowestAskPrice = parseFloat(findKeyValueJSON(exchangeInput.restKeys.askKey, data)[exchangeInput.restKeys.askKey][0][0]);
        return (highestBidPrice + LowestAskPrice)/2;
    } catch (e) {
        console.log(e.message);
        return Infinity;
    }
}

