import express from 'express';

import { signup, login, getFavorites, getUsers, editUser, changePassword } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/', auth, editUser);
router.get('/', auth, getUsers);
router.patch('/change_password', auth, changePassword);

router.get('/favorites', auth, getFavorites);

export default router;