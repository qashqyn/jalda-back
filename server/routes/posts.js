import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, favPost, addReview } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/addToFavorites', auth, favPost);
router.patch('/:id/review', auth, addReview);
router.delete('/:id', auth, deletePost);
router.get('/', getPosts);
router.post('/', auth, createPost);

export default router;