import { pool } from '../config/database';
import { FirewallRule, RuleType, RuleMode } from '../types';

export class FirewallRuleModel {
  /**
   * Initialize database table
   */
  static async initializeTable(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS firewall_rules (
        id SERIAL PRIMARY KEY,
        type VARCHAR(10) NOT NULL CHECK (type IN ('ip', 'url', 'port')),
        value VARCHAR(255) NOT NULL,
        mode VARCHAR(10) NOT NULL CHECK (mode IN ('blacklist', 'whitelist')),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_firewall_rules_type_mode ON firewall_rules(type, mode);
      CREATE INDEX IF NOT EXISTS idx_firewall_rules_value ON firewall_rules(value);
    `;

    try {
      await pool.query(createTableQuery);
      console.log('Firewall rules table initialized successfully');
    } catch (error) {
      console.error('Error initializing firewall rules table:', error);
      throw error;
    }
  }

  /**
   * Add multiple rules
   */
  static async addRules(type: RuleType, values: (string | number)[], mode: RuleMode): Promise<FirewallRule[]> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const rules: FirewallRule[] = [];
      
      for (const value of values) {
        // Check if rule already exists
        const existingRule = await client.query(
          'SELECT * FROM firewall_rules WHERE type = $1 AND value = $2 AND mode = $3',
          [type, value.toString(), mode]
        );

        if (existingRule.rows.length === 0) {
          const result = await client.query(
            'INSERT INTO firewall_rules (type, value, mode) VALUES ($1, $2, $3) RETURNING *',
            [type, value.toString(), mode]
          );
          rules.push(result.rows[0]);
        }
      }
      
      await client.query('COMMIT');
      return rules;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Remove multiple rules
   */
  static async removeRules(type: RuleType, values: (string | number)[], mode: RuleMode): Promise<number> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      let deletedCount = 0;
      
      for (const value of values) {
        const result = await client.query(
          'DELETE FROM firewall_rules WHERE type = $1 AND value = $2 AND mode = $3',
          [type, value.toString(), mode]
        );
        deletedCount += result.rowCount || 0;
      }
      
      await client.query('COMMIT');
      return deletedCount;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all rules grouped by type and mode
   */
  static async getAllRules(): Promise<any> {
    const query = `
      SELECT id, type, value, mode, active 
      FROM firewall_rules 
      ORDER BY type, mode, id
    `;

    try {
      const result = await pool.query(query);
      
      const rules: any = {
        ips: { blacklist: [], whitelist: [] },
        urls: { blacklist: [], whitelist: [] },
        ports: { blacklist: [], whitelist: [] }
      };

      result.rows.forEach((row) => {
        const rule = {
          id: row.id,
          value: row.type === 'port' ? parseInt(row.value) : row.value
        };

        if (row.type === 'ip') {
          rules.ips[row.mode as RuleMode].push(rule);
        } else if (row.type === 'url') {
          rules.urls[row.mode as RuleMode].push(rule);
        } else if (row.type === 'port') {
          rules.ports[row.mode as RuleMode].push(rule);
        }
      });

      return rules;
    } catch (error) {
      console.error('Error fetching all rules:', error);
      throw error;
    }
  }

  /**
   * Toggle rule activation status
   */
  static async toggleRules(type: RuleType, ids: number[], mode: RuleMode, active: boolean): Promise<FirewallRule[]> {
    const query = `
      UPDATE firewall_rules 
      SET active = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ANY($2) AND type = $3 AND mode = $4 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [active, ids, type, mode]);
      return result.rows;
    } catch (error) {
      console.error('Error toggling rules:', error);
      throw error;
    }
  }

  /**
   * Get rule by ID
   */
  static async getRuleById(id: number): Promise<FirewallRule | null> {
    const query = 'SELECT * FROM firewall_rules WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching rule by ID:', error);
      throw error;
    }
  }

  /**
   * Check if rule exists
   */
  static async ruleExists(type: RuleType, value: string | number, mode: RuleMode): Promise<boolean> {
    const query = 'SELECT COUNT(*) FROM firewall_rules WHERE type = $1 AND value = $2 AND mode = $3';
    
    try {
      const result = await pool.query(query, [type, value.toString(), mode]);
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      console.error('Error checking if rule exists:', error);
      throw error;
    }
  }
}
