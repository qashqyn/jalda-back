import express from 'express';
import { approveAuthor, getWaitingAuthors } from '../controllers/admin.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/waiting_authors', auth, getWaitingAuthors);
router.post('/waiting_authors/approve/:id', auth, approveAuthor);

export default router;