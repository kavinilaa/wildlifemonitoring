# WildLumina Frontend

React + Vite frontend for the WildLumina AI Wildlife Monitoring System.

## Tech Stack
- React 18, Vite 5
- Material UI 5, Framer Motion
- Recharts, Axios, React Router DOM 6

## Setup & Run

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

## Demo Login Credentials

| Role             | Login ID  | Password    |
|------------------|-----------|-------------|
| System Admin     | ADMIN001  | password123 |
| Forest Officer   | FO1001    | password123 |
| Researcher       | RES1001   | password123 |

## Environment

Edit `.env` to point to your Spring Boot backend:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

When the backend is offline, the app runs in **demo/mock mode** automatically.

## Build for Production

```bash
npm run build
```
