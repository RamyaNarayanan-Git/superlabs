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
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 name:
 *                   type: string
 *                   example: "Audiomax Bluetooth Headphones"
 *                 price:
 *                   type: string
 *                   example: "38.00"
 *                 sku:
 *                   type: string
 *                   example: "WBH-2024-001"
 *                 brand:
 *                   type: string
 *                   example: "Audiomax"
 *                 category:
 *                   type: string
 *                   example: "Electronics"
 *                 availability:
 *                   type: boolean
 *                   example: true
 *                 stock:
 *                   type: integer
 *                   example: 45
 *                 thumbnail:
 *                   type: string
 *                   example: "https://example.com/images/headphones-thumb.jpg"
 *                 rating:
 *                   type: string
 *                   example: "0.00"
 *                 review_count:
 *                   type: integer
 *                   example: 0
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["wireless", "bluetooth"]
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-04-08T02:24:40.598Z"
 *       400:
 *         description: Bad request / validation error
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
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 name:
 *                   type: string
 *                   example: "Audiomax Bluetooth Headphones"
 *                 price:
 *                   type: string
 *                   example: "38.00"
 *                 sku:
 *                   type: string
 *                   example: "WBH-2024-001"
 *                 brand:
 *                   type: string
 *                   example: "Audiomax"
 *                 category:
 *                   type: string
 *                   example: "Electronics"
 *                 availability:
 *                   type: boolean
 *                   example: true
 *                 stock:
 *                   type: integer
 *                   example: 45
 *                 thumbnail:
 *                   type: string
 *                   example: "https://example.com/images/headphones-thumb.jpg"
 *                 rating:
 *                   type: string
 *                   example: "0.00"
 *                 review_count:
 *                   type: integer
 *                   example: 0
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["wireless", "bluetooth"]
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-04-08T02:24:40.598Z"
 *       400:
 *         description: Bad request / validation error
 *       404:
 *         description: Product not found
 *       409:
 *         description: SKU already exists
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