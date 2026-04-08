import express from 'express'
const router = express.Router();
import { searchProduct, getProductById, getProductBySearchWord } from '../controllers/product.controller.js';
import { validateSearch, validateId } from '../middleware/validate.js';

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Search products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of matching products
 */
router.get('/', validateSearch, searchProduct);

/**
 * @swagger
 * /api/products/search/{word}:
 *   get:
 *     summary: Get product by search word
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching product
 *       404:
 *         description: No product found
 */
router.get('/search/:word', getProductBySearchWord);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', validateId, getProductById);



export default router;