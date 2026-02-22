-- Firewall Rules Database Initialization Script
-- Run this script to set up the database schema

-- Create database if it doesn't exist (run this as superuser)
-- CREATE DATABASE firewall_rules;

-- Connect to the firewall_rules database
-- \c firewall_rules;

-- Create firewall_rules table
CREATE TABLE IF NOT EXISTS firewall_rules (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('ip', 'url', 'port')),
    value VARCHAR(255) NOT NULL,
    mode VARCHAR(10) NOT NULL CHECK (mode IN ('blacklist', 'whitelist')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_firewall_rules_type_mode ON firewall_rules(type, mode);
CREATE INDEX IF NOT EXISTS idx_firewall_rules_value ON firewall_rules(value);
CREATE INDEX IF NOT EXISTS idx_firewall_rules_active ON firewall_rules(active);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_firewall_rules_updated_at ON firewall_rules;
CREATE TRIGGER update_firewall_rules_updated_at
    BEFORE UPDATE ON firewall_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO firewall_rules (type, value, mode, active) VALUES
    ('ip', '192.168.1.100', 'blacklist', true),
    ('ip', '10.0.0.1', 'whitelist', true),
    ('url', 'malware.com', 'blacklist', true),
    ('url', 'trusted-site.com', 'whitelist', true),
    ('port', '22', 'blacklist', true),
    ('port', '443', 'whitelist', true)
ON CONFLICT DO NOTHING;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON TABLE firewall_rules TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE firewall_rules_id_seq TO your_app_user;
