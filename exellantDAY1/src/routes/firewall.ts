import { Router } from 'express';
import { FirewallController } from '../controllers/FirewallController';

const router = Router();

// Health check endpoint
router.get('/health', FirewallController.healthCheck);

// IP management endpoints
router.post('/ip', FirewallController.addIPs);
router.delete('/ip', FirewallController.removeIPs);

// URL management endpoints
router.post('/url', FirewallController.addURLs);
router.delete('/url', FirewallController.removeURLs);

// Port management endpoints
router.post('/port', FirewallController.addPorts);
router.delete('/port', FirewallController.removePorts);

// Rules management endpoints
router.get('/rules', FirewallController.getAllRules);
router.put('/rules', FirewallController.toggleRules);

export default router;
