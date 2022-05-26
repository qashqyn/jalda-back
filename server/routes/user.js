import express from 'express';

import { signup, login, getFavorites, getUsers, editUser, changePassword, upgradeToAuthor, signupAuthor, resetPassword } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/signup_author', signupAuthor);

router.post('/upgrade_to_author', auth, upgradeToAuthor);
router.patch('/', auth, editUser);
router.get('/', auth, getUsers);
router.patch('/change_password', auth, changePassword);
router.post('/reset_password', resetPassword);

router.get('/favorites', auth, getFavorites);

export default router;