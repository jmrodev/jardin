import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireTeacher } from '../auth/authorizeRoles.js';
import contactController from '../controllers/contactController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// Alternative contacts with role-based access
router.get('/', validateToken, requireTeacher, asyncHandler(contactController.getContacts));
router.post('/', asyncHandler(contactController.createContact));

export const contactRoutes = router; 