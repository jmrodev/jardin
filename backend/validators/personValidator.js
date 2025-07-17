import { body } from 'express-validator';

export const personValidationRules = () => {
  return [
    body('first_name').isString().notEmpty().withMessage('El primer nombre es obligatorio.'),
    body('middle_name').isString().optional({ checkFalsy: true }),
    body('paternal_lastname').isString().notEmpty().withMessage('El apellido paterno es obligatorio.'),
    body('maternal_lastname').isString().optional({ checkFalsy: true }),
    body('preferred_name').isString().trim().escape().optional(),
    body('nationality').isString().optional({ checkFalsy: true }),
    body('dni').isString().notEmpty().withMessage('El DNI es obligatorio.').isLength({ min: 6, max: 12 }).withMessage('El DNI debe tener entre 6 y 12 caracteres.'),
    body('address').isString().optional(),
    body('phone').isString().optional(),
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido.').optional({ checkFalsy: true }),
    body('birthdate').isISO8601().toDate().withMessage('La fecha de nacimiento debe ser una fecha válida.').optional(),
  ];
}; 