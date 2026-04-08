import axios from 'axios';
import type { Product, ApiResponse } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Search products
  search: async (query: string, page: number = 1, limit: number = 10) => {
    const response = await api.get<ApiResponse<Product[]>>('/products', {
      params: { q: query, page, limit },
    });
    return response.data;
  },

  // Get product by ID
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  // Get all products (admin)
  getAll: async (page: number = 1, limit: number = 10) => {
    const response = await api.get<ApiResponse<Product[]>>('/admin/products', {
      params: { page, limit },
    });
    return response.data;
  },

  // Create product (admin)
  create: async (product: Partial<Product>) => {
    const response = await api.post<ApiResponse<Product>>('/admin/products', product);
    return response.data;
  },

  // Update product (admin)
  update: async (id: string, product: Partial<Product>) => {
    const response = await api.put<ApiResponse<Product>>(
      `/admin/products/${id}`,
      product
    );
    return response.data;
  },

  // Delete product (admin)
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<Product>>(
      `/admin/products/${id}`
    );
    return response.data;
  },
};

export default api;
