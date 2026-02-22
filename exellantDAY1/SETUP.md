# Firewall Rules API - Setup Guide

This guide will help you set up the complete development environment for the Firewall Rules API project.

## Prerequisites

### 1. Install Node.js

**Windows:**
1. Download Node.js LTS from [https://nodejs.org/](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation: `node --version` and `npm --version`

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install PostgreSQL

**Windows:**
1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the postgres user
4. Add PostgreSQL to your PATH if not done automatically

**macOS:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Install pnpm (Recommended Package Manager)

```bash
npm install -g pnpm
```

## Project Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd firewall-rules-api

# Install dependencies
pnpm install
# or
npm install
```

### 2. Database Setup

1. **Create Database:**
```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create database
CREATE DATABASE firewall_rules;

# Exit psql
\q
```

2. **Run Database Schema:**
```bash
# Run the initialization script
psql -U postgres -d firewall_rules -f scripts/init-db.sql
```

### 3. Environment Configuration

1. **Copy environment file:**
```bash
cp env.example .env
```

2. **Edit .env file with your database credentials:**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=firewall_rules
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info
```

### 4. Build and Run

```bash
# Build the TypeScript project
pnpm build
# or
npm run build

# Start in development mode
pnpm dev
# or
npm run dev

# Start in production mode
pnpm start
# or
npm start
```

## Testing the API

Once the server is running, you can test the endpoints:

### 1. Health Check
```bash
curl http://localhost:3000/api/firewall/health
```

### 2. Add IP to Blacklist
```bash
curl -X POST http://localhost:3000/api/firewall/ip \
  -H "Content-Type: application/json" \
  -d '{"values": ["192.168.1.100"], "mode": "blacklist"}'
```

### 3. Add URL to Whitelist
```bash
curl -X POST http://localhost:3000/api/firewall/url \
  -H "Content-Type: application/json" \
  -d '{"values": ["trusted-site.com"], "mode": "whitelist"}'
```

### 4. Add Port to Blacklist
```bash
curl -X POST http://localhost:3000/api/firewall/port \
  -H "Content-Type: application/json" \
  -d '{"values": [22, 23], "mode": "blacklist"}'
```

### 5. Get All Rules
```bash
curl http://localhost:3000/api/firewall/rules
```

### 6. Toggle Rule Activation
```bash
curl -X PUT http://localhost:3000/api/firewall/rules \
  -H "Content-Type: application/json" \
  -d '{"ips": {"ids": [1], "mode": "blacklist", "active": false}}'
```

## Development Tools

### 1. Install DBeaver (Database GUI)

1. Download from [https://dbeaver.io/](https://dbeaver.io/)
2. Install and open DBeaver
3. Create new PostgreSQL connection:
   - Host: localhost
   - Port: 5432
   - Database: firewall_rules
   - Username: postgres
   - Password: your_password

### 2. Running Tests

```bash
# Run all tests
pnpm test
# or
npm test

# Run tests with coverage
pnpm test -- --coverage
```

### 3. Linting

```bash
# Check for linting issues
pnpm lint
# or
npm run lint

# Fix linting issues automatically
pnpm lint:fix
# or
npm run lint:fix
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change PORT in .env file
   - Or kill the process using the port

2. **Database connection failed:**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

3. **TypeScript compilation errors:**
   - Run `pnpm build` to see detailed errors
   - Check that all dependencies are installed

4. **Permission denied on database:**
   - Ensure postgres user has proper permissions
   - Check pg_hba.conf for authentication settings

### Getting Help

- Check the console output for error messages
- Verify all prerequisites are installed correctly
- Ensure environment variables are set properly
- Check database connection and permissions

## API Documentation

The API provides the following endpoints:

- `POST /api/firewall/ip` - Add IP addresses
- `DELETE /api/firewall/ip` - Remove IP addresses
- `POST /api/firewall/url` - Add URLs
- `DELETE /api/firewall/url` - Remove URLs
- `POST /api/firewall/port` - Add ports
- `DELETE /api/firewall/port` - Remove ports
- `GET /api/firewall/rules` - Get all rules
- `PUT /api/firewall/rules` - Toggle rule activation
- `GET /api/firewall/health` - Health check

For detailed API documentation, visit `http://localhost:3000` when the server is running.
