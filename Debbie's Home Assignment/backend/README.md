# Backend (NestJS)

Minimal API: login and delete account.

## Setup

```bash
npm install
```

## Run

```bash
npm run start:dev
```

Runs at `http://localhost:3000`. On first run, a demo user is created:

- **Email:** demo@example.com  
- **Password:** demo123  

## API

- **POST /auth/login**  
  Body: `{ "email": "...", "password": "..." }`  
  Returns: `{ "access_token": "..." }`

- **DELETE /users/me**  
  Header: `Authorization: Bearer <access_token>`  
  Deletes the logged-in user. Returns: `{ "message": "Account deleted", "email": "..." }`

## Database

SQLite file: `data/local.sqlite` (created automatically). No separate database server.

## Tests

```bash
npm test
```
