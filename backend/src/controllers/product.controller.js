import  productModel  from '../models/product.model.js';

// ── Public ────────────────────────────────────────────────────────

export async function searchProduct(req, res, next) {
  try {
    const { q = '', page = 1, limit = 10 } = req.query;
    const result = await productModel.search(q, page, limit);
    res.status(200).json({
      status:  'success',
      data:    result.products,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await productModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status:  'error',
        message: `Product with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
}

export async function getProductBySearchWord(req, res, next) {
  try {
    const product = await productModel.getBySearchWord(
      req.params.word
    );
    if (!product) {
      return res.status(404).json({
        status:  'error',
        message: `No product found matching "${req.params.word}"`
      });
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
}

// ── Admin ─────────────────────────────────────────────────────────

export async function getAllProducts(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await productModel.getAll(page, limit);
    res.status(200).json({
      status: 'success',
      data:   result.products,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({ status: 'success', data: product });
  } catch (err) {
    // Handle duplicate SKU
    if (err.code === '23505') {
      return res.status(409).json({
        status:  'error',
        message: 'SKU already exists'
      });
    }
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await productModel.update(
      req.params.id, req.body
    );
    if (!product) {
      return res.status(404).json({
        status:  'error',
        message: `Product with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    // Handle duplicate SKU
    if (err.code === '23505') {
      return res.status(409).json({
        status:  'error',
        message: 'SKU already exists'
      });
    }
    next(err);
  }
}

export async function removeProduct(req, res, next) {
  try {
    const deleted = await productModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status:  'error',
        message: `Product with ID ${req.params.id} not found`
      });
    }
    res.status(204).send(); // 204 No Content on delete
  } catch (err) {
    next(err);
  }
}