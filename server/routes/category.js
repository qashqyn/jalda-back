import express from "express";

import { getCategory, getMainCategories, getChildCategories, createCategory, updateCategory, getCategories } from '../controllers/category.js';

const router = express.Router();

router.get('/main/', getMainCategories);
router.get('/:id', getCategory);
router.get('/:id/child', getChildCategories);
router.get('/', getCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);

export default router;