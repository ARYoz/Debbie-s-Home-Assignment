import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';
import { DatabaseConfig } from '../types';

dotenv.config();

const dbConfig: DatabaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'firewall',
  user: 'postgres',
  password: '123456',
};

const poolConfig: PoolConfig = {
  ...dbConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(poolConfig);

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
