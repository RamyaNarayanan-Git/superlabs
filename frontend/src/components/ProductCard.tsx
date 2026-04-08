import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Rating, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="no-underline"
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(product.id);
        }
      }}
    >
      <Card
        className="h-full hover:shadow-lg transition-shadow cursor-pointer"
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail || '/placeholder.png'}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: '#f0f0f0',
          }}
        />
        <CardContent className="flex flex-col gap-2">
          <Typography
            variant="subtitle2"
            className="text-xs text-gray-500 uppercase"
          >
            {product.category}
          </Typography>
          <Typography variant="h6" className="font-bold line-clamp-2">
            {product.name}
          </Typography>

          {product.brand && (
            <Typography variant="caption" className="text-gray-600">
              Brand: {product.brand}
            </Typography>
          )}

          <div className="flex justify-between items-center my-2">
            <Typography variant="h5" className="font-bold text-primary">
              ${Number(product.price).toFixed(2)}
            </Typography>
            {product.availability ? (
              <Chip
                label="In Stock"
                size="small"
                color="success"
                variant="outlined"
              />
            ) : (
              <Chip
                label="Out of Stock"
                size="small"
                color="error"
                variant="outlined"
              />
            )}
          </div>

          {product.rating && (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="caption" className="text-gray-600">
                ({product.review_count || 0})
              </Typography>
            </Stack>
          )}

          {product.tags && product.tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} className="gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>
          )}

          <button className="mt-auto w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCartIcon fontSize="small" />
            View Details
          </button>
        </CardContent>
      </Card>
    </Link>
  );
};