import { Router, Request, Response } from 'express';
import { retrieveMidPrice } from '../controllers/orderbook';

const router = Router();

router.get("/", retrieveMidPrice);

export default router;