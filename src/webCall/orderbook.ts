import { findKeyValueJSON } from '../util/utility';
import { exchangesInput, exchanges, ExchangeInput } from '../util/constants';
import axios from 'axios';
import WebSocket from 'ws';

export async function getOrderBook(url: string, params: Record<string, string>) {

    let data = {};
    try {
        data = await axios.get(url, {
            headers: {
                Accept: 'application/json'
            },
            params,
        }).then((response) => response.data);

    } catch (e) {
        console.log(e.message);
    } 

    return data;

}


export function createOrderBookWebSocket() {
    for (let i = 0; i < exchanges.length; i++) {
        const exchangeInput = exchangesInput[exchanges[i]];
        if (exchangeInput.hasOwnProperty("setWs") && exchangeInput.hasOwnProperty('wsKeys')) {
            const wsUrl =  exchangeInput.setWs("btcusdt");
            const ws = new WebSocket(wsUrl);
            ws.on('open', function open() {
                console.log(`Connected to WebSocket for order book ${wsUrl}`);
            });
              
            ws.on('message', function incoming(data) {
                const midPrice = getWsMidPrice(data.toString(), exchangeInput);
                
                if (midPrice < Infinity) {
                    global.wsOrderBookDataObj[exchanges[i]] = midPrice;
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


const getWsMidPrice = (data: string, exchangeInput: ExchangeInput) => {
    let highestBidPrice: number;
    let LowestAskPrice: number;
    try {
        highestBidPrice = parseFloat(findKeyValueJSON(exchangeInput.wsKeys?.bidKey, JSON.parse(data))[exchangeInput.wsKeys?.bidKey]);
        LowestAskPrice = parseFloat(findKeyValueJSON(exchangeInput.wsKeys?.askKey, JSON.parse(data))[exchangeInput.wsKeys?.askKey]);

        return (highestBidPrice + LowestAskPrice)/2;
    } catch (e) {
        console.log(e.message);
        return Infinity;
    }
}