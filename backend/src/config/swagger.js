import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'Product Listing API',
      version:     '1.0.0',
      description: 'eCommerce Product Service API Documentation',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development' },
      { url: process.env.PROD_URL,    description: 'Production'  }
    ],
    tags: [
      { name: 'Products', description: 'Public product endpoints' },
      { name: 'Admin',    description: 'Admin product management' }
    ]
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJsdoc(options);