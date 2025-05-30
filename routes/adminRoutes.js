import express from 'express';
import { getAllOrders, updateOrder, getRiders } from '../controllers/adminController.js';

const router = express.Router();
router.get('/orders', getAllOrders);
router.patch('/orders/:id', updateOrder);
router.get('/riders', getRiders);
export default router;
