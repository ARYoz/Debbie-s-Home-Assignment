import { ValidationError } from '../types';

export class ValidationUtils {
  /**
   * Validates IPv4 address format
   */
  static isValidIPv4(ip: string): boolean {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  }

  /**
   * Validates IPv6 address format
   */
  static isValidIPv6(ip: string): boolean {
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv6Regex.test(ip);
  }

  /**
   * Validates IP address (IPv4 or IPv6)
   */
  static isValidIP(ip: string): boolean {
    return this.isValidIPv4(ip) || this.isValidIPv6(ip);
  }

  /**
   * Validates domain name format
   */
  static isValidURL(url: string): boolean {
    // Basic domain validation - allows subdomains and common TLDs
    const urlRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return urlRegex.test(url) && url.length <= 253;
  }

  /**
   * Validates port number (0-65535)
   */
  static isValidPort(port: number): boolean {
    return Number.isInteger(port) && port >= 0 && port <= 65535;
  }

  /**
   * Validates rule mode
   */
  static isValidMode(mode: string): boolean {
    return mode === 'blacklist' || mode === 'whitelist';
  }

  /**
   * Validates array of IP addresses
   */
  static validateIPs(values: (string | number)[]): ValidationError[] {
    const errors: ValidationError[] = [];
    
    values.forEach((value, index) => {
      if (typeof value !== 'string') {
        errors.push({
          field: `values[${index}]`,
          message: 'IP address must be a string'
        });
      } else if (!this.isValidIP(value)) {
        errors.push({
          field: `values[${index}]`,
          message: 'Invalid IP address format'
        });
      }
    });

    return errors;
  }

  /**
   * Validates array of URLs
   */
  static validateURLs(values: (string | number)[]): ValidationError[] {
    const errors: ValidationError[] = [];
    
    values.forEach((value, index) => {
      if (typeof value !== 'string') {
        errors.push({
          field: `values[${index}]`,
          message: 'URL must be a string'
        });
      } else if (!this.isValidURL(value)) {
        errors.push({
          field: `values[${index}]`,
          message: 'Invalid URL format'
        });
      }
    });

    return errors;
  }

  /**
   * Validates array of ports
   */
  static validatePorts(values: (string | number)[]): ValidationError[] {
    const errors: ValidationError[] = [];
    
    values.forEach((value, index) => {
      if (typeof value !== 'number') {
        errors.push({
          field: `values[${index}]`,
          message: 'Port must be a number'
        });
      } else if (!this.isValidPort(value)) {
        errors.push({
          field: `values[${index}]`,
          message: 'Port must be between 0 and 65535'
        });
      }
    });

    return errors;
  }

  /**
   * Validates request body structure
   */
  static validateRequestBody(body: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!body) {
      errors.push({
        field: 'body',
        message: 'Request body is required'
      });
      return errors;
    }

    if (!body.values || !Array.isArray(body.values)) {
      errors.push({
        field: 'values',
        message: 'Values must be an array'
      });
    }

    if (!body.mode || !this.isValidMode(body.mode)) {
      errors.push({
        field: 'mode',
        message: 'Mode must be either "blacklist" or "whitelist"'
      });
    }

    return errors;
  }
}
