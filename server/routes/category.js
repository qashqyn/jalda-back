import express from "express";

import { getCategory, getMainCategories, getChildCategories, createCategory, updateCategory } from '../controllers/category.js';

const router = express.Router();

router.get('/main/', getMainCategories);
router.get('/:id', getCategory);
router.get('/:id/child', getChildCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);

export default router;