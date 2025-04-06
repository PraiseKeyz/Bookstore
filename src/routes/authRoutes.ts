import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();
const {login, signup} = authController;

router.post('/login', login);

router.post('/signup', signup);

export default router;