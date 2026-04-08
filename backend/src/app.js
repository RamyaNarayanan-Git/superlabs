import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import errorHandler from './middleware/errorHandler.js';


const app = express();

// ── Security & Parsing ─────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// ── Rate Limiting ──────────────────────────────────────────────
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      100,
  message:  { status: 'error', message: 'Too many requests' }
}));

// ── Swagger Docs ───────────────────────────────────────────────
app.use('/api/docs', serve, setup(swaggerSpec));

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/admin/products', adminRoutes);

// ── Health Check ───────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 Handler ────────────────────────────────────────────────
// app.all('*', (req, res) => {
//   res.status(404).json({
//     status:  'error',
//     message: `Route ${req.originalUrl} not found`
//   });
// });

// ── Global Error Handler ───────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs at http://localhost:${PORT}/api/docs`);
});

export default app;