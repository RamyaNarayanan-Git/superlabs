import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import type { Product } from '../types';
import {
  Container,
  Grid,
  Alert,
  CircularProgress,
  Box,
  Chip,
  Stack,
  Rating,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load product details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Box className="flex justify-center items-center min-h-screen">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Go Back
        </Button>
        <Alert severity="error">{error || 'Product not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        className="mb-6"
        sx={{ color: '#aa3bff' }}
      >
        Back
      </Button>

      <Grid container spacing={6}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.thumbnail || '/placeholder.png'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </Box>

          {product.images && product.images.length > 0 && (
            <Stack direction="row" spacing={2} className="mt-4">
              {product.images.slice(0, 4).map((image, idx) => (
                <Box
                  key={idx}
                  className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                >
                  <img
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Category & Brand */}
            <Stack direction="row" spacing={1}>
              <Chip label={product.category} variant="outlined" />
              {product.brand && (
                <Chip label={`Brand: ${product.brand}`} variant="outlined" />
              )}
            </Stack>

            {/* Title */}
            <Typography variant="h3" className="font-bold">
              {product.name}
            </Typography>

            {/* SKU */}
            <Typography variant="caption" className="text-gray-600">
              SKU: {product.sku}
            </Typography>

            {/* Rating */}
            {product.rating && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating value={product.rating} readOnly />
                <Typography variant="body2" className="text-gray-600">
                  ({product.review_count || 0} reviews)
                </Typography>
              </Stack>
            )}

            <Divider />

            {/* Price & Stock */}
            <Stack spacing={2}>
              <Box>
                <Typography variant="h4" className="font-bold text-primary">
                ${Number(product.price).toFixed(2)}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={
                    product.availability
                      ? `In Stock (${product.stock} available)`
                      : 'Out of Stock'
                  }
                  color={product.availability ? 'success' : 'error'}
                  variant="outlined"
                />
              </Stack>
            </Stack>

            <Divider />

            {/* Description */}
            {product.description && (
              <Box>
                <Typography variant="h6" className="font-semibold mb-2">
                  About this product
                </Typography>
                <Typography variant="body2" className="text-gray-700 leading-relaxed">
                  {product.description}
                </Typography>
              </Box>
            )}

            {/* Attributes */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <Box>
                <Typography variant="h6" className="font-semibold mb-3">
                  Specifications
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <Stack
                      key={key}
                      direction="row"
                      justifyContent="space-between"
                      className="py-2 border-b border-gray-200"
                    >
                      <Typography variant="body2" className="text-gray-600 capitalize">
                        {key}
                      </Typography>
                      <Typography variant="body2" className="font-semibold">
                        {String(value)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  Tags:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="filled" />
                  ))}
                </Stack>
              </Box>
            )}

            <Divider />

            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                disabled={!product.availability}
                sx={{
                  backgroundColor: '#aa3bff',
                  '&:hover': { backgroundColor: '#8b2dcc' },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FavoriteBorderIcon />}
                sx={{
                  borderColor: '#aa3bff',
                  color: '#aa3bff',
                  '&:hover': {
                    borderColor: '#8b2dcc',
                    color: '#8b2dcc',
                  },
                }}
              >
                Wishlist
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
