

-----

````markdown
# 🌟 GitHub Search Bookmark

A web application built with **React** and **TypeScript** using **Vite** that allows users to **search GitHub repositories** and **save them as bookmarks**.

## 🚀 Live Demo

You can view the deployed application here: [**GitHub Search Bookmark App**](https://github-search-bookmark.netlify.app)

---

## 🛠️ Installation and Setup

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/BShankar2003/github-search-bookmark.git](https://github.com/BShankar2003/github-search-bookmark.git)
    cd github-search-bookmark
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or use yarn/pnpm if preferred
    ```

### Running the Application (Development)

To start the development server with **Hot Module Reloading (HMR)**:

```bash
npm run dev
````

The application will typically be available at `http://localhost:5173/`.

-----

## 📦 Build, Test, and Deployment

### Building for Production

To create an optimized production-ready build in the `dist/` directory:

```bash
npm run build
```

### Previewing the Build

To preview the production build locally:

```bash
npm run preview
```

### Testing

*(Add your actual testing framework command if you implemented tests)*

To run all unit and integration tests:

```bash
npm run test
```

### Deployment

This application is deployed using **Netlify** with the following configuration:

  * **Build command:** `npm run build`
  * **Publish directory:** `dist`

-----

## 💡 Project Write-up: Decisions, Trade-offs, and Next Steps

This section details the key architectural choices made during development.

### Key Technical Decisions

  * **Vite for Bundling:** Chosen for its **speed** in both cold starts and **Hot Module Replacement (HMR)**, providing an efficient development experience.
  * **TypeScript:** Used throughout the project to ensure **type safety**, especially when defining structures for GitHub API responses and internal state.
  * **Custom Hooks (`useDebouncedSearch`, `useBookmarks`):** Logic was encapsulated into hooks for separation of concerns and reusability. The debouncing hook specifically **throttles API calls** to improve performance and respect rate limits.

### Trade-offs

  * **State Management:** The project uses **React's built-in State and Context** instead of a dedicated state management library (like Redux or Zustand). This was a trade-off made to **reduce boilerplate and dependencies** for an application of this size.
  * **Styling:** Opted for **plain CSS/CSS modules** for simplicity and faster rendering, trading off the component-level dynamic styling capabilities of a CSS-in-JS solution.

### Possible Next Steps

  * **User Authentication:** Implement **OAuth** to allow users to save bookmarks linked to their GitHub accounts, persisting data beyond local browser storage.
  * **Advanced Filtering:** Add options to filter search results by criteria such as language, star count, or license type.
  * **Expanded Test Coverage:** Increase unit and integration test coverage across all components and custom hooks.

-----

## Template Information (Initial Setup)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

  - `@vitejs/plugin-react` uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
  - `@vitejs/plugin-react-swc` uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install `eslint-plugin-react-x` and `eslint-plugin-react-dom` for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
