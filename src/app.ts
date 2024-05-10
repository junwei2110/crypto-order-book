import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import orderbookRouter from './routes/orderbook';
import { createOrderBookWebSocket } from './webCall/orderbook';

declare global {
    interface global {
        wsOrderBookDataObj: Record<string, number>
    }
}
//Global WebSocket Data Obj
global.wsOrderBookDataObj = {};

const app = express();
dotenv.config();
const port = process.env.PORT || 8080; 


app.use("/orderbook", orderbookRouter);
createOrderBookWebSocket();


app.listen(port, () => {
    return console.log("Express is listening at port: " + port);
});