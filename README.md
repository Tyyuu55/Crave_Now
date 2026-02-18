<<<<<<< HEAD
## CraveLane – Food Ordering E‑commerce

CraveLane is a warm, street–food inspired food ordering web app built with **React + Vite + TailwindCSS**, using **json-server** as a mock backend.

### Tech stack
- **Frontend**: React 18, Vite, React Router v6, TailwindCSS, Framer Motion, Zustand, Axios, Lucide Icons
- **Mock backend**: json-server (`mock-server/db.json`)

### Project structure (frontend)
- `src/api` – Axios client and API modules (`auth`, `orders`, `restaurants`)
- `src/store` – Zustand stores for auth and cart (with `localStorage` persist)
- `src/components` – Navbar, cards, cart bar, layout helpers, footer
- `src/pages` – `Login`, `Signup`, `Home`, `Restaurant`, `Cart`

### Running locally
1. Install frontend dependencies:
   - `npm install`
2. Install and run json-server:
   - `cd mock-server`
   - `npm install`
   - `npm start` (serves on `http://localhost:5000`)
3. In another terminal, start the Vite dev server from the project root:
   - `npm run dev`

The frontend expects an environment variable for the API base URL:
- Create a `.env` file in the project root with:
  - `VITE_API_BASE_URL=http://localhost:5000`

### Deploying

#### 1. Deploy json-server to Render
- Push this repository to GitHub.
- On Render, create a **Web Service**:
  - Select the repo and set **Root Directory** to `mock-server`.
  - Build command: `npm install`
  - Start command: `npm start`
- After the service is live, note its public URL, e.g. `https://your-cravelane-mock.onrender.com`.

#### 2. Deploy frontend to Vercel
- From the same GitHub repo, create a new Vercel project:
  - Root directory: project root (where `vite.config.js` lives).
  - Build command: `npm run build`
  - Output directory: `dist`
- In Vercel **Environment Variables**, set:
  - `VITE_API_BASE_URL=https://your-cravelane-mock.onrender.com`
- Redeploy; the app will use the Render json-server in production.

### Auth & data flows
- **Auth**:
  - Signup: `POST /users` (stored in `users` collection).
  - Login: `GET /users?email=&password=` (mock auth, no hashing).
  - Logged-in user is stored in a persisted Zustand store.
- **Restaurants & menu**:
  - `GET /restaurants`
  - `GET /restaurants/:id`
  - `GET /menuItems?restaurantId=:id`
- **Orders**:
  - Cart items are written to `orders` via `POST /orders`.

You can tweak `mock-server/db.json` to add more restaurants, menu items, or demo users as needed.

=======
# Crave_Now
>>>>>>> e41b5464c0815c361cf6da2aa1ecd7e043215701
