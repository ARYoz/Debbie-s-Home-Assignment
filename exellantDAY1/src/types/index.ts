export type RuleType = 'ip' | 'url' | 'port';
export type RuleMode = 'blacklist' | 'whitelist';

export interface FirewallRule {
  id: number;
  type: RuleType;
  value: string | number;
  mode: RuleMode;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AddRuleRequest {
  values: (string | number)[];
  mode: RuleMode;
}

export interface RemoveRuleRequest {
  values: (string | number)[];
  mode: RuleMode;
}

export interface ToggleRuleRequest {
  ips?: {
    ids: number[];
    mode: RuleMode;
    active: boolean;
  };
  urls?: {
    ids: number[];
    mode: RuleMode;
    active: boolean;
  };
  ports?: {
    ids: number[];
    mode: RuleMode;
    active: boolean;
  };
}

export interface ApiResponse<T = any> {
  type?: RuleType;
  mode?: RuleMode;
  values?: (string | number)[];
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export interface RulesResponse {
  ips: {
    blacklist: Array<{ id: number; value: string }>;
    whitelist: Array<{ id: number; value: string }>;
  };
  urls: {
    blacklist: Array<{ id: number; value: string }>;
    whitelist: Array<{ id: number; value: string }>;
  };
  ports: {
    blacklist: Array<{ id: number; value: number }>;
    whitelist: Array<{ id: number; value: number }>;
  };
}

export interface ToggleResponse {
  updated: Array<{
    id: number;
    value: string | number;
    active: boolean;
  }>;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
