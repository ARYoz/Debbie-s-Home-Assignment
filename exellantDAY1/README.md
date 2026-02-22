# Firewall Rules API

A RESTful API for managing firewall rules built with Node.js, TypeScript, Express, and PostgreSQL.

## Features

- Add/remove IP addresses to/from blacklist/whitelist
- Add/remove URLs to/from blacklist/whitelist  
- Add/remove ports to/from blacklist/whitelist
- Retrieve all firewall rules
- Toggle rule activation status
- Input validation for IPs, URLs, and ports
- PostgreSQL database persistence

## Prerequisites

- Node.js (LTS version recommended)
- PostgreSQL
- pnpm (recommended package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd firewall-rules-api
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your database credentials
```

4. Set up the database:
```bash
# Create database and run migrations
psql -U postgres -c "CREATE DATABASE firewall_rules;"
```

5. Build the project:
```bash
pnpm build
```

## Running the Application

### Development Mode
```bash
pnpm dev
```

### Production Mode
```bash
pnpm build
pnpm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Add IPs
- **POST** `/api/firewall/ip`
- **Body**: `{"values": ["1.1.1.1", "2.2.2.2"], "mode": "blacklist"}`

### Remove IPs
- **DELETE** `/api/firewall/ip`
- **Body**: `{"values": ["1.1.1.1", "2.2.2.2"], "mode": "blacklist"}`

### Add URLs
- **POST** `/api/firewall/url`
- **Body**: `{"values": ["example.com", "malware.net"], "mode": "blacklist"}`

### Remove URLs
- **DELETE** `/api/firewall/url`
- **Body**: `{"values": ["example.com", "malware.net"], "mode": "blacklist"}`

### Add Ports
- **POST** `/api/firewall/port`
- **Body**: `{"values": [22, 443], "mode": "blacklist"}`

### Remove Ports
- **DELETE** `/api/firewall/port`
- **Body**: `{"values": [22, 443], "mode": "blacklist"}`

### Get All Rules
- **GET** `/api/firewall/rules`

### Toggle Rule Activation
- **PUT** `/api/firewall/rules`
- **Body**: `{"ips": {"ids": [1, 2], "mode": "blacklist", "active": false}}`

## Database Schema

The application uses PostgreSQL with the following tables:
- `firewall_rules` - stores all firewall rules with type, value, mode, and active status

## Validation Rules

- **IP Addresses**: Must be valid IPv4 or IPv6 format
- **URLs**: Must be valid domain names
- **Ports**: Must be integers between 0-65535
- **Mode**: Must be either "blacklist" or "whitelist"

## Testing

```bash
pnpm test
```

## Linting

```bash
pnpm lint
pnpm lint:fix
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```
