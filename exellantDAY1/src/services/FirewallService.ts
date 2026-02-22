import { FirewallRuleModel } from '../models/FirewallRule';
import { ValidationUtils } from '../utils/validation';
import { 
  AddRuleRequest, 
  RemoveRuleRequest, 
  ToggleRuleRequest,
  ApiResponse,
  RulesResponse,
  ToggleResponse
} from '../types';

export class FirewallService {
  /**
   * Add IP addresses to blacklist/whitelist
   */
  static async addIPs(request: AddRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate IP addresses
      const ipErrors = ValidationUtils.validateIPs(request.values);
      if (ipErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid IP addresses',
          data: ipErrors
        };
      }

      // Add rules to database
      const addedRules = await FirewallRuleModel.addRules('ip', request.values, request.mode);

      return {
        type: 'ip',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully added ${addedRules.length} IP rules`
      };
    } catch (error) {
      console.error('Error adding IPs:', error);
      return {
        status: 'error',
        message: 'Failed to add IP addresses'
      };
    }
  }

  /**
   * Remove IP addresses from blacklist/whitelist
   */
  static async removeIPs(request: RemoveRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate IP addresses
      const ipErrors = ValidationUtils.validateIPs(request.values);
      if (ipErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid IP addresses',
          data: ipErrors
        };
      }

      // Remove rules from database
      const removedCount = await FirewallRuleModel.removeRules('ip', request.values, request.mode);

      return {
        type: 'ip',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully removed ${removedCount} IP rules`
      };
    } catch (error) {
      console.error('Error removing IPs:', error);
      return {
        status: 'error',
        message: 'Failed to remove IP addresses'
      };
    }
  }

  /**
   * Add URLs to blacklist/whitelist
   */
  static async addURLs(request: AddRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate URLs
      const urlErrors = ValidationUtils.validateURLs(request.values);
      if (urlErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid URLs',
          data: urlErrors
        };
      }

      // Add rules to database
      const addedRules = await FirewallRuleModel.addRules('url', request.values, request.mode);

      return {
        type: 'url',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully added ${addedRules.length} URL rules`
      };
    } catch (error) {
      console.error('Error adding URLs:', error);
      return {
        status: 'error',
        message: 'Failed to add URLs'
      };
    }
  }

  /**
   * Remove URLs from blacklist/whitelist
   */
  static async removeURLs(request: RemoveRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate URLs
      const urlErrors = ValidationUtils.validateURLs(request.values);
      if (urlErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid URLs',
          data: urlErrors
        };
      }

      // Remove rules from database
      const removedCount = await FirewallRuleModel.removeRules('url', request.values, request.mode);

      return {
        type: 'url',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully removed ${removedCount} URL rules`
      };
    } catch (error) {
      console.error('Error removing URLs:', error);
      return {
        status: 'error',
        message: 'Failed to remove URLs'
      };
    }
  }

  /**
   * Add ports to blacklist/whitelist
   */
  static async addPorts(request: AddRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate ports
      const portErrors = ValidationUtils.validatePorts(request.values);
      if (portErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid ports',
          data: portErrors
        };
      }

      // Add rules to database
      const addedRules = await FirewallRuleModel.addRules('port', request.values, request.mode);

      return {
        type: 'port',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully added ${addedRules.length} port rules`
      };
    } catch (error) {
      console.error('Error adding ports:', error);
      return {
        status: 'error',
        message: 'Failed to add ports'
      };
    }
  }

  /**
   * Remove ports from blacklist/whitelist
   */
  static async removePorts(request: RemoveRuleRequest): Promise<ApiResponse> {
    try {
      // Validate request
      const validationErrors = ValidationUtils.validateRequestBody(request);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          data: validationErrors
        };
      }

      // Validate ports
      const portErrors = ValidationUtils.validatePorts(request.values);
      if (portErrors.length > 0) {
        return {
          status: 'error',
          message: 'Invalid ports',
          data: portErrors
        };
      }

      // Remove rules from database
      const removedCount = await FirewallRuleModel.removeRules('port', request.values, request.mode);

      return {
        type: 'port',
        mode: request.mode,
        values: request.values,
        status: 'success',
        message: `Successfully removed ${removedCount} port rules`
      };
    } catch (error) {
      console.error('Error removing ports:', error);
      return {
        status: 'error',
        message: 'Failed to remove ports'
      };
    }
  }

  /**
   * Get all firewall rules
   */
  static async getAllRules(): Promise<ApiResponse<RulesResponse>> {
    try {
      const rules = await FirewallRuleModel.getAllRules();
      
      return {
        status: 'success',
        data: rules
      };
    } catch (error) {
      console.error('Error fetching all rules:', error);
      return {
        status: 'error',
        message: 'Failed to fetch firewall rules'
      };
    }
  }

  /**
   * Toggle rule activation status
   */
  static async toggleRules(request: ToggleRuleRequest): Promise<ApiResponse<ToggleResponse>> {
    try {
      const updatedRules: Array<{ id: number; value: string | number; active: boolean }> = [];

      // Handle IP rules
      if (request.ips) {
        const { ids, mode, active } = request.ips;
        const rules = await FirewallRuleModel.toggleRules('ip', ids, mode, active);
        updatedRules.push(...rules.map(rule => ({
          id: rule.id,
          value: rule.value,
          active: rule.active
        })));
      }

      // Handle URL rules
      if (request.urls) {
        const { ids, mode, active } = request.urls;
        const rules = await FirewallRuleModel.toggleRules('url', ids, mode, active);
        updatedRules.push(...rules.map(rule => ({
          id: rule.id,
          value: rule.value,
          active: rule.active
        })));
      }

      // Handle port rules
      if (request.ports) {
        const { ids, mode, active } = request.ports;
        const rules = await FirewallRuleModel.toggleRules('port', ids, mode, active);
        updatedRules.push(...rules.map(rule => ({
          id: rule.id,
          value: rule.type === 'port' ? parseInt(rule.value as string) : rule.value,
          active: rule.active
        })));
      }

      return {
        status: 'success',
        data: { updated: updatedRules }
      };
    } catch (error) {
      console.error('Error toggling rules:', error);
      return {
        status: 'error',
        message: 'Failed to toggle rule activation status'
      };
    }
  }
}
