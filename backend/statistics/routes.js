import express from 'express';
import { validateToken } from '../auth/validateToken.js';
import { requireDirector } from '../auth/authorizeRoles.js';
import { getStatistics } from './getStatistics.js';

const router = express.Router();

router.use(validateToken);

router.get('/', requireDirector, getStatistics);

export const statisticsRoutes = router;
