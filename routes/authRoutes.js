import express from 'express';
import { listUsers, verifyGoogleToken } from '../controllers/authController.js';

const router = express.Router();
router.get('/users', listUsers);
router.post('/verify', verifyGoogleToken);
export default router;