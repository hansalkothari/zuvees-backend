import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();
router.post('/add', addToCart);
router.get('/:email', getCart);
export default router;