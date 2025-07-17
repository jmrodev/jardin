import { Router } from 'express';
import personController from '../controllers/personController.js';
import { validatePersonData } from './validatePersonData.js';

const router = Router();

router.get('/', personController.getPersons);
router.post('/', validatePersonData, personController.createPerson);
router.put('/:id', validatePersonData, personController.updatePerson);
router.delete('/:id', personController.deletePerson);

export default router; 