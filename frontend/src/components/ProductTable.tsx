import type { Product } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ProductTableProps {
  products: Product[];
  loading?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading = false,
  onEdit,
  onDelete,
  onView,
}) => {
  if (loading) {
    return (
      <Box className="flex justify-center items-center py-8">
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box className="text-center py-8 text-gray-500">
        No products found
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="rounded-lg shadow-md">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableCell className="font-bold">SKU</TableCell>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Category</TableCell>
            <TableCell className="font-bold">Brand</TableCell>
            <TableCell align="right" className="font-bold">
              Price
            </TableCell>
            <TableCell align="center" className="font-bold">
              Stock
            </TableCell>
            <TableCell align="center" className="font-bold">
              Status
            </TableCell>
            <TableCell align="center" className="font-bold">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50">
              <TableCell>{product.sku}</TableCell>
              <TableCell className="max-w-xs truncate">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell align="right" className="font-semibold">
                ${Number(product.price).toFixed(2)}
              </TableCell>
              <TableCell align="center">{product.stock}</TableCell>
              <TableCell align="center">
                <Chip
                  label={product.availability ? 'Available' : 'Out of Stock'}
                  color={product.availability ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center gap-1">
                  {onView && (
                    <IconButton
                      size="small"
                      onClick={() => onView(product.id)}
                      color="info"
                      title="View"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  )}
                  {onEdit && (
                    <IconButton
                      size="small"
                      onClick={() => onEdit(product)}
                      color="warning"
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton
                      size="small"
                      onClick={() =>
                        window.confirm('Are you sure?') && onDelete(product.id)
                      }
                      color="error"
                      title="Delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
