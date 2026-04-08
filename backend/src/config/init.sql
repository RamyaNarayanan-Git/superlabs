CREATE TABLE IF NOT EXISTS products (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2) NOT NULL,
  sku           VARCHAR(100)  UNIQUE NOT NULL,
  brand         VARCHAR(100),
  category      VARCHAR(100),
  availability  BOOLEAN       DEFAULT true,
  stock         INTEGER       DEFAULT 0,
  images        TEXT[]        DEFAULT '{}',
  thumbnail     VARCHAR(500),
  rating        DECIMAL(3,2)  DEFAULT 0,
  review_count  INTEGER       DEFAULT 0,
  reviews       JSONB         DEFAULT '[]',
  tags          TEXT[]        DEFAULT '{}',
  attributes    JSONB         DEFAULT '{}',
  created_at    TIMESTAMP     DEFAULT NOW(),
  updated_at    TIMESTAMP     DEFAULT NOW()
);

-- Auto update updated_at on change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed some sample data
INSERT INTO products 
  (name, description, price, sku, brand, category, 
   availability, stock, thumbnail, rating, review_count, 
   reviews, tags, attributes)
VALUES
(
  'Wireless Bluetooth Headphones',
  'Premium noise-cancelling headphones with 30hr battery life.',
  2999.00, 'SKU-WBH-001', 'SoundMax', 'Electronics',
  true, 50,
  'https://via.placeholder.com/300x300?text=Headphones',
  4.5, 2,
  '[
    {"user": "Alice", "rating": 5, "comment": "Amazing sound!", "date": "2024-01-15"},
    {"user": "Bob",   "rating": 4, "comment": "Great value.",   "date": "2024-01-20"}
  ]',
  '{"wireless","bluetooth","audio"}',
  '{"color": "Black", "connectivity": "Bluetooth 5.0", "battery": "30 hours"}'
),
(
  'Running Shoes Pro',
  'Lightweight running shoes with advanced cushioning technology.',
  4500.00, 'SKU-RSP-002', 'SpeedFit', 'Footwear',
  true, 30,
  'https://via.placeholder.com/300x300?text=Shoes',
  4.2, 2,
  '[
    {"user": "Charlie", "rating": 4, "comment": "Very comfortable!", "date": "2024-02-01"},
    {"user": "Diana",   "rating": 5, "comment": "Best running shoes.", "date": "2024-02-10"}
  ]',
  '{"running","sports","shoes"}',
  '{"color": "Blue", "size_range": "6-12", "material": "Mesh"}'
),
(
  'Smart Watch Series X',
  'Feature-rich smartwatch with health monitoring and GPS.',
  8999.00, 'SKU-SWX-003', 'TechWear', 'Electronics',
  true, 20,
  'https://via.placeholder.com/300x300?text=SmartWatch',
  4.7, 2,
  '[
    {"user": "Eve",   "rating": 5, "comment": "Love the GPS feature!", "date": "2024-03-01"},
    {"user": "Frank", "rating": 5, "comment": "Best smartwatch ever.", "date": "2024-03-05"}
  ]',
  '{"smartwatch","wearable","fitness"}',
  '{"color": "Silver", "battery": "7 days", "waterproof": "IP68"}'
);