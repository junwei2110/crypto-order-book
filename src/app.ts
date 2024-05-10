import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import orderbookRouter from './routes/orderbook';

const app = express();
dotenv.config();
const port = process.env.PORT || 8090; 


app.use("/orderbook", orderbookRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});


app.listen(port, () => {
    return console.log("Express is listening at port: " + port);
});