import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { FirewallRuleModel } from './models/FirewallRule';
import firewallRoutes from './routes/firewall';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((_req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${_req.method} ${_req.path}`);
  next();
});

// API routes
app.use('/api/firewall', firewallRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Firewall Rules API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/firewall/health',
      addIPs: 'POST /api/firewall/ip',
      removeIPs: 'DELETE /api/firewall/ip',
      addURLs: 'POST /api/firewall/url',
      removeURLs: 'DELETE /api/firewall/url',
      addPorts: 'POST /api/firewall/port',
      removePorts: 'DELETE /api/firewall/port',
      getAllRules: 'GET /api/firewall/rules',
      toggleRules: 'PUT /api/firewall/rules'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
async function startServer(): Promise<void> {
  try {
    // Initialize database table
    await FirewallRuleModel.initializeTable();
    console.log('Database initialized successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Firewall Rules API server running on port ${PORT}`);
      console.log(`📖 API Documentation available at http://localhost:${PORT}`);
      console.log(`🏥 Health check available at http://localhost:${PORT}/api/firewall/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();
