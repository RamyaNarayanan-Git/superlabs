import { body, query, param, validationResult } from 'express-validator';

// Reusable result checker
const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(e => ({
        field:   e.path,
        message: e.msg
      }))
    });
  }
  next();
};

export const validateSearch = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be 1–100'),
  checkResult
];

export const validateCreate = [
  body('name')
    .trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 255 }).withMessage('Name max 255 chars'),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('sku')
    .trim().notEmpty().withMessage('SKU is required'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be true or false'),
  checkResult
];

export const validateUpdate = [
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be non-negative'),
  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be true or false'),
  checkResult
];

export const validateId = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  checkResult
];