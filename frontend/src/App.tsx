import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Button } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import { SearchPage, ProductDetailPage, AdminPanel } from './pages';
import './App.css';

function AppHeader() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#08060d', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <div className="flex items-center gap-2 flex-1">
          <Link to="/" className="no-underline">
            <Box className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <StorefrontIcon sx={{ color: '#aa3bff', fontSize: 28 }} />
              <span className="text-xl font-bold">SuperLabs</span>
            </Box>
          </Link>
        </div>

        <Box className="flex gap-3">
          <Button
            component={Link}
            to="/"
            startIcon={<SearchIcon />}
            sx={{
              color: '#08060d',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Search
          </Button>
          <Button
            component={Link}
            to="/admin"
            startIcon={<AdminPanelSettingsIcon />}
            sx={{
              color: '#08060d',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={
              <Container maxWidth="lg" className="py-12 text-center">
                <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
                <Button component={Link} to="/" variant="contained" sx={{ backgroundColor: '#aa3bff' }}>
                  Back to Home
                </Button>
              </Container>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
