import express from 'express';
import { getRiderOrders } from '../controllers/riderController.js';

const router = express.Router();
router.get('/orders/:email', getRiderOrders);
export default router;