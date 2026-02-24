# Debbie's Home Assignment

Cross-platform app (iOS, Android, Web) with **login** and **Delete Account**, backed by a NestJS API.  
Built with **Expo**, **expo-router**, **NativeWind**, and **NestJS**.

---

## See the app

### Android (pre-built)

**[Download Android build (APK)](https://expo.dev/accounts/aryoz/projects/debbie-home-assignment/builds/c3db646d-bf09-4d3b-b4df-0153)**

Open the link on your phone or computer and install.  
*For login and Delete Account to work, run the backend locally (see below) or point the app to a deployed API.*

*iOS build: to be added.*

---

## Run locally (backend + frontend)

Dependencies are not included in the repo (e.g. when you download a zip). Run `npm install` in both **backend** and **frontend** before running the app — see steps below.

### 1. Backend

```bash
cd backend
npm install
npm run start
```

Server runs at **http://localhost:3000**.  
Demo user: **demo@example.com** / **demo123**.

### 2. Frontend

In a **new terminal** (with backend still running):

```bash
cd frontend
npm install
npm run start
```

- Press **w** for web, or scan the QR code on a device.
- Sign in with **demo@example.com** / **demo123**.
- Use the Home screen and **Delete Account**.

### 3. Environment (`.env`)

You need a `.env` file in **backend** and in **frontend**. If the repo has existing `.env` files (e.g. with another IP), create your own or edit them.

- **Backend** (`backend/.env`): set port/DB as needed. Default runs at `http://localhost:3000`.
- **Frontend** (`frontend/.env`): set `EXPO_PUBLIC_API_URL` to where the backend is reachable:
  - **Web (browser on this computer):** use `http://localhost:3000` — the browser runs on your machine, so localhost is correct.
  - **Physical device (phone/tablet):** use your computer’s IP on the local network (e.g. `http://192.168.0.10:3000`) so the device can reach the backend. Find the IP in your OS network settings.

### 4. Tests

- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

---

## Tech stack

| Layer   | Stack |
|---------|--------|
| App     | Expo (Dev Client), expo-router, NativeWind |
| Backend | NestJS, TypeScript, TypeORM, SQLite |
| Auth    | Login (email + password); Delete account (email only) |

**API:** `POST /auth/login`, `POST /users/delete`.

---

## Project structure

- **`frontend/`** — Expo app: `app/` (routes), `lib/` (API & auth), `components/`
- **`backend/`** — NestJS: controllers, services, SQLite under `data/`

Demo user: **demo@example.com** / **demo123**.
