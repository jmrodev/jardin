import { Router } from 'express';
import { getPersons } from './getPersons.js';
import { createPerson } from './createPerson.js';
import { updatePerson } from './updatePerson.js';
import { deletePerson } from './deletePerson.js';

const router = Router();

router.get('/', getPersons);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router; 