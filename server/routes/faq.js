import express from "express";

import { getFaqs } from "../controllers/faq.js";

const router = express.Router();

router.get('/', getFaqs);

export default router;