import pool from '../config/db.js';

class ProductModel {

  // ── Search with pagination ──────────────────────────────────────
  static async search(query, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const searchTerm = `%${query}%`;

    const { rows: products } = await pool.query(
      `SELECT 
         id, name, price, sku, brand, category,
         availability, stock, thumbnail, rating,
         review_count, tags, created_at
       FROM products
       WHERE 
         name        ILIKE $1 OR
         description ILIKE $1 OR
         brand       ILIKE $1 OR
         category    ILIKE $1 OR
         $2 = ANY(tags)
       ORDER BY created_at DESC
       LIMIT $3 OFFSET $4`,
      [searchTerm, query, limit, offset]
    );

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) FROM products
       WHERE 
         name        ILIKE $1 OR
         description ILIKE $1 OR
         brand       ILIKE $1 OR
         category    ILIKE $1 OR
         $2 = ANY(tags)`,
      [searchTerm, query]
    );

    const total = parseInt(countRows[0].count);

    return {
      products,
      pagination: {
        total,
        page:        parseInt(page),
        limit:       parseInt(limit),
        totalPages:  Math.ceil(total / limit),
        hasNext:     page < Math.ceil(total / limit),
        hasPrev:     page > 1
      }
    };
  }

  // ── Get by ID ───────────────────────────────────────────────────
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  // ── Get by search word (name match) ────────────────────────────
  static async getBySearchWord(word) {
    const { rows } = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 
       ORDER BY rating DESC 
       LIMIT 1`,
      [`%${word}%`]
    );
    return rows[0] || null;
  }

  // ── Get all (admin) ─────────────────────────────────────────────
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows: products } = await pool.query(
      `SELECT * FROM products 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const { rows: countRows } = await pool.query(
      'SELECT COUNT(*) FROM products'
    );

    const total = parseInt(countRows[0].count);

    return {
      products,
      pagination: {
        total,
        page:       parseInt(page),
        limit:      parseInt(limit),
        totalPages: Math.ceil(total / limit),
        hasNext:    page < Math.ceil(total / limit),
        hasPrev:    page > 1
      }
    };
  }

  // ── Create ──────────────────────────────────────────────────────
  static async create(data) {
    const {
      name, description, price, sku, brand, category,
      availability = true, stock = 0, images = [],
      thumbnail, tags = [], attributes = {}, reviews = []
    } = data;

    const { rows } = await pool.query(
      `INSERT INTO products 
         (name, description, price, sku, brand, category,
          availability, stock, images, thumbnail, tags,
          attributes, reviews)
       VALUES 
         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING *`,
      [
        name, description, price, sku, brand, category,
        availability, stock, images, thumbnail, tags,
        JSON.stringify(attributes), JSON.stringify(reviews)
      ]
    );
    return rows[0];
  }

  // ── Update ──────────────────────────────────────────────────────
  static async update(id, data) {
    const fields = [];
    const values = [];
    let index = 1;

    const allowed = [
      'name', 'description', 'price', 'brand', 'category',
      'availability', 'stock', 'images', 'thumbnail',
      'tags', 'attributes', 'reviews'
    ];

    for (const key of allowed) {
      if (data[key] !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(
          typeof data[key] === 'object' && !Array.isArray(data[key])
            ? JSON.stringify(data[key])
            : data[key]
        );
        index++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const { rows } = await pool.query(
      `UPDATE products SET ${fields.join(', ')} 
       WHERE id = $${index} RETURNING *`,
      values
    );
    return rows[0] || null;
  }

  // ── Delete ──────────────────────────────────────────────────────
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [id]
    );
    return rows[0] || null;
  }
}

export default ProductModel;