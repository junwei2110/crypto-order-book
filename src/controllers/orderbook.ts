import asyncHandler from 'express-async-handler';
import { getOrderBook } from '../webCall/orderbook';
import { exchangesInput, exchanges } from '../util/constants';
import { findKeyValueJSON, calculateAverage } from '../util/utility';


export const retrieveMidPrice = asyncHandler(async (req, res) => {
    
    const midPrices = [];

    for (let i = 0; i < exchanges.length; i++) {
        const { symbolName } = req.query;
        const exchangeParam = exchangesInput[exchanges[i]].setParams(symbolName);
   
        const data = await getOrderBook(exchangesInput[exchanges[i]]["url"], exchangeParam as Record<string, string>);
  
        const midPrice = getMidPrice(data);
        if (midPrice < Infinity) {
            midPrices.push(midPrice);
        }

    }

    res.send({ midprice: calculateAverage(midPrices) });

});


const getMidPrice = (data: Record<string, any>) => {
    let highestBidPrice: number;
    let LowestAskPrice: number;
    try {
        highestBidPrice = parseFloat(findKeyValueJSON("bids", data)["bids"][0][0]);
        LowestAskPrice = parseFloat(findKeyValueJSON("asks", data)["asks"][0][0]);

        return (highestBidPrice + LowestAskPrice)/2;
    } catch (e) {
        console.log(e.message);
        return Infinity;
    }
}

