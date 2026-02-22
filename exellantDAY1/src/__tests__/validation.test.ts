import { ValidationUtils } from '../utils/validation';

describe('ValidationUtils', () => {
  describe('isValidIP', () => {
    it('should validate correct IPv4 addresses', () => {
      expect(ValidationUtils.isValidIP('192.168.1.1')).toBe(true);
      expect(ValidationUtils.isValidIP('10.0.0.1')).toBe(true);
      expect(ValidationUtils.isValidIP('172.16.0.1')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(ValidationUtils.isValidIP('256.1.2.3')).toBe(false);
      expect(ValidationUtils.isValidIP('1.2.3.256')).toBe(false);
      expect(ValidationUtils.isValidIP('192.168.1')).toBe(false);
      expect(ValidationUtils.isValidIP('192.168.1.1.1')).toBe(false);
    });

    it('should validate correct IPv6 addresses', () => {
      expect(ValidationUtils.isValidIP('2001:db8::1')).toBe(true);
      expect(ValidationUtils.isValidIP('::1')).toBe(true);
    });
  });

  describe('isValidURL', () => {
    it('should validate correct domain names', () => {
      expect(ValidationUtils.isValidURL('example.com')).toBe(true);
      expect(ValidationUtils.isValidURL('sub.example.com')).toBe(true);
      expect(ValidationUtils.isValidURL('test-domain.co.uk')).toBe(true);
    });

    it('should reject invalid domain names', () => {
      expect(ValidationUtils.isValidURL('')).toBe(false);
      expect(ValidationUtils.isValidURL('invalid domain')).toBe(false);
      expect(ValidationUtils.isValidURL('.example.com')).toBe(false);
      expect(ValidationUtils.isValidURL('example.')).toBe(false);
    });
  });

  describe('isValidPort', () => {
    it('should validate correct port numbers', () => {
      expect(ValidationUtils.isValidPort(80)).toBe(true);
      expect(ValidationUtils.isValidPort(443)).toBe(true);
      expect(ValidationUtils.isValidPort(0)).toBe(true);
      expect(ValidationUtils.isValidPort(65535)).toBe(true);
    });

    it('should reject invalid port numbers', () => {
      expect(ValidationUtils.isValidPort(-1)).toBe(false);
      expect(ValidationUtils.isValidPort(65536)).toBe(false);
      expect(ValidationUtils.isValidPort(1.5)).toBe(false);
    });
  });

  describe('isValidMode', () => {
    it('should validate correct modes', () => {
      expect(ValidationUtils.isValidMode('blacklist')).toBe(true);
      expect(ValidationUtils.isValidMode('whitelist')).toBe(true);
    });

    it('should reject invalid modes', () => {
      expect(ValidationUtils.isValidMode('blocklist')).toBe(false);
      expect(ValidationUtils.isValidMode('allowlist')).toBe(false);
      expect(ValidationUtils.isValidMode('')).toBe(false);
    });
  });
});
