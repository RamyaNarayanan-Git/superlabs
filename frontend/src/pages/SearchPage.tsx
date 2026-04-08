import { useState, useEffect } from 'react';
import { SearchBar, ProductCard, PaginationControls } from '../components';
import { productService } from '../services/productService';
import type { Product, PaginationData } from '../types';
import { Container, Grid, Alert, CircularProgress, Box } from '@mui/material';

export const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim()) {
      fetchProducts();
    }
  }, [pagination.page, query]);

  const fetchProducts = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await productService.search(
        query,
        pagination.page,
        pagination.limit
      );
      setProducts(response.data);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch products. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setProducts([]);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Search Products</h1>
        <p className="text-gray-600">
          Find products by name, brand, category, or tags
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error Message */}
      {error && (
        <Alert severity="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Results */}
      {query.trim() && (
        <>
          <div className="mb-6">
            <p className="text-lg font-semibold">
              Search Results for: <span className="text-primary">"{query}"</span>
            </p>
            <p className="text-gray-600">
              {pagination.total} product{pagination.total !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <Box className="flex justify-center items-center py-12">
              <CircularProgress />
            </Box>
          ) : products.length > 0 ? (
            <>
              <Grid container spacing={3} className="mb-8">
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {pagination.totalPages > 1 && (
                <PaginationControls
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              )}
            </>
          ) : (
            <Alert severity="info" className="my-8">
              No products found matching your search. Try different keywords.
            </Alert>
          )}
        </>
      )}

      {/* Empty State */}
      {!query.trim() && (
        <Alert severity="info" className="my-8">
          Enter a search query to find products
        </Alert>
      )}
    </Container>
  );
};
