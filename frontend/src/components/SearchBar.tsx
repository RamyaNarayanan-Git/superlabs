import { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, Button, CircularProgress } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading = false }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <TextField
        value={query}
        onChange={handleInputChange}
        placeholder="Search products by name, brand, or category..."
        size="small"
        fullWidth
        variant="outlined"
        className="flex-1"
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !query.trim()}
        sx={{
          backgroundColor: '#aa3bff',
          '&:hover': {
            backgroundColor: '#8b2dcc',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
      </Button>
    </form>
  );
};
