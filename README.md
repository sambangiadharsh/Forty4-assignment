## React User Dashboard (Forty4 Assignment)

This is a small **User Dashboard** React app built for the React Frontend Intern assignment.

It uses:

- **React (functional components + hooks)**
- **Vite**
- **React Router DOM (v6)**
- **React Context** for global user state
- **Tailwind CSS v4** (no custom CSS files)
- **Fetch API** (no Axios)

### Features

- **Dashboard page**
  - Fetches users from `https://jsonplaceholder.typicode.com/users`
  - Displays **name, email, phone, and company** in a responsive card layout
  - **Search/filter** by user name
  - **Create New User** form (client-side only, adds to context state)
  - Users are stored **globally in React Context**
- **User Details page**
  - Routing via **react-router-dom**
  - Click a user card to open details
  - Shows **full details** including address and **geo-location (lat/lng)**
- **Responsive design**
  - Mobile-first layout using **Tailwind utility classes**

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Run the development server

```bash
npm run dev
```

Then open the printed URL in your browser (usually `http://localhost:5173`).

#### 3. Build for production

```bash
npm run build
```

### Project Structure

- `src/main.jsx` – React entry, wraps `App` and imports Tailwind styles.
- `src/App.jsx` – Defines routing and global layout.
- `src/context/UserContext.jsx` – Fetches users, exposes `users`, `loading`, `error`, and `addUser`.
- `src/pages/Dashboard.jsx` – Main dashboard with user list, search, and create-user form.
- `src/pages/UserDetails.jsx` – Detail view for a single user, including address and geo-location.
- `src/components/UserCard.jsx` – Card component used in the dashboard grid.
- `src/index.css` – Tailwind CSS directives (`@tailwind base; @tailwind components; @tailwind utilities;`).

### Tailwind CSS Setup

This project uses **Tailwind CSS v4** with Vite:

- `tailwind.config.js` points `content` to `index.html` and all `src/**/*.{js,jsx,ts,tsx}` files.
- `postcss.config.js` uses:

```js
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwind(), autoprefixer()],
}
```

- `src/index.css` only includes Tailwind layers:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

No custom CSS files are used for styling; all UI design is implemented via Tailwind utility classes.

### Screenshots

Add your own screenshots here after running the app:

- `screenshots/dashboard.png` – Dashboard page with user list and create form.
- `screenshots/user-details.png` – User details page with address and geo-location.

### Notes

- New users created from the form are **only stored on the client** (in React Context) and are not persisted to a backend.

