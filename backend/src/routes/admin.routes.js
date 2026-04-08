import express from 'express'
const router = express.Router();
import { getAllProducts, createProduct, updateProduct, removeProduct } from '../controllers/product.controller.js';
import { validateCreate, validateUpdate, validateId } from '../middleware/validate.js';

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Get all products (Admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: All products with pagination
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, sku]
 *             properties:
 *               name:        { type: string }
 *               description: { type: string }
 *               price:       { type: number }
 *               sku:         { type: string }
 *               brand:       { type: string }
 *               category:    { type: string }
 *               stock:       { type: integer }
 *               availability:{ type: boolean }
 *               thumbnail:   { type: string }
 *               images:      { type: array, items: { type: string } }
 *               tags:        { type: array, items: { type: string } }
 *               attributes:  { type: object }
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 *       409:
 *         description: SKU already exists
 */
router.post('/', validateCreate, createProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', validateId, validateUpdate, updateProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', validateId, removeProduct);

export default router;