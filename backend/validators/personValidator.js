import { body } from 'express-validator';

export const personValidationRules = () => [
  body('name').isString().notEmpty().withMessage('El nombre es obligatorio.'),
  body('lastname_father').isString().notEmpty().withMessage('El apellido paterno es obligatorio.'),
  body('lastname_mother').optional().isString(),
  body('email').isEmail().withMessage('Debe ser un email válido.'),
  body('dni').optional().isString(),
]; 