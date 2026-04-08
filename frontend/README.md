# SuperLabs Frontend

A modern React + TypeScript + Vite frontend application for SuperLabs e-commerce platform. Features include product search, product details, and admin panel for product management.

## Features

- **Product Search**: Search products by name, brand, category, or tags with pagination
- **Product Details**: View detailed product information with images, specifications, and reviews
- **Admin Panel**: Manage products with create, read, update, and delete functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Material-UI Components**: Professional UI with Material-UI components
- **Tailwind CSS**: Utility-first CSS for styling

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Material Design Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductTable.tsx
│   ├── Pagination.tsx
│   └── index.ts
├── pages/              # Page components
│   ├── SearchPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── AdminPanel.tsx
│   └── index.ts
├── services/           # API service layer
│   └── productService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
├── index.css           # Global styles + Tailwind directives
└── App.css             # App-specific styles
```

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional, for API configuration):
```env
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## API Integration

The frontend expects a backend API running at `http://localhost:5000/api`. 

### API Endpoints Used

- `GET /api/products?q=query&page=1&limit=10` - Search products
- `GET /api/products/:id` - Get product details
- `GET /api/admin/products?page=1&limit=10` - Get all products (admin)
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

## Pages

### 1. Search Page (`/`)
- Search products with full-text search
- View products in a grid layout
- Pagination support
- Filter by various fields

### 2. Product Detail Page (`/product/:id`)
- View complete product information
- Display product images gallery
- Show specifications and attributes
- Review and rating information
- Add to cart and wishlist buttons

### 3. Admin Panel (`/admin`)
- View all products in a table
- Create new products
- Edit existing products
- Delete products
- Pagination and sorting

## Components

### SearchBar
Search input component with debouncing and loading states.

### ProductCard
Display product information in a card format with image, price, availability, and rating.

### ProductTable
Display products in a table format with actions for admin operations.

### PaginationControls
Pagination component with page navigation and items-per-page selection.

## Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Material-UI** for pre-built components
- **Custom CSS** for app-specific styles

## Color Scheme

- Primary: `#aa3bff` (Purple)
- Secondary: `#f4f3ec` (Light)
- Dark: `#08060d` (Dark)
- Light: `#fff` (White)
- Border: `#e5e4e7` (Light Gray)
- Text: `#6b6375` (Gray)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of product images
- Pagination for large datasets
- Component-level code splitting
- Optimized re-renders with React.memo

## Error Handling

The application includes comprehensive error handling for:
- API request failures
- Product not found scenarios
- Form validation errors
- Network timeouts

## Future Enhancements

- User authentication and authorization
- Shopping cart functionality
- Order management
- Product reviews and ratings
- Advanced filtering and sorting
- Wishlist management
- Payment integration

## Contributing

Please follow the existing code style and structure when contributing.

## License

This project is part of SuperLabs.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
