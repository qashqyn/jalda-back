import express from 'express';

import { signup, login, getFavorites, getUsers, editUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/', editUser);
router.get('/', auth, getUsers);

router.get('/favorites', auth, getFavorites);

export default router;