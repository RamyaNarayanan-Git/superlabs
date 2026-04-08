import React, { useState, useEffect } from 'react';
import { ProductTable, PaginationControls } from '../components';
import { productService } from '../services/productService';
import type { Product, PaginationData } from '../types';
import {
  Container,
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    brand: '',
    category: '',
    stock: '',
    availability: true,
    thumbnail: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.limit]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(
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
          : 'Failed to fetch products'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        sku: product.sku,
        brand: product.brand,
        category: product.category,
        stock: product.stock.toString(),
        availability: product.availability,
        thumbnail: product.thumbnail,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        sku: '',
        brand: '',
        category: '',
        stock: '',
        availability: true,
        thumbnail: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormError(null);
  };

  const handleSubmit = async () => {
    // Frontend validation
    if (!formData.name.trim()) {
      setFormError('Product name is required');
      return;
    }
    if (!formData.sku.trim()) {
      setFormError('SKU is required');
      return;
    }
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      setFormError('Price must be a valid positive number');
      return;
    }
    if (formData.stock && (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0)) {
      setFormError('Stock must be a valid non-negative integer');
      return;
    }

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, data);
        setFormError(null);
      } else {
        await productService.create(data);
      }

      handleCloseDialog();
      fetchProducts();
    } catch (err: any) {
      if (err.response?.status === 409) {
        setFormError(err.response.data.message || 'SKU already exists');
      } else if (err.response?.status === 400 && err.response.data.errors) {
        // Validation errors
        const validationErrors = err.response.data.errors
          .map((e: any) => `${e.field}: ${e.message}`)
          .join('; ');
        setFormError(`Validation errors: ${validationErrors}`);
      } else {
        setFormError(
          err instanceof Error ? err.message : 'Failed to save product'
        );
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      fetchProducts();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete product'
      );
    }
  };

  const handleView = (id: string) => {
    window.location.href = `/product/${id}`;
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage all products</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: '#aa3bff',
            '&:hover': { backgroundColor: '#8b2dcc' },
          }}
        >
          Add Product
        </Button>
      </div>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} className="mb-6">
          {error}
        </Alert>
      )}

      <Box className="bg-white rounded-lg shadow-md p-6">
        <ProductTable
          products={products}
          loading={loading}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          onView={handleView}
        />

        {!loading && pagination.totalPages > 1 && (
          <PaginationControls
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </Box>

      {/* Product Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent className="space-y-4 pt-4">
          {formError && (
            <Alert severity="error" onClose={() => setFormError(null)} className="mb-4">
              {formError}
            </Alert>
          )}
          <Stack spacing={2}>
            <TextField
              label="Product Name *"
              fullWidth
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <TextField
              label="SKU *"
              fullWidth
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              disabled={!!editingProduct}
            />
            <TextField
              label="Price *"
              type="number"
              fullWidth
              required
              // inputProps={{ min: 0, step: 0.01 }}
              slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
              
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <TextField
              label="Brand"
              fullWidth
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
            <TextField
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              // inputProps={{ min: 0, step: 1 }}
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            <TextField
              label="Thumbnail URL"
              fullWidth
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.availability}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: e.target.checked,
                    })
                  }
                />
              }
              label="Available"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#aa3bff',
              '&:hover': { backgroundColor: '#8b2dcc' },
            }}
          >
            {editingProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
