import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, favPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/addToFavorites', auth, favPost);
router.delete('/:id', auth, deletePost);

export default router;