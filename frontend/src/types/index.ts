export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  brand: string;
  category: string;
  stock: number;
  availability: boolean;
  thumbnail: string;
  images: string[];
  tags: string[];
  attributes: Record<string, any>;
  rating?: number;
  review_count?: number;
  created_at?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  pagination?: PaginationData;
}
