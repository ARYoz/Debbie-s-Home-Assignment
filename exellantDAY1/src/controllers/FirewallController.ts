import { Request, Response } from 'express';
import { FirewallService } from '../services/FirewallService';
import { AddRuleRequest, RemoveRuleRequest, ToggleRuleRequest } from '../types';

export class FirewallController {
  /**
   * Add IP addresses to blacklist/whitelist
   */
  static async addIPs(req: Request, res: Response): Promise<void> {
    try {
      const request: AddRuleRequest = req.body;
      const result = await FirewallService.addIPs(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - addIPs:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Remove IP addresses from blacklist/whitelist
   */
  static async removeIPs(req: Request, res: Response): Promise<void> {
    try {
      const request: RemoveRuleRequest = req.body;
      const result = await FirewallService.removeIPs(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - removeIPs:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Add URLs to blacklist/whitelist
   */
  static async addURLs(req: Request, res: Response): Promise<void> {
    try {
      const request: AddRuleRequest = req.body;
      const result = await FirewallService.addURLs(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - addURLs:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Remove URLs from blacklist/whitelist
   */
  static async removeURLs(req: Request, res: Response): Promise<void> {
    try {
      const request: RemoveRuleRequest = req.body;
      const result = await FirewallService.removeURLs(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - removeURLs:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Add ports to blacklist/whitelist
   */
  static async addPorts(req: Request, res: Response): Promise<void> {
    try {
      const request: AddRuleRequest = req.body;
      const result = await FirewallService.addPorts(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - addPorts:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Remove ports from blacklist/whitelist
   */
  static async removePorts(req: Request, res: Response): Promise<void> {
    try {
      const request: RemoveRuleRequest = req.body;
      const result = await FirewallService.removePorts(request);
      
      if (result.status === 'success') {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - removePorts:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get all firewall rules
   */
  static async getAllRules(_req: Request, res: Response): Promise<void> {
    try {
      const result = await FirewallService.getAllRules();
      
      if (result.status === 'success') {
        res.status(200).json(result.data);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - getAllRules:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Toggle rule activation status
   */
  static async toggleRules(req: Request, res: Response): Promise<void> {
    try {
      const request: ToggleRuleRequest = req.body;
      const result = await FirewallService.toggleRules(request);
      
      if (result.status === 'success') {
        res.status(200).json(result.data);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Controller error - toggleRules:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Health check endpoint
   */
  static async healthCheck(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'success',
      message: 'Firewall API is running',
      timestamp: new Date().toISOString()
    });
  }
}
