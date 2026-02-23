# Debbie's Home Assignment

Cross-platform app (login + Delete Account) with NestJS backend.

---

## Requirements — Checklist

| Requirement | Location |
|-------------|----------|
| **App:** Login screen | `frontend/app/login.tsx` |
| **App:** After login → Home screen with "Delete Account" button | `frontend/app/home.tsx` |
| **Tech:** expo-router for navigation | `frontend/app/` (file-based routing) |
| **Tech:** NativeWind for styling | `className` in `frontend/app/*.tsx`, `frontend/components/Button.tsx` |
| **Tech:** class-variance-authority (cva) | `frontend/components/Button.tsx` (variants: primary, danger) |
| **App:** Expo Dev Client (not Expo Go) | `frontend/package.json` — `expo-dev-client`, `frontend/eas.json` |
| **Backend:** NestJS, TypeScript | `backend/` |
| **Backend:** User login | `POST /auth/login` |
| **Backend:** Delete user | `DELETE /users/me` |
| **Tests:** Backend | `backend/` — `npm test` |
| **Tests:** Frontend | `frontend/` — `npm test` |

---

## How to run — Step by step

### 1. Backend

Open a terminal:

```bash
cd backend
```

Create a `.env` file (once):

- **Windows:**  
  `copy .env.example .env`
- **Mac/Linux:**  
  `cp .env.example .env`

Install and run:

```bash
npm install
npm run start:dev
```

If everything is OK you should see:

- `Backend running at http://localhost:3000`
- `Seeded demo user: demo@example.com / demo123`

Demo user: **demo@example.com** / **demo123**.

---

### 2. Frontend (browser check — simplest)

Open a **second terminal** (keep the backend running in the first):

```bash
cd frontend
```

Create `.env` (once):

- **Windows:**  
  `copy .env.example .env`
- **Mac/Linux:**  
  `cp .env.example .env`

In `.env`, ensure you have (for web testing):

```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Install and run:

```bash
npm install
npx expo start --web
```

A browser will open with the app. Verify:

1. **Login** screen appears — enter **demo@example.com** / **demo123** and tap Sign in.
2. You are taken to **Home** with the **Delete Account** button.
3. Tap Delete Account → confirm → you return to Login.

---

### 3. Running tests

**Backend:**

```bash
cd backend
npm test
```

**Frontend:**

```bash
cd frontend
npm test
```

Both should pass (all tests green).

---

## Command summary (copy-paste)

```text
# Terminal 1 — Backend
cd backend
copy .env.example .env
npm install
npm run start:dev

# Terminal 2 — Frontend (after backend is running)
cd frontend
copy .env.example .env
npm install
npx expo start --web
```

For tests: `cd backend` → `npm test`; `cd frontend` → `npm test`.

---

## iOS / Android (Expo Dev Client)

To run on a simulator or device with **Expo Dev Client** (not Expo Go):

```bash
cd frontend
npx expo run:ios
# or
npx expo run:android
```

**Make the terminal QR work when you scan it on the phone:** The terminal QR uses a link like `exp+debbie-home-assignment://...`. The **browser** cannot open it (you get ERR_UNKNOWN_URL_SCHEME). Only the **Expo Dev Client app** can. Do this once: (1) Build the app so it registers for that link: `cd frontend` then `npx eas build --platform android --profile preview`. (2) Install the new APK on the phone (open the EAS build page on the phone and install). (3) When you first scan the terminal QR and tap the link, if Android asks “Open with”, choose **Debbie Home Assignment** and tap **Always**. After that, scanning the terminal QR and tapping will open the app on the phone. In `frontend/.env` set `REACT_NATIVE_PACKAGER_HOSTNAME` and `EXPO_PUBLIC_API_URL` to your PC IP (e.g. `10.0.0.3`) so the app can reach Metro and the backend. For login from the phone: same Wi‑Fi; see `scripts/README-firewall.md` if the phone cannot reach the backend.

In the frontend `.env`, set the backend URL to your machine’s IP, e.g.:

`EXPO_PUBLIC_API_URL=http://192.168.1.XX:3000`

(Replace with your machine’s actual IP on the network.)
