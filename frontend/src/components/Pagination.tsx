import type { Pagination, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { PaginationData } from '../types';

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <Stack spacing={2} alignItems="center" className="my-6">
      <Pagination
        count={pagination.totalPages}
        page={pagination.page}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        size="large"
      />
      {onLimitChange && (
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Items per page</InputLabel>
          <Select
            value={pagination.limit}
            label="Items per page"
            onChange={(e) => onLimitChange(e.target.value as number)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      )}
      <p className="text-sm text-gray-600">
        Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
        {pagination.total} items
      </p>
    </Stack>
  );
};
