import { Router } from 'express';
import { validationResult } from 'express-validator';
import personController from '../controllers/personController.js';
import { personValidationRules } from '../validators/personValidator.js';

const router = Router();

// Middleware para manejar los errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

router.get('/', personController.getPersons);
router.post('/', personValidationRules(), validate, personController.createPerson);
router.put('/:id', personValidationRules(), validate, personController.updatePerson);
router.delete('/:id', personController.deletePerson);

export default router; 