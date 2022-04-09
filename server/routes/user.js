import express from 'express';

import { signup, login, getFavorites } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/favorites', auth, getFavorites);

export default router;