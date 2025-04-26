# reX Documentation

Generated on: 2025-04-01 09:16:13

## Overview

This documentation covers 78 files from the reX codebase.

## Table of Contents

### Root

- [postcss.config.js](#postcss-config-js)
- [tailwind.config.js](#tailwind-config-js)

### client

- [eslint.config.js](#client-eslint-config-js)
- [index.html](#client-index-html)
- [postcss.config.js](#client-postcss-config-js)
- [tailwind.config.js](#client-tailwind-config-js)
- [vite.config.ts](#client-vite-config-ts)

### client/src

- [App.tsx](#client-src-app-tsx)
- [index.css](#client-src-index-css)
- [main.tsx](#client-src-main-tsx)
- [vite-env.d.ts](#client-src-vite-env-d-ts)

### client/src/components

- [DarkModeToggle.tsx](#client-src-components-darkmodetoggle-tsx)
- [EmptyState.tsx](#client-src-components-emptystate-tsx)
- [ErrorBoundary.tsx](#client-src-components-errorboundary-tsx)
- [FloatingActionButton.tsx](#client-src-components-floatingactionbutton-tsx)
- [LoadingSpinner.tsx](#client-src-components-loadingspinner-tsx)
- [Logo.tsx](#client-src-components-logo-tsx)
- [Navbar.tsx](#client-src-components-navbar-tsx)
- [PageLayout.tsx](#client-src-components-pagelayout-tsx)
- [ProfileIcon.tsx](#client-src-components-profileicon-tsx)
- [ProtectedRoute.tsx](#client-src-components-protectedroute-tsx)
- [RedeemDialog.tsx](#client-src-components-redeemdialog-tsx)
- [RewardCard.tsx](#client-src-components-rewardcard-tsx)
- [SearchAndFilter.tsx](#client-src-components-searchandfilter-tsx)
- [Sidebar.tsx](#client-src-components-sidebar-tsx)
- [SkeletonLoader.tsx](#client-src-components-skeletonloader-tsx)
- [Toast.tsx](#client-src-components-toast-tsx)
- [TransactionHistory.tsx](#client-src-components-transactionhistory-tsx)
- [UserMenu.tsx](#client-src-components-usermenu-tsx)

### client/src/config

- [config.ts](#client-src-config-config-ts)

### client/src/context

- [AuthContext.tsx](#client-src-context-authcontext-tsx)
- [DarkModeContext.tsx](#client-src-context-darkmodecontext-tsx)

### client/src/pages

- [CreateReward.tsx](#client-src-pages-createreward-tsx)
- [Documentation.tsx](#client-src-pages-documentation-tsx)
- [EditReward.tsx](#client-src-pages-editreward-tsx)
- [Home.tsx](#client-src-pages-home-tsx)
- [MyRewards.tsx](#client-src-pages-myrewards-tsx)
- [NotFound.tsx](#client-src-pages-notfound-tsx)
- [Profile.tsx](#client-src-pages-profile-tsx)
- [Register.tsx](#client-src-pages-register-tsx)
- [RewardDetails.tsx](#client-src-pages-rewarddetails-tsx)
- [SignIn.tsx](#client-src-pages-signin-tsx)
- [TransactionHistory.tsx](#client-src-pages-transactionhistory-tsx)

### client/src/routes

- [index.tsx](#client-src-routes-index-tsx)

### client/src/services

- [api.ts](#client-src-services-api-ts)
- [auth.service.ts](#client-src-services-auth-service-ts)
- [mockData.ts](#client-src-services-mockdata-ts)

### client/src/types

- [User.ts](#client-src-types-user-ts)
- [transaction.ts](#client-src-types-transaction-ts)

### server/src

- [app.ts](#server-src-app-ts)
- [index.ts](#server-src-index-ts)

### server/src/config

- [config.ts](#server-src-config-config-ts)
- [jwt.config.ts](#server-src-config-jwt-config-ts)

### server/src/controllers

- [authController.ts](#server-src-controllers-authcontroller-ts)
- [requestController.ts](#server-src-controllers-requestcontroller-ts)
- [rewardController.ts](#server-src-controllers-rewardcontroller-ts)
- [transactionController.ts](#server-src-controllers-transactioncontroller-ts)

### server/src/middleware

- [auth.ts](#server-src-middleware-auth-ts)
- [errorHandler.ts](#server-src-middleware-errorhandler-ts)
- [rateLimiter.ts](#server-src-middleware-ratelimiter-ts)

### server/src/models

- [Request.ts](#server-src-models-request-ts)
- [User.ts](#server-src-models-user-ts)
- [category.model.ts](#server-src-models-category-model-ts)
- [reward.model.ts](#server-src-models-reward-model-ts)
- [rewardRedemption.model.ts](#server-src-models-rewardredemption-model-ts)
- [transaction.model.ts](#server-src-models-transaction-model-ts)
- [user.model.ts](#server-src-models-user-model-ts)

### server/src/routes

- [auth.routes.ts](#server-src-routes-auth-routes-ts)
- [category.routes.ts](#server-src-routes-category-routes-ts)
- [request.routes.ts](#server-src-routes-request-routes-ts)
- [requestRoutes.ts](#server-src-routes-requestroutes-ts)
- [rewardRoutes.ts](#server-src-routes-rewardroutes-ts)
- [transaction.routes.ts](#server-src-routes-transaction-routes-ts)

### server/src/scripts

- [addPointsToExistingUsers.ts](#server-src-scripts-addpointstoexistingusers-ts)

### server/src/services

- [logger.ts](#server-src-services-logger-ts)

### server/src/types

- [express.d.ts](#server-src-types-express-d-ts)

### server/src/validators

- [auth.validator.ts](#server-src-validators-auth-validator-ts)
- [reward.validator.ts](#server-src-validators-reward-validator-ts)

## File Documentation

### Root

<a id='postcss-config-js'></a>

#### postcss.config.js

*Path: postcss.config.js*

1. **Purpose:** This file configures PostCSS, a tool for transforming CSS with JavaScript plugins. It specifically integrates Tailwind CSS and Autoprefixer into the build process.

2. **Key Functionality:**

- **`module.exports`**:  Exports a configuration object for PostCSS.
    - **`plugins`**: An object specifying the PostCSS plugins to use.
        - **`tailwindcss`**:  An empty object, indicating the default Tailwind CSS configuration is used. This plugin generates utility classes based on the `tailwind.config.js` file.
        - **`autoprefixer`**: An empty object, indicating the default Autoprefixer configuration. This plugin automatically adds vendor prefixes to CSS rules, ensuring cross-browser compatibility.

3. **Dependencies and Relationships:**

- **Imports & Usage:** This file implicitly imports `tailwindcss` and `autoprefixer` npm packages.  Its configuration is used by any build process that integrates PostCSS (e.g., Webpack, Vite, Parcel).
- **Code Relationships:** This file works in conjunction with `tailwind.config.js` to define the styling framework for the project.  `tailwind.config.js` defines the design system (colors, fonts, etc.), while `postcss.config.js` ensures these styles are processed and optimized by PostCSS.

4. **Usage Example:**  This file is automatically used by the build process when PostCSS is invoked.

5. **Technical Notes:**  The order of plugins in the `plugins` object matters. Tailwind CSS should be applied before Autoprefixer to ensure vendor prefixes are added correctly to the generated utility classes.

---

<a id='tailwind-config-js'></a>

#### tailwind.config.js

*Path: tailwind.config.js*

1. **Purpose:** This file configures Tailwind CSS, a utility-first CSS framework, to generate styles based on the project's design requirements.

2. **Key Functionality:**

- **`module.exports`**: Exports the Tailwind CSS configuration object.
    - **`content`**: An array of file paths. Tailwind CSS scans these files to determine which classes are actually used in the project, optimizing the final CSS output by purging unused styles.  This reduces the size of the generated CSS.
    - **`theme`**:  An object for customizing the default Tailwind CSS theme.
        - **`extend`**: An empty object in this case.  This section is used to extend or override the default Tailwind configuration without completely replacing it.
    - **`plugins`**: An empty array. This allows for extending Tailwind CSS with custom plugins.

3. **Dependencies and Relationships:**

- **Imports & Usage:** This file is directly imported and used by the `tailwindcss` plugin defined in `postcss.config.js`.
- **Code Relationships:** This file defines the design system (colors, spacing, typography, etc.) that `postcss.config.js` uses to generate the corresponding CSS classes.  Changes to this file will affect the styling of the entire application.

4. **Usage Example:**  The configuration defined in this file is used during the build process when Tailwind CSS is invoked via PostCSS.

5. **Technical Notes:** The `content` array is crucial for production builds. It ensures that only the necessary CSS is generated, minimizing file size and improving performance.  The `purge` option (deprecated in newer versions and replaced by `content`) served a similar purpose in older versions of Tailwind CSS.  The `theme.extend` object allows for customizing the design system while maintaining consistency and leveraging the default Tailwind CSS settings.

---

### client

<a id='client-eslint-config-js'></a>

#### eslint.config.js

*Path: client/eslint.config.js*

1. **Purpose:** This file configures ESLint for the client-side code, enforcing coding style and best practices for JavaScript and TypeScript files. It integrates with various plugins to support React development.

2. **Key Functionality:**

- **`tseslint.config()`:** This function from the `typescript-eslint` package is used to create an ESLint configuration based on recommended settings for TypeScript.
    - **Parameters:**
        - An object with configuration overrides (e.g., `ignores`).
        - An object with ESLint configuration options.
    - **Return Type:** An ESLint configuration object.
    - **Implementation:** It merges the provided configuration with the recommended TypeScript settings, allowing customization.

- **Configuration Options:**
    - **`extends`:** Inherits configurations from `@eslint/js` recommended rules and `typescript-eslint` recommended rules.
    - **`files`:** Specifies the file patterns (`**/*.{ts,tsx}`) to which the rules apply.
    - **`languageOptions`:** Sets the ECMAScript version and global variables for the browser environment.
    - **`plugins`:** Includes plugins for React Hooks and React Refresh.
    - **`rules`:** Defines specific ESLint rules, including those from the included plugins.  `react-refresh/only-export-components` ensures only components are exported from files, improving performance.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `typescript-eslint`.
- **Code Relationships:** This file is used by ESLint to lint the client-side code during development and build processes.

4. **Usage Example:**  ESLint automatically uses this configuration file when linting files in the client directory.  It can be invoked via the command line or integrated into IDEs.

5. **Technical Notes:** This configuration enforces best practices for React development, including rules for hooks and efficient component exports. The use of shared configurations (`extends`) promotes consistency and reduces code duplication.

---

<a id='client-index-html'></a>

#### index.html

*Path: client/index.html*

1. **Purpose:** This file is the main HTML entry point for the client-side application. It sets up the basic structure of the HTML document and loads the JavaScript application.

2. **Key Functionality:**

- **`<head>`:** Contains metadata for the document, including character set, viewport settings, title, description, and links to external resources like fonts and the favicon.
- **`<body>`:** Contains the main content of the page.
    - **`<div id="root">`:** This is the container where the React application will be rendered.
    - **`<script type="module" src="/src/main.tsx"></script>`:** This script tag loads the main JavaScript file (`main.tsx`) which bootstraps the React application. The `type="module"` attribute indicates that the script should be treated as an ES module.

3. **Dependencies and Relationships:**

- **Code Relationships:** This file is the entry point for the client-side application. The `main.tsx` script it loads is responsible for rendering the React components into the `root` div.  It depends on the compiled output of the client code (typically in `dist`).

4. **Usage Example:** This file is loaded by the browser when a user accesses the application.

5. **Technical Notes:** The use of a dedicated `div` with the id "root" is a standard practice in React applications.  The preconnect links optimize loading performance by establishing early connections to font providers.

---

<a id='client-postcss-config-js'></a>

#### postcss.config.js

*Path: client/postcss.config.js*

1. **Purpose:** This file configures PostCSS, a tool for transforming CSS, to use Tailwind CSS and Autoprefixer.

2. **Key Functionality:**

- **`plugins`:** An object specifying the PostCSS plugins to use.
    - **`tailwindcss`:**  Processes Tailwind CSS directives and generates the corresponding CSS.
    - **`autoprefixer`:** Adds vendor prefixes to CSS rules, ensuring compatibility across different browsers.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `tailwindcss` and `autoprefixer` packages.
- **Code Relationships:** This configuration is used by build tools (like Vite) to process CSS files during the build process. It works in conjunction with `tailwind.config.js` to customize Tailwind.

4. **Usage Example:**  Build tools automatically use this configuration when processing CSS.

5. **Technical Notes:** PostCSS enhances CSS development workflows by enabling the use of powerful plugins like Tailwind CSS and Autoprefixer.

---

<a id='client-tailwind-config-js'></a>

#### tailwind.config.js

*Path: client/tailwind.config.js*

1. **Purpose:** This file configures Tailwind CSS, a utility-first CSS framework, to customize the design and styling of the application.

2. **Key Functionality:**

- **`content`:** Specifies the files to scan for Tailwind CSS class names, ensuring that only used styles are included in the final build.
- **`darkMode`:** Enables dark mode support, allowing styles to be toggled based on user preferences.  Set to 'class' meaning dark mode is enabled by adding a 'dark' class to the `html` element.
- **`theme`:** Customizes the default Tailwind CSS theme.
    - **`extend`:** Adds custom styles without overriding the default Tailwind configuration.
        - **`fontFamily`:** Defines custom font families.
        - **`colors`:** Defines custom color palettes.
        - `animation`: Defines custom animations, in this case a floating animation.
        - `keyframes`: Specifies the animation keyframes for the floating animation.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on the `tailwindcss` package.
- **Code Relationships:** This file is used by the `postcss.config.js` file to generate the final CSS.  It influences the styling of all components that use Tailwind classes.

4. **Usage Example:**  Tailwind classes are used directly in HTML and JSX files.  For example, `<div className="text-primary-500">` would apply the primary-500 color defined in this config.

5. **Technical Notes:** Customizing the `theme` allows for a consistent design language throughout the application.  The `content` array is crucial for optimizing build size by only including used styles.

---

<a id='client-vite-config-ts'></a>

#### vite.config.ts

*Path: client/vite.config.ts*

1. **Purpose:** This file configures Vite, a build tool and development server, for the client-side application.

2. **Key Functionality:**

- **`plugins`:** An array of Vite plugins.
    - **`react()`:** Enables React support in Vite.
- **`build`:** Configuration options for the build process.
    - **`outDir`:** Specifies the output directory for the built files (`dist`).
    - **`sourcemap`:** Disables source maps in the production build, reducing file size.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `vite` and `@vitejs/plugin-react`.
- **Code Relationships:** This file is used by Vite to build and serve the client-side application.  The output is used by `index.html`.

4. **Usage Example:**  Vite is typically invoked via the command line (e.g., `vite`, `vite build`).

5. **Technical Notes:** Vite provides a fast development experience with features like hot module replacement.  The `build` configuration optimizes the production build for performance.  Disabling sourcemaps reduces the size of the production build but makes debugging harder.


**Inter-file Relationships Summary:**

- `eslint.config.js` lints `*.ts` and `*.tsx` files, including `main.tsx`.
- `index.html` loads `main.tsx` which renders the React app.
- `postcss.config.js` uses `tailwind.config.js` to process CSS and uses Autoprefixer for browser compatibility.
- `tailwind.config.js` customizes the styling used in the application.
- `vite.config.ts` orchestrates the build process, using the other configuration files, and outputs to the `dist` directory, which is used by `index.html`.

---

### client/src

<a id='client-src-app-tsx'></a>

#### App.tsx

*Path: client/src/App.tsx*

1. **Purpose:** This file defines the main application structure and layout, including routing, context providers, and core UI components. It serves as the entry point for the client-side application.

2. **Key Functionality:**

- **`App` function:**
    - Parameters: None
    - Return type: `JSX.Element`
    - Implementation: Sets up the main application layout using React Router for navigation, `AuthProvider` for authentication context, `react-hot-toast` for notifications, and includes core components like `Navbar`, `Sidebar`, and `Footer`.  It renders `AppRoutes` within the main content area.
- **`Footer` function:**
    - Parameters: None
    - Return type: `JSX.Element`
    - Implementation: Renders the application's footer, including copyright information, social media links, and creator credits. Dynamically displays the current year.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `react-router-dom`: Used for client-side routing.
    - `react-hot-toast`: Used for displaying toast notifications.
    - `./context/AuthContext`: Provides authentication context to the application.
    - `./routes`: Defines the application's routes.
    - `./components/Navbar`: The application's navigation bar component.
    - `./components/Sidebar`: The application's sidebar component.
- **Code Relationships:**
    - `App` is the main component rendered by `client/src/main.tsx`.
    - `App` uses `AppRoutes` to manage routing and render different pages.
    - `App` uses `AuthProvider` to provide authentication context to its children.
    - `App` renders `Navbar`, `Sidebar`, and `Footer` as part of the main layout.

4. **Usage Example:**  This is the root component of the application, rendered by `main.tsx`.

5. **Technical Notes:**
    - The use of `AuthProvider` allows for consistent authentication management throughout the application.
    - `react-hot-toast` provides a user-friendly way to display notifications.
    - The layout structure with `Navbar` and `Sidebar` creates a common user interface for all pages.

---

<a id='client-src-index-css'></a>

#### index.css

*Path: client/src/index.css*

1. **Purpose:** This file defines the styling for the application using Tailwind CSS and custom styles for webkit scrollbars.

2. **Key Functionality:**

- **Tailwind Directives:**
    - `@tailwind base`: Includes Tailwind's base styles.
    - `@tailwind components`: Includes Tailwind's component styles.
    - `@tailwind utilities`: Includes Tailwind's utility classes.
- **Custom Scrollbar Styles:**
    - Styles the appearance of webkit scrollbars, including track, thumb, and hover states.
    - Provides a `no-scrollbar` class to hide scrollbars on specific elements.
    - Includes specific styles for dark mode scrollbars using `@media (prefers-color-scheme: dark)`.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - Tailwind CSS: Provides the base styling framework.
- **Code Relationships:**
    - This CSS file is imported in `client/src/main.tsx`, applying the styles globally to the application.

4. **Usage Example:**  The styles defined in this file are applied globally to the application.  The `no-scrollbar` class can be used on elements to hide the scrollbar, for example: `<div className="no-scrollbar">...</div>`.

5. **Technical Notes:**
    - Using Tailwind CSS provides a utility-first approach to styling, promoting consistency and maintainability.
    - Custom scrollbar styles enhance the user interface.
    - The `no-scrollbar` class provides flexibility for specific styling needs.

---

<a id='client-src-main-tsx'></a>

#### main.tsx

*Path: client/src/main.tsx*

1. **Purpose:** This file is the entry point for the React application. It renders the main `App` component into the root element of the HTML document.

2. **Key Functionality:**

- **`ReactDOM.createRoot().render()`:**
    - Parameters:  `document.getElementById('root')` - The root HTML element, and the JSX to render (`<App />` wrapped in `React.StrictMode`).
    - Return type: None
    - Implementation: Renders the `App` component into the DOM, making it visible in the browser.  `React.StrictMode` helps highlight potential problems in development.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `react`: The core React library.
    - `react-dom/client`: Provides methods for interacting with the DOM.
    - `./App`: The main application component.
    - `./index.css`: The main CSS file for styling.
    - `@vercel/analytics/react`: Vercel analytics for tracking usage data.
- **Code Relationships:**
    - This file renders the `App` component, which in turn renders other components and manages the application's structure.
    - Imports and applies the styles defined in `index.css`.

4. **Usage Example:** This file is the entry point, executed by the browser.

5. **Technical Notes:**
    - Using `createRoot` is the recommended way to render React 18 applications, providing better performance.
    - Importing `index.css` here ensures that the styles are applied globally.

---

<a id='client-src-vite-env-d-ts'></a>

#### vite-env.d.ts

*Path: client/src/vite-env.d.ts*

1. **Purpose:** This file provides TypeScript type definitions for Vite environment variables, allowing TypeScript to understand and work with them correctly.

2. **Key Functionality:**

- **`/// <reference types="vite/client" />`:**
    - This line imports the type definitions provided by Vite for client-side development.  This ensures that TypeScript recognizes Vite-specific environment variables like `import.meta.env`.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `vite/client`: Provides type definitions for Vite's client-side environment.
- **Code Relationships:** This file is used by the TypeScript compiler to understand Vite environment variables.

4. **Usage Example:**  This file doesn't contain executable code but is used by the TypeScript compiler during development.

5. **Technical Notes:** This file is essential for using Vite environment variables in a TypeScript project.  Without it, TypeScript would not recognize `import.meta.env` and would throw errors.


**Inter-file Relationships Summary:**

- `main.tsx` renders `App.tsx`.
- `App.tsx` uses components like `Navbar`, `Sidebar`, `Footer`, `AppRoutes`, and the `AuthContext`.
- `App.tsx` and `main.tsx` rely on styles from `index.css`.
- `main.tsx` imports `index.css` to apply styles globally.
- `vite-env.d.ts` provides type definitions for Vite environment variables used in other files.
- `App.tsx` uses `react-router-dom` for routing and navigation.
- `App.tsx` uses `react-hot-toast` for displaying notifications.


This documentation provides a clear and concise overview of the purpose, functionality, dependencies, and relationships between the provided files. It highlights key technical aspects and design choices, offering valuable insights into the codebase's structure and operation.

---

### client/src/components

<a id='client-src-components-darkmodetoggle-tsx'></a>

#### DarkModeToggle.tsx

*Path: client/src/components/DarkModeToggle.tsx*

1. **Purpose:** This component provides a toggle button for switching between light and dark modes. It utilizes the `DarkModeContext` to manage the application's theme.

2. **Key Functionality:**

- **`DarkModeToggle` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: This component uses the `useDarkMode` hook to access the `isDarkMode` state and the `toggleDarkMode` function from the `DarkModeContext`. The button's appearance changes based on the `isDarkMode` value, displaying either a sun or moon icon. The `motion` library provides smooth animations for the button and icon on hover and click.  The SVG icons are conditionally rendered based on the `isDarkMode` state.
    - Fallback Mechanisms: None explicitly defined, relies on React's error handling.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useDarkMode` from `../context/DarkModeContext`: Provides access to dark mode state and toggle functionality.
    - `motion` from `framer-motion`: Used for animation effects.
- **Code Relationships:** This component interacts with the `DarkModeContext` to control the application's theme.

4. **Usage Example:**

```tsx
<DarkModeToggle />
```

This component can be placed anywhere in the application where the dark mode toggle is needed.

5. **Technical Notes:** The use of `motion` enhances user experience with smooth transitions. The SVG icons are inline, simplifying asset management.

---

<a id='client-src-components-emptystate-tsx'></a>

#### EmptyState.tsx

*Path: client/src/components/EmptyState.tsx*

1. **Purpose:** This component displays a message and call to action when there are no rewards available. It encourages users to create or sign in.

2. **Key Functionality:**

- **`EmptyState` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation:  Renders a message indicating no rewards are available.  If the user is authenticated, it prompts them to create a reward; otherwise, it prompts them to sign in. Uses `useNavigate` to redirect the user based on their authentication status. `motion` is used for entrance animations.
    - Fallback Mechanisms: None explicitly defined.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useNavigate` from `react-router-dom`: For navigation.
    - `FiGift`, `FiPlus` from `react-icons/fi`: For icons.
    - `motion` from `framer-motion`: For animations.
    - `useAuth` from `../context/AuthContext`: For authentication status.
- **Code Relationships:** Interacts with the authentication context and routing.

4. **Usage Example:**  Used within components that display lists of rewards when the list is empty.

5. **Technical Notes:** The conditional rendering based on authentication status provides a tailored user experience.

---

<a id='client-src-components-errorboundary-tsx'></a>

#### ErrorBoundary.tsx

*Path: client/src/components/ErrorBoundary.tsx*

1. **Purpose:** This component acts as an error boundary, catching JavaScript errors during rendering, logging them, and displaying a fallback UI.

2. **Key Functionality:**

- **`ErrorBoundary` (class component):**
    - Props: `children` (ReactNode)
    - State: `hasError` (boolean)
    - Implementation: Uses `getDerivedStateFromError` to update state when an error occurs and `componentDidCatch` to log error details.  Renders a fallback UI with a "Refresh Page" button when an error is caught.
    - Fallback Mechanisms: Catches and handles rendering errors, preventing application crashes.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `React`, `Component`, `ErrorInfo`, `ReactNode` from `react`: Core React dependencies.
- **Code Relationships:** Wraps other components to provide error handling.

4. **Usage Example:**

```tsx
<ErrorBoundary>
    <PotentiallyErrorCausingComponent />
</ErrorBoundary>
```

5. **Technical Notes:**  Provides a robust mechanism for handling unexpected errors during rendering, improving application stability.

---

<a id='client-src-components-floatingactionbutton-tsx'></a>

#### FloatingActionButton.tsx

*Path: client/src/components/FloatingActionButton.tsx*

1. **Purpose:** This component renders a floating action button with an icon and label, commonly used for primary actions.

2. **Key Functionality:**

- **`FloatingActionButton` (functional component):**
    - Props: `onClick` (function), `Icon` (IconType), `label` (string)
    - Return Type: `JSX.Element`
    - Implementation: Renders a styled button with the provided icon and label. Uses `motion` for hover and tap animations.
    - Fallback Mechanisms: None explicitly defined.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `motion` from `framer-motion`: For animations.
    - `IconType` from `react-icons`: For icon types.
- **Code Relationships:**  Generally used within other components to trigger actions.

4. **Usage Example:**

```tsx
<FloatingActionButton onClick={handleCreateReward} Icon={FiPlus} label="Create Reward" />
```

5. **Technical Notes:** The use of `motion` provides visual feedback to the user.

---

<a id='client-src-components-loadingspinner-tsx'></a>

#### LoadingSpinner.tsx

*Path: client/src/components/LoadingSpinner.tsx*

1. **Purpose:** This component displays a simple loading spinner, typically used while waiting for data or asynchronous operations.

2. **Key Functionality:**

- **`LoadingSpinner` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: Renders a div with CSS animations to create a spinning effect.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:** None
- **Code Relationships:** Used within other components to indicate loading states.

4. **Usage Example:**

```tsx
<LoadingSpinner />
```

5. **Technical Notes:**  Provides a simple visual cue for loading states.

---

<a id='client-src-components-logo-tsx'></a>

#### Logo.tsx

*Path: client/src/components/Logo.tsx*

1. **Purpose:** This component renders the application's logo and links it to the home page.

2. **Key Functionality:**

- **`Logo` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: Renders an SVG logo with text "reX" styled with a gradient.  Uses `Link` from `react-router-dom` to navigate to the home page when clicked.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `Link` from `react-router-dom`: For navigation.
- **Code Relationships:** Used in the `Navbar` component.

4. **Usage Example:**

```tsx
<Logo />
```

5. **Technical Notes:** The SVG is inline, simplifying asset management.

---

<a id='client-src-components-navbar-tsx'></a>

#### Navbar.tsx

*Path: client/src/components/Navbar.tsx*

1. **Purpose:** This component renders the application's navigation bar, including the logo, navigation links, user menu, and authentication controls.

2. **Key Functionality:**

- **`Navbar` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: Renders the navigation bar with conditional rendering based on authentication status. Uses `useAuth` to access authentication information. Includes the `Logo`, navigation links, and `UserMenu` components.
    - Fallback Mechanisms: None explicitly defined.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `Link` from `react-router-dom`: For navigation.
    - `UserMenu` from `./UserMenu`: For the user menu dropdown.
    - `useAuth` from `../context/AuthContext`: For authentication status.
    - `FiBook` from `react-icons/fi`: For icons.
    - `Logo` from `./Logo`: For the application logo.
- **Code Relationships:** Uses the `AuthContext`, interacts with routing, and incorporates other components like `Logo` and `UserMenu`.

4. **Usage Example:**  Used as the main navigation component in the application layout.

5. **Technical Notes:** Conditional rendering provides a tailored user experience based on authentication status.

---

<a id='client-src-components-pagelayout-tsx'></a>

#### PageLayout.tsx

*Path: client/src/components/PageLayout.tsx*

1. **Purpose:** This component provides a consistent layout for pages, including a sidebar and main content area.

2. **Key Functionality:**

- **`PageLayout` (functional component):**
    - Props: `children` (ReactNode), `title` (string, optional), `action` (ReactNode, optional)
    - Return Type: `JSX.Element`
    - Implementation: Renders a layout with a sidebar and main content area.  Accepts `title` and `action` props to customize the page header.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `Sidebar` from `./Sidebar`: For the sidebar navigation.
- **Code Relationships:**  Wraps page content and provides a consistent structure.

4. **Usage Example:**

```tsx
<PageLayout title="My Rewards" action={<CreateRewardButton />}>
    {/* Page content */}
</PageLayout>
```

5. **Technical Notes:**  Provides a reusable layout structure for pages.

---

<a id='client-src-components-profileicon-tsx'></a>

#### ProfileIcon.tsx

*Path: client/src/components/ProfileIcon.tsx*

1. **Purpose:** This component displays a user's profile icon as their initials within a colored circle.

2. **Key Functionality:**

- **`ProfileIcon` (functional component):**
    - Props: `name` (string), `points` (number, optional)
    - Return Type: `JSX.Element`
    - Implementation: Extracts the user's initials from their name and displays them in a circular icon.  Links to the `/profile` route.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `Link` from `react-router-dom`: For navigation.
- **Code Relationships:** Used in the `Navbar` and potentially other components to display user profile information.

4. **Usage Example:**

```tsx
<ProfileIcon name="John Doe" />
```

5. **Technical Notes:** Provides a visual representation of the user's profile.

---

<a id='client-src-components-protectedroute-tsx'></a>

#### ProtectedRoute.tsx

*Path: client/src/components/ProtectedRoute.tsx*

1. **Purpose:** This component acts as a route guard, redirecting unauthenticated users to the login page.

2. **Key Functionality:**

- **`ProtectedRoute` (functional component):**
    - Props: `children` (ReactNode)
    - Return Type: `JSX.Element` or `Navigate` component
    - Implementation: Uses `useAuth` to check authentication status. If the user is not authenticated, it redirects to `/login`.
    - Fallback Mechanisms: Redirects to login if not authenticated.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `Navigate` from `react-router-dom`: For redirection.
    - `useAuth` from `../context/AuthContext`: For authentication status.
- **Code Relationships:** Used to wrap protected routes in the application's routing configuration.

4. **Usage Example:**

```tsx
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
```

5. **Technical Notes:**  Ensures that only authenticated users can access protected routes.

---

<a id='client-src-components-redeemdialog-tsx'></a>

#### RedeemDialog.tsx

*Path: client/src/components/RedeemDialog.tsx*

1. **Purpose:** This component presents a modal dialog for confirming reward redemption.

2. **Key Functionality:**

- **`RedeemDialog` (functional component):**
    - Props: `isOpen` (boolean), `onClose` (function), `onConfirm` (function), `points` (number), `isLoading` (boolean, optional)
    - Return Type: `JSX.Element`
    - Implementation: Renders a modal dialog with confirmation and cancel buttons.  Uses `AnimatePresence` and `motion` for smooth animations.  Handles loading state and displays a success message upon successful redemption.
    - Fallback Mechanisms: Handles potential errors during redemption and closes the dialog.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `motion`, `AnimatePresence` from `framer-motion`: For animations.
    - `useState` from `react`: For managing state.
- **Code Relationships:** Used by the `RewardCard` component to confirm reward redemption.

4. **Usage Example:** See `RewardCard` component for usage.

5. **Technical Notes:** The use of `AnimatePresence` and `motion` creates a polished user experience.  Handles loading and success states effectively.

---

<a id='client-src-components-rewardcard-tsx'></a>

#### RewardCard.tsx

*Path: client/src/components/RewardCard.tsx*

1. **Purpose:** This component displays a single reward card, including details like title, description, points, and redemption options.

2. **Key Functionality:**

- **`RewardCard` (functional component):**
    - Props: `reward` (object), `onUpdate` (function, optional)
    - Return Type: `JSX.Element`
    - Implementation: Renders a card displaying reward details.  Handles reward redemption logic, including authentication checks, point validation, and API calls. Uses the `RedeemDialog` component for confirmation.
    - Fallback Mechanisms: Handles errors during redemption, displays error messages using `toast`, and redirects to login or profile if necessary.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useState` from `react`: For managing state.
    - `useNavigate` from `react-router-dom`: For navigation.
    - `FiGift`, `FiInfo` from `react-icons/fi`: For icons.
    - `toast` from `react-hot-toast`: For displaying notifications.
    - `RedeemDialog` from `./RedeemDialog`: For the redemption confirmation dialog.
    - `useAuth` from `../context/AuthContext`: For authentication and user data.
    - `transactionApi` from `../services/api`: For making API calls.
- **Code Relationships:** Interacts with the authentication context, routing, API services, and uses the `RedeemDialog` component.

4. **Usage Example:** Used within components that display lists of rewards.

5. **Technical Notes:**  Handles complex redemption logic, including error handling and user feedback.

---

<a id='client-src-components-searchandfilter-tsx'></a>

#### SearchAndFilter.tsx

*Path: client/src/components/SearchAndFilter.tsx*

1. **Purpose:** This component provides search and filtering functionality for reward lists.

2. **Key Functionality:**

- **`SearchAndFilter` (functional component):**
    - Props: `onSearch` (function), `onSort` (function)
    - Return Type: `JSX.Element`
    - Implementation: Renders a search input and a sort dropdown. Calls the provided `onSearch` and `onSort` functions with the user's input.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useState` from `react`: For managing state.
- **Code Relationships:** Used within components that display lists of rewards to enable filtering and sorting.

4. **Usage Example:**  Used in components that display lists of rewards.

5. **Technical Notes:** Provides a user-friendly way to filter and sort reward lists.

---

<a id='client-src-components-sidebar-tsx'></a>

#### Sidebar.tsx

*Path: client/src/components/Sidebar.tsx*

1. **Purpose:** This component renders the application's sidebar navigation, providing links to different sections of the app.

2. **Key Functionality:**

- **`Sidebar` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: Renders a sidebar with navigation links using `NavLink` from `react-router-dom`.  Conditional rendering of links based on authentication status. Includes a logout button.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `FiHome`, `FiGift`, `FiUser`, `FiLogOut`, `FiList` from `react-icons/fi`: For icons.
    - `NavLink` from `react-router-dom`: For navigation.
    - `useAuth` from `../context/AuthContext`: For authentication status and logout functionality.
- **Code Relationships:** Interacts with the authentication context and routing.

4. **Usage Example:** Used as the main sidebar navigation component in the application layout.

5. **Technical Notes:** Conditional rendering provides a tailored navigation experience based on authentication status.

---

<a id='client-src-components-skeletonloader-tsx'></a>

#### SkeletonLoader.tsx

*Path: client/src/components/SkeletonLoader.tsx*

1. **Purpose:** This component displays a placeholder UI while content is loading, improving perceived performance.

2. **Key Functionality:**

- **`SkeletonLoader` (functional component):**
    - Parameters: None
    - Return Type: `JSX.Element`
    - Implementation: Renders gray blocks with a pulse animation to simulate loading content.
    - Fallback Mechanisms: None.

3. **Dependencies and Relationships:**

- **Imports & Usage:** None
- **Code Relationships:** Used within other components as a placeholder during data fetching.

4. **Usage Example:**

```tsx
<SkeletonLoader />
```

5. **Technical Notes:**  Provides a visual placeholder during loading states, enhancing user experience.


**Overall System Architecture and Relationships:**

The provided code snippets represent a typical React application structure with a focus on component reusability and separation of concerns.  The components work together to create a user interface for managing and redeeming rewards.

- **Context:** `AuthContext` and `DarkModeContext` manage application-wide state for authentication and theming, respectively.
- **Components:**  Components like `Navbar`, `Sidebar`, `PageLayout`, and `RewardCard` compose the user interface.
- **Routing:** `react-router-dom` handles navigation between different pages.
- **API Interaction:** `transactionApi` handles communication with the backend API for reward-related operations.
- **Styling:**  The code uses Tailwind CSS for styling and `framer-motion` for animations.
- **Error Handling:** `ErrorBoundary` provides a mechanism for catching and handling rendering errors.

This structure promotes maintainability and scalability by separating concerns into individual components and using context for shared state management.  The use of a consistent styling library and animation library further enhances the user experience.

---

<a id='client-src-components-toast-tsx'></a>

#### Toast.tsx

*Path: client/src/components/Toast.tsx*

1. **Purpose:** This file defines a reusable Toast component for displaying success or error messages to the user. It provides a visual feedback mechanism for various actions within the application.

2. **Key Functionality:**

- **`Toast` (functional component):**
    - **Parameters:**
        - `show`: (boolean) Controls the visibility of the toast.
        - `onClose`: (function) Callback function to close the toast.
        - `message`: (string) The message to display in the toast.
        - `action`: (object - optional) Defines an action button within the toast.  Contains `onClick` (function) and `label` (string).
    - **Return Type:** (JSX.Element | null) Renders the toast component or null if `show` is false.
    - **Implementation:** The component renders a styled `div` containing the message, an optional action button, and a close button.  It uses Tailwind CSS for styling and animations.  The `action` prop allows for custom actions to be associated with the toast message.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `useEffect` from 'react' (though currently unused, suggesting potential future enhancements), and defines a `ToastProps` interface.
- **Code Relationships:** This component is likely used by other components throughout the application to display notifications.  It doesn't directly interact with other files in a complex way, acting as a standalone UI element.

4. **Usage Example:**

```tsx
// In another component
import { Toast } from './Toast';
import { useState } from 'react';

const MyComponent = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSuccess = () => {
        setToastMessage('Action successful!');
        setShowToast(true);
    };

    const closeToast = () => {
        setShowToast(false);
    };

    return (
        <div>
            <button onClick={handleSuccess}>Show Toast</button>
            <Toast 
                show={showToast} 
                onClose={closeToast} 
                message={toastMessage} 
            />
        </div>
    );
};
```

5. **Technical Notes:**
    - The current implementation lacks the `type` prop from the interface, suggesting a potential area for improvement to differentiate between success and error toasts visually.
    - The `useEffect` import is unused, indicating potential unfinished functionality or cleanup needed.

---

<a id='client-src-components-transactionhistory-tsx'></a>

#### TransactionHistory.tsx

*Path: client/src/components/TransactionHistory.tsx*

1. **Purpose:** This component fetches and displays a user's transaction history. It retrieves transaction data from an API and renders it in a user-friendly format.

2. **Key Functionality:**

- **`TransactionHistory` (functional component):**
    - **Parameters:** None
    - **Return Type:** (JSX.Element) Renders the transaction history or loading/error states.
    - **Implementation:** Uses `useEffect` to fetch transaction data from `transactionApi.getHistory()` on component mount.  Manages loading and error states using `useState`.  Renders a list of transactions with details like reward title, sender/receiver, points, and date.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useEffect`, `useState` from 'react' for state management and side effects.
    - `format` from 'date-fns' for date formatting.
    - `transactionApi` from '../services/api' for API interaction.
    - `Transaction` from '../types/transaction' for type safety.
    - `LoadingSpinner` from './LoadingSpinner' for loading state visualization.
- **Code Relationships:** This component depends on the `transactionApi` for data fetching. It likely interacts with a backend API endpoint to retrieve transaction data.

4. **Usage Example:**

```tsx
// In another component or page
import { TransactionHistory } from './TransactionHistory';

const MyPage = () => {
    return (
        <div>
            <TransactionHistory />
        </div>
    );
};
```

5. **Technical Notes:**
    - Error handling is implemented, displaying an error message to the user if the API call fails.  However, more robust error handling (e.g., retry mechanisms) could be considered.

---

<a id='client-src-components-usermenu-tsx'></a>

#### UserMenu.tsx

*Path: client/src/components/UserMenu.tsx*

1. **Purpose:** This component displays a user menu with options related to the user's profile, points, and transaction history. It also handles user logout.

2. **Key Functionality:**

- **`UserMenu` (functional component):**
    - **Parameters:** None
    - **Return Type:** (JSX.Element) Renders the user menu.
    - **Implementation:** Uses the `useAuth` hook for user authentication status and logout functionality.  Fetches user profile data using `authApi.getProfile()`.  Renders a dropdown menu with links to Profile, Transaction History, and My Rewards pages.  Displays user's name and points.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `useAuth` from '../context/AuthContext' for authentication context.
    - React Icons (`FiUser`, `FiLogOut`, etc.) for visual elements.
    - `Menu` from '@headlessui/react' for the dropdown menu component.
    - `Link`, `useNavigate` from 'react-router-dom' for navigation.
    - `useEffect`, `useState` from 'react' for state management and side effects.
    - `authApi` from '../services/api' for API interaction.
    - `toast` from 'react-hot-toast' for displaying toast notifications.
- **Code Relationships:** This component depends on the `AuthContext` for user authentication data and the `authApi` for fetching user profile information. It uses `react-router-dom` for navigation between different routes within the application.

4. **Usage Example:**

```tsx
// In the main application layout
import { UserMenu } from './UserMenu';

const AppLayout = () => {
    return (
        <header>
            <UserMenu />
        </header>
    );
};
```

5. **Technical Notes:**
    - The component uses `react-hot-toast` for user feedback on profile fetching success/failure.
    - The `UserProfile` interface ensures type safety for the profile data.


**Inter-file Relationships:**

- `TransactionHistory` and `UserMenu` both interact with the backend API (`transactionApi` and `authApi` respectively) to fetch data.
- `UserMenu` uses the `useAuth` hook, likely provided by a context like `AuthContext`, which manages user authentication state.  This context might also be used in other parts of the application.
- The `Toast` component is likely used throughout the application, including potentially within `TransactionHistory` and `UserMenu`, for displaying notifications.  The provided example for `Toast` demonstrates a typical usage scenario.


This documentation provides a technical overview of the provided files, their functionalities, dependencies, and how they interact within a larger application context.  It highlights key implementation details and potential areas for improvement.

---

### client/src/config

<a id='client-src-config-config-ts'></a>

#### config.ts

*Path: client/src/config/config.ts*

1. **Purpose:** This file centralizes configuration parameters for the client application, differentiating between development and production environments. It provides a single source of truth for essential settings.

2. **Key Functionality:**

- **`isDevelopment`:** A constant derived from `import.meta.env.DEV` to determine the current environment (development or production).
- **`CONFIG`:** An object containing key configuration parameters:
    - **`API_URL`:**  The base URL for the backend API.  Conditionally sets the URL based on `isDevelopment`.  Uses `http://localhost:5000/api` for development and `https://rex-api-two.vercel.app/api` for production.
    - **`APP_NAME`:** The name of the application, used for display purposes.
    - **`TOKEN_KEY`:** The key used for storing the authentication token in local storage.

3. **Dependencies and Relationships:**

- **Imports & Usage:**  Utilizes `import.meta.env.DEV` provided by the build environment (likely Vite, Webpack, or similar) to detect the development environment.
- **Code Relationships:** This file is imported by other modules in the client application that require access to configuration settings, such as API interaction modules or authentication services.

4. **Usage Example:**

```typescript
import { CONFIG } from './config/config';

const fetchData = async () => {
    const response = await fetch(`${CONFIG.API_URL}/users`);
    // ...
};
```

5. **Technical Notes:**

- Using `import.meta.env.DEV` is a standard practice in modern frontend frameworks for environment-specific configuration.
- Centralizing configuration in a dedicated file improves maintainability and reduces code duplication.  This allows for easy modification of configuration parameters without needing to change them in multiple locations across the codebase.
- The conditional logic for `API_URL` ensures the client connects to the correct backend server depending on the environment.

---

### client/src/context

<a id='client-src-context-authcontext-tsx'></a>

#### AuthContext.tsx

*Path: client/src/context/AuthContext.tsx*

1. **Purpose:** This file defines the `AuthContext` and `AuthProvider` for managing user authentication and authorization within the React application. It handles user login, logout, and persistence of authentication state.

2. **Key Functionality:**

- **`AuthProvider` Component:**
    - Wraps the application's components to provide access to the authentication context.
    - Manages the `user`, `isAuthenticated`, and `isLoading` state variables.
    - Initializes the `user` and `isAuthenticated` state from `localStorage` on mount.
    - Calls `fetchProfile` to populate user data if a token exists in `localStorage`.

- **`useAuth` Hook:**
    - Provides a convenient way for components to access the `AuthContext` values.
    - Throws an error if called outside of an `AuthProvider`.

- **`login(email, password)` Function:**
    - Parameters:
        - `email` (string): User's email address.
        - `password` (string): User's password.
    - Return Type: `Promise<void>`
    - Implementation: Makes a POST request to the `/signin` endpoint using `authApi`. Sets the received token in `localStorage` and axios headers using `setAuthToken`. Calls `fetchProfile` to retrieve user data.

- **`logout()` Function:**
    - Return Type: `void`
    - Implementation: Removes the token from `localStorage` and axios headers, sets `user` to `null`, and `isAuthenticated` to `false`.

- **`fetchProfile()` Function:**
    - Return Type: `Promise<void>`
    - Implementation: Retrieves the token from `localStorage`. If present, makes a GET request to the `/profile` endpoint using `authApi` to fetch user data. Updates the `user` and `isAuthenticated` state. Handles errors by logging out the user if profile fetching fails. Sets `isLoading` to `false` after the operation completes, regardless of success or failure.

- **`setAuthToken(token)` Function:**
    - Parameters:
        - `token` (string | null): The authentication token.
    - Return Type: `void`
    - Implementation: Sets or removes the token from `localStorage` and the `Authorization` header in axios.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `React`: Core React library for functional components, context, and hooks.
    - `api`, `authApi`: Axios instances for making API requests.
    - `react-hot-toast`: For displaying toast notifications.
- **Code Relationships:**
    - `AuthContext` is used by other components in the application to access authentication state and functions.
    - Interacts with the backend API for authentication and profile retrieval.

4. **Usage Example:**

```tsx
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
    const { user, login, logout } = useAuth();

    // ... use user data and auth functions ...
};
```

5. **Technical Notes:**

- The `localStorage` is used to persist the authentication token, enabling users to stay logged in across sessions.
- The `setAuthToken` function ensures that the token is included in all subsequent API requests.
- Error handling in `fetchProfile` prevents infinite loading states and ensures the user is logged out if their profile cannot be retrieved.

---

<a id='client-src-context-darkmodecontext-tsx'></a>

#### DarkModeContext.tsx

*Path: client/src/context/DarkModeContext.tsx*

1. **Purpose:** This file manages the application's dark mode state and provides a context for components to access and toggle this state. It persists the user's preference to `localStorage`.

2. **Key Functionality:**

- **`DarkModeProvider` Component:**
    - Wraps application components to provide access to the dark mode context.
    - Manages the `isDarkMode` state variable.
    - Initializes `isDarkMode` from `localStorage` or the user's system preference.
    - Updates the `html` class to reflect the dark mode state.

- **`useDarkMode` Hook:**
    - Provides a convenient way for components to access the `DarkModeContext` values.
    - Throws an error if called outside of a `DarkModeProvider`.

- **`toggleDarkMode()` Function:**
    - Return Type: `void`
    - Implementation: Toggles the `isDarkMode` state.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `React`: Core React library for functional components, context, and hooks.
- **Code Relationships:**
    - `DarkModeContext` is used by other components to access and control the dark mode state.

4. **Usage Example:**

```tsx
import { useDarkMode } from './context/DarkModeContext';

const MyComponent = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // ... use isDarkMode and toggleDarkMode ...
};
```

5. **Technical Notes:**

- The `useEffect` hook with the `localStorage` dependency ensures that the dark mode preference is persisted across sessions.
- The `useEffect` hook with the `isDarkMode` dependency updates the `html` class, applying or removing the `dark` class based on the state. A `transitioning` class is used to handle smooth transitions between light and dark modes.
- The `window.matchMedia` API is used to detect the user's system preference for dark mode and initialize the state accordingly if no preference is stored in `localStorage`.


**Relationship between Files:**

Both `AuthContext.tsx` and `DarkModeContext.tsx` define React contexts to manage application-wide state. They are independent of each other but can be used together within the application.  They follow a similar pattern of creating a context, a provider component, and a custom hook for accessing the context values.  This promotes a clean separation of concerns and makes it easy for components to access and manage these global states.  Both contexts utilize `localStorage` to persist user preferences across sessions.

---

### client/src/pages

<a id='client-src-pages-createreward-tsx'></a>

#### CreateReward.tsx

*Path: client/src/pages/CreateReward.tsx*

1.  **Purpose:** This file defines the `CreateReward` component, responsible for rendering a form that allows users to create new reward entries. It handles form submission, validation, and interaction with the backend API.

2.  **Key Functionality:**

    -   **`CreateReward` Component:** The main component that renders the form. It manages the form state, validation, submission, and error handling.
    -   **`useState` for Form State:** Manages the form data (title, description, points, code, expiry date, category) and component state (loading, error).
    -   **`useNavigate` for Navigation:** Used to redirect the user after successful reward creation.
    -   **`rewardApi.create`:** Calls the API to create a new reward.
        -   *Parameters:* `rewardData` (object containing reward details).
        -   *Return Type:* Promise resolving to the API response.
    -   **`validateForm`:** Validates the form data before submission.
        -   *Parameters:* None.
        -   *Return Type:* String (error message) or null (if valid).
    -   **`handleSubmit`:** Handles form submission.
        -   *Parameters:* `e` (React.FormEvent).
        -   *Return Type:* None.
    -   **Error Handling:** Uses `try...catch` blocks to handle API errors and display error messages.
    -   **`toast` for Notifications:** Displays success or error messages using toast notifications.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useNavigate`, `rewardApi`, React Icons, `react-hot-toast`.
    -   **Relationships:** Interacts with `rewardApi` to create rewards. Uses `react-router-dom` for navigation.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/rewards/create` route.

5.  **Technical Notes:**

    -   Form validation is performed client-side before submitting data to the API.
    -   The `code` is converted to uppercase before being sent to the API.
    -   The category is optional.

---

<a id='client-src-pages-documentation-tsx'></a>

#### Documentation.tsx

*Path: client/src/pages/Documentation.tsx*

1.  **Purpose:** This file defines the `RexDocs` component, which renders the documentation page for the reX platform. It provides information about the platform's features and a link to the GitHub repository.

2.  **Key Functionality:**

    -   **`RexDocs` Component:** The main component that renders the documentation content.
    -   **JSX Structure:** Uses JSX to structure the documentation layout, including headings, paragraphs, and links.
    -   **External Link:** Includes a link to the GitHub repository.

3.  **Dependencies and Relationships:**

    -   **Imports:** `React`.
    -   **Relationships:** No direct dependencies on other files in the repository.

4.  **Usage Example:**

    The component is rendered when the user navigates to the documentation route.

5.  **Technical Notes:**

    -   Uses Tailwind CSS for styling.

---

<a id='client-src-pages-editreward-tsx'></a>

#### EditReward.tsx

*Path: client/src/pages/EditReward.tsx*

1.  **Purpose:** This file defines the `EditReward` component, responsible for rendering a form that allows users to edit existing reward entries. It handles form submission, validation, data fetching, and interaction with the backend API.

2.  **Key Functionality:**

    -   **`EditReward` Component:** The main component that renders the form.
    -   **`useParams` for Route Parameters:** Retrieves the reward ID from the URL.
    -   **`useState` for Form State:** Manages form data and component state.
    -   **`useEffect` for Data Fetching:** Fetches the reward data when the component mounts or the `id` changes.
    -   **`rewardApi.getById`:** Fetches reward data by ID.
        -   *Parameters:* `id` (string).
        -   *Return Type:* Promise resolving to the API response.
    -   **`rewardApi.update`:** Updates the reward data.
        -   *Parameters:* `id` (string), `rewardData` (object).
        -   *Return Type:* Promise resolving to the API response.
    -   **`validateForm`:** Validates the form data.
        -   *Parameters:* None.
        -   *Return Type:* String (error message) or null (if valid).
    -   **`handleSubmit`:** Handles form submission.
        -   *Parameters:* `e` (React.FormEvent).
        -   *Return Type:* None.
    -   **Error Handling:** Uses `try...catch` blocks to handle API errors.
    -   **`toast` for Notifications:** Displays success or error messages.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useParams`, `useNavigate`, `rewardApi`, React Icons, `react-hot-toast`.
    -   **Relationships:** Interacts with `rewardApi` to fetch and update rewards. Uses `react-router-dom` for navigation and parameter retrieval.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/rewards/:id/edit` route.

5.  **Technical Notes:**

    -   Form validation is performed client-side.
    -   The `code` is converted to uppercase before being sent to the API.
    -   Redirects to `/my-rewards` after successful update.

---

<a id='client-src-pages-home-tsx'></a>

#### Home.tsx

*Path: client/src/pages/Home.tsx*

1.  **Purpose:** This file defines the `Home` component, which displays a list of available rewards. It fetches reward data from the backend API and renders `RewardCard` components for each reward.

2.  **Key Functionality:**

    -   **`Home` Component:** The main component that renders the list of rewards.
    -   **`useState` for Rewards and Loading State:** Manages the list of rewards and loading state.
    -   **`useEffect` for Data Fetching:** Fetches rewards when the component mounts or the user ID changes.
    -   **`rewardApi.getAll`:** Fetches all rewards from the API.
        -   *Parameters:* None.
        -   *Return Type:* Promise resolving to the API response.
    -   **`RewardCard` Component:** Renders a card for each reward.
    -   **`useAuth` Hook:** Provides access to user authentication status and data.
    -   **Filtering Rewards:** Filters out rewards owned by the current user, rewards that are not available, expired rewards, and inactive rewards.
    -   **`FloatingActionButton`:** Renders a button for creating new rewards (visible only to authenticated users).
    -   **`EmptyState`:** Renders a message when no rewards are available.
    -   **`SkeletonLoader`:** Renders a skeleton loader while data is being fetched.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useNavigate`, `rewardApi`, `RewardCard`, `useAuth`, `FiPlusCircle`, `PageLayout`, `SkeletonLoader`, `FloatingActionButton`, `EmptyState`, `react-hot-toast`.
    -   **Relationships:** Interacts with `rewardApi` to fetch rewards. Uses `RewardCard` to display individual rewards. Uses `useAuth` for user authentication status. Uses `react-router-dom` for navigation.

4.  **Usage Example:**

    The component is rendered when the user navigates to the root route (`/`).

5.  **Technical Notes:**

    -   Uses a grid layout to display the rewards.
    -   Displays a loading indicator while fetching data.
    -   Handles the case where no rewards are available.

---

<a id='client-src-pages-myrewards-tsx'></a>

#### MyRewards.tsx

*Path: client/src/pages/MyRewards.tsx*

1.  **Purpose:** This file defines the `MyRewards` component, which displays a list of rewards created by the current user. It allows users to edit or delete their rewards.

2.  **Key Functionality:**

    -   **`MyRewards` Component:** The main component that renders the list of user's rewards.
    -   **`useState` for Rewards and Loading State:** Manages the list of rewards and loading state.
    -   **`useEffect` for Data Fetching:** Fetches rewards when the component mounts.
    -   **`rewardApi.getMyRewards`:** Fetches the current user's rewards from the API.
        -   *Parameters:* None.
        -   *Return Type:* Promise resolving to the API response.
    -   **`rewardApi.delete`:** Deletes a reward by ID.
        -   *Parameters:* `rewardId` (string).
        -   *Return Type:* Promise resolving to the API response.
    -   **`handleDelete` Function:** Handles the deletion of a reward.
    -   **`SkeletonLoader`:** Renders a skeleton loader while data is being fetched.
    -   **`EmptyState`:** Renders a message when no rewards are found.
    -   **Conditional Rendering:** Renders different content based on loading state and the presence of rewards.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useNavigate`, `rewardApi`, `FiEdit2`, `FiTrash2`, `PageLayout`, `SkeletonLoader`, `EmptyState`, `react-hot-toast`.
    -   **Relationships:** Interacts with `rewardApi` to fetch and delete rewards. Uses `react-router-dom` for navigation.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/my-rewards` route.

5.  **Technical Notes:**

    -   Uses a grid layout to display the rewards.
    -   Handles loading state and empty state scenarios.
    -   Only allows editing of rewards with "available" status.

---

<a id='client-src-pages-notfound-tsx'></a>

#### NotFound.tsx

*Path: client/src/pages/NotFound.tsx*

1.  **Purpose:** This file defines the `NotFound` component, which is displayed when the user navigates to a route that doesn't exist.

2.  **Key Functionality:**

    -   **`NotFound` Component:** Renders a 404 error message and a link back to the home page.
    -   **`Link` Component:** Provides a link to the home page.
    -   **`motion.div`:** Animates the 404 message using Framer Motion.

3.  **Dependencies and Relationships:**

    -   **Imports:** `Link` from `react-router-dom`, `FiHome` from `react-icons/fi`, `motion` from `framer-motion`.
    -   **Relationships:** Uses `react-router-dom` for navigation.

4.  **Usage Example:**

    This component is typically rendered by a route configuration when no other route matches the current URL.

5.  **Technical Notes:**

    -   Uses Tailwind CSS for styling.
    -   Uses Framer Motion for animation.

---

<a id='client-src-pages-profile-tsx'></a>

#### Profile.tsx

*Path: client/src/pages/Profile.tsx*

1.  **Purpose:** This file defines the `Profile` component, which displays the user's profile information, including name, email, points balance, and redeemed rewards. It allows users to edit their profile information.

2.  **Key Functionality:**

    -   **`Profile` Component:** The main component that renders the user profile.
    -   **`useState` for Profile Data and Loading State:** Manages the user profile data, loading state, editing state, and error messages.
    -   **`useEffect` for Data Fetching:** Fetches the user profile when the component mounts.
    -   **`authApi.getProfile`:** Fetches the user profile from the API.
        -   *Parameters:* None.
        -   *Return Type:* Promise resolving to the API response.
    -   **`authApi.updateProfile`:** Updates the user profile.
        -   *Parameters:* `profileData` (object).
        -   *Return Type:* Promise resolving to the API response.
    -   **`handleUpdate` Function:** Handles updating the user profile.
    -   **`handleNameChange` and `handleEmailChange` Functions:** Handles changes to the name and email input fields.
    -   **Conditional Rendering:** Renders different content based on loading state, editing state, and error state.
    -   **Error Handling:** Displays error messages if fetching or updating the profile fails.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useAuth`, `authApi`, `toast`, `PageLayout`, `useNavigate`, React Icons.
    -   **Relationships:** Interacts with `authApi` to fetch and update the user profile. Uses `useAuth` for user authentication data. Uses `react-router-dom` for navigation.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/profile` route.

5.  **Technical Notes:**

    -   Uses Tailwind CSS for styling.
    -   Implements client-side validation for name and email.
    -   Handles loading and error states.

---

<a id='client-src-pages-register-tsx'></a>

#### Register.tsx

*Path: client/src/pages/Register.tsx*

1.  **Purpose:** This file defines the `Register` component, which renders a registration form allowing users to create new accounts.

2.  **Key Functionality:**

    -   **`Register` Component:** Manages the registration form state, submission, and error handling.
    -   **`useState` for Form Data and Loading State:** Manages the form data (name, email, password) and loading state.
    -   **`useNavigate` for Navigation:** Redirects the user to the sign-in page after successful registration.
    -   **`authApi.register`:** Sends the registration data to the API.
        -   *Parameters:* `formData` (object containing name, email, and password).
        -   *Return Type:* Promise resolving to the API response.
    -   **`handleSubmit` Function:** Handles form submission.
    -   **`handleChange` Function:** Updates the form data state when input fields change.
    -   **Error Handling:** Uses a `try...catch` block to handle API errors and display error messages using toast notifications.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useNavigate`, `Link`, `authApi`, `toast`.
    -   **Relationships:** Interacts with `authApi` to register new users. Uses `react-router-dom` for navigation and linking.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/register` route.

5.  **Technical Notes:**

    -   Client-side validation is performed before submitting the form.
    -   Uses toast notifications to inform the user about the registration status.
    -   Passes a success message to the sign-in page after successful registration.

---

<a id='client-src-pages-rewarddetails-tsx'></a>

#### RewardDetails.tsx

*Path: client/src/pages/RewardDetails.tsx*

1.  **Purpose:** This file defines the `RewardDetails` component, which displays the details of a specific reward. It allows owners to edit or delete the reward and other users to redeem it.

2.  **Key Functionality:**

    -   **`RewardDetails` Component:** Renders the reward details.
    -   **`useParams` for Route Parameters:** Retrieves the reward ID from the URL.
    -   **`useState` for Reward Data, Loading State, and Error State:** Manages the reward data, loading state, and error messages.
    -   **`useEffect` for Data Fetching:** Fetches the reward details when the component mounts or the `id` changes.
    -   **`rewardApi.getById`:** Fetches reward data by ID.
        -   *Parameters:* `id` (string).
        -   *Return Type:* Promise resolving to the API response.
    -   **`rewardApi.delete`:** Deletes a reward by ID.
        -   *Parameters:* `id` (string).
        -   *Return Type:* Promise resolving to the API response.
    -   **`transactionApi.redeemReward`:** Redeems a reward.
        -   *Parameters:* `rewardId` (string).
        -   *Return Type:* Promise resolving to the API response.
    -   **`handleDelete` Function:** Handles deleting the reward.
    -   **`handleRedeem` Function:** Handles redeeming the reward.
    -   **`useAuth` Hook:** Provides access to user authentication data and the `updatePoints` function.
    -   **Conditional Rendering:** Renders different content based on loading state, error state, and whether the current user is the owner of the reward.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useParams`, `useNavigate`, `rewardApi`, `transactionApi`, `useAuth`, React Icons, `toast`, `LoadingSpinner`.
    -   **Relationships:** Interacts with `rewardApi` to fetch and delete rewards, and with `transactionApi` to redeem rewards. Uses `useAuth` for user authentication and updating points. Uses `react-router-dom` for navigation and parameter retrieval.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/rewards/:id` route.

5.  **Technical Notes:**

    -   Handles loading and error states.
    -   Displays different actions based on user ownership.
    -   Updates user points after redeeming a reward.

---

<a id='client-src-pages-signin-tsx'></a>

#### SignIn.tsx

*Path: client/src/pages/SignIn.tsx*

1.  **Purpose:** This file defines the `SignIn` component, which renders a sign-in form allowing users to authenticate.

2.  **Key Functionality:**

    -   **`SignIn` Component:** Manages the sign-in form state, submission, and error handling.
    -   **`useState` for Form Data and Loading State:** Manages the form data (email, password) and loading state.
    -   **`useAuth` Hook:** Provides the `login` function for user authentication.
    -   **`useNavigate` for Navigation:** Redirects the user to the home page or a specified redirect URL after successful sign-in.
    -   **`useLocation` for Redirect Handling:** Retrieves the redirect URL from the query parameters.
    -   **`handleSubmit` Function:** Handles form submission.
    -   **Error Handling:** Uses a `try...catch` block to handle API errors and display error messages using toast notifications.
    -   **Redirect Logic:** Handles redirecting the user to a specified URL after successful login, while preventing redirect loops.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `useAuth`, `Link`, `useNavigate`, `useLocation`, `toast`, `motion`.
    -   **Relationships:** Interacts with the `useAuth` hook for user authentication. Uses `react-router-dom` for navigation, linking, and location handling. Uses Framer Motion for animation.

4.  **Usage Example:**

    The component is rendered when the user navigates to the `/signin` route.

5.  **Technical Notes:**

    -   Client-side validation is performed before submitting the form.
    -   Uses toast notifications to inform the user about the sign-in status.
    -   Handles redirects after successful sign-in.
    -   Uses Framer Motion for form animation.

---

<a id='client-src-pages-transactionhistory-tsx'></a>

#### TransactionHistory.tsx

*Path: client/src/pages/TransactionHistory.tsx*

1.  **Purpose:** This file defines the `TransactionHistory` component, which displays a history of reward transactions.

2.  **Key Functionality:**

    -   **`TransactionHistory` Component:** Renders the transaction history.
    -   **`useState` for Transactions, Loading State, and Error State:** Manages the transaction data, loading state, and error messages.
    -   **`useEffect` for Data Fetching:** Fetches the transaction history when the component mounts.
    -   **`transactionApi.getHistory`:** Fetches the transaction history from the API.
        -   *Parameters:* None.
        -   *Return Type:* Promise resolving to the API response.
    -   **`useAuth` Hook:** Provides access to user authentication data.
    -   **Conditional Rendering:** Renders different content based on loading state and the presence of transactions.
    -   **Date Formatting:** Uses `date-fns` to format transaction dates.

3.  **Dependencies and Relationships:**

    -   **Imports:** `useState`, `useEffect`, `transactionApi`, `LoadingSpinner`, `format` from `date-fns`, React Icons, `useAuth`.
    -   **Relationships:** Interacts with `transactionApi` to fetch transaction history. Uses `useAuth` for user authentication data.

4.  **Usage Example:**

    The component is rendered when the user navigates to the transaction history route.

5.  **Technical Notes:**

    -   Handles loading and error states.
    -   Uses `date-fns` for date formatting.
    -   Displays user-friendly messages when no transactions are found.


**Overall System Architecture and Relationships:**

The provided files represent a client-side application for managing and redeeming rewards. The application uses React for the user interface, `react-router-dom` for navigation, and interacts with a backend API via various service modules (`rewardApi`, `transactionApi`, `authApi`).

The components work together to provide the following functionality:

-   **Authentication:** `SignIn` and `Register` components handle user authentication and registration.
-   **Reward Management:** `CreateReward` and `EditReward` components allow users to create and manage their rewards. `MyRewards` displays the user's created rewards.
-   **Reward Browsing and Redemption:** `Home` displays available rewards, and `RewardDetails` shows the details of a specific reward, allowing users to redeem it.
-   **Transaction History:** `TransactionHistory` displays a history of reward transactions.
-   **User Profile:** `Profile` displays and allows editing of user profile information.
-   **Documentation:** `Documentation` provides information about the platform.
-   **Error Handling:** `NotFound` handles navigation to non-existent routes.

The application uses a consistent styling approach with Tailwind CSS and incorporates animations using Framer Motion.  Toast notifications are used to provide feedback to the user.  The `useAuth` hook and context manage user authentication state and data across the application.  The API service modules abstract the backend API interaction logic.  The application demonstrates good separation of concerns and follows best practices for React development.

---

### client/src/routes

<a id='client-src-routes-index-tsx'></a>

#### index.tsx

*Path: client/src/routes/index.tsx*

1. **Purpose:** This file defines the client-side routing for the application, managing navigation between different pages based on user authentication status. It utilizes React Router to handle routing logic and protected routes.

2. **Key Functionality:**

- **`AppRoutes` function:** This functional component defines the routes and their corresponding components. It uses the `useAuth` hook to determine the authentication status of the user and conditionally renders routes based on that status.

    - **Parameters:** None
    - **Return Type:** `JSX.Element` (React component representing the routes)
    - **Implementation:**  Uses `react-router-dom`'s `Routes`, `Route`, and `Navigate` components to define the application's routing structure.  `ProtectedRoute` component ensures that only authenticated users can access specific routes.

- **`ProtectedRoute` component (imported):** This component wraps protected routes and checks if the user is authenticated. If not, it redirects to the sign-in page.

    - **Parameters:** `children`: React nodes to render if authenticated.
    - **Return Type:** `JSX.Element` or `null`
    - **Implementation:** Uses the `useAuth` hook to check authentication status. If authenticated, it renders the provided `children`; otherwise, it redirects to `/signin`.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `react-router-dom`: Used for routing and navigation.
    - `../pages/*`: Imports various page components for different routes.
    - `../context/AuthContext`: Imports the `useAuth` hook for authentication status.
    - `../components/ProtectedRoute`: Imports the component for protected routes.

- **Code Relationships:** This file acts as the central routing configuration for the client-side application. It interacts with the authentication context (`AuthContext`) to manage access to protected routes. It also depends on the individual page components for rendering the content of each route.

4. **Usage Example:**

This component is typically rendered at the root of the application, usually within the main App component.  It dictates the navigation flow of the entire client-side application.

```javascript
// In App.tsx
import { AppRoutes } from './routes';

function App() {
  return (
    <AppRoutes />
  );
}
```

5. **Technical Notes:**

- The use of `ProtectedRoute` is crucial for security, ensuring that unauthorized users cannot access sensitive parts of the application.
- The `Navigate` component for the "404 Route" handles cases where the requested route doesn't match any defined routes, redirecting the user to the home page.
- The routing structure is clearly defined, making it easy to understand the navigation flow and add new routes as needed.  Separation of concerns is maintained by delegating authentication logic to the `AuthContext` and protected route handling to the `ProtectedRoute` component. This improves maintainability and testability.

---

### client/src/services

<a id='client-src-services-api-ts'></a>

#### api.ts

*Path: client/src/services/api.ts*

1. **Purpose:** This file centralizes API communication logic for the client application, providing a structured way to interact with the backend server. It uses Axios to make HTTP requests and defines functions for various API endpoints.

2. **Key Functionality:**

- **`api` (Axios Instance):**  The core of this file. An Axios instance configured with a base URL (`CONFIG.API_URL`), credentials handling, and standard headers.  It's used by all other functions in this file to make requests.
    - *baseURL:*  From `../config/config`.  Determines the base URL for all API calls.
    - *withCredentials:*  Handles cookies and authentication headers automatically.
    - *headers:* Sets default headers for content type and acceptance.

- **`authApi`, `rewardApi`, `transactionApi`, `categoryApi`, `requestApi` (Objects):**  These objects group related API endpoints. Each object contains functions that make specific API calls.  For example:
    - `authApi.signin(credentials)`: Sends a POST request to `/auth/login` with the provided `credentials` (object with `email` and `password` strings). Returns the API response.
    - `rewardApi.getAll()`: Sends a GET request to `/rewards`. Returns the API response.
    - `transactionApi.redeemReward(rewardId)`: Sends a POST request to `/transactions/redeem/${rewardId}`. Returns the API response typed as `Transaction`.
    -  And so on for other API endpoints.  Each function uses the `api` instance to make the actual HTTP request.

- **`Transaction` (Interface):** Defines the structure of a transaction object, ensuring type safety for related API calls.

- **Error Handling:**  Relies on Axios's built-in error handling.  The returned Promise will reject if the API request fails, allowing calling functions to handle errors.

3. **Dependencies and Relationships:**

- **Imports:** `axios` for HTTP requests, `CONFIG` from `../config/config` for the API base URL.
- **Relationships:** This file is a central dependency for any component or service that needs to interact with the backend API.  `auth.service.ts` directly uses this file.

4. **Usage Example:**

```typescript
import { rewardApi } from './api';

const fetchRewards = async () => {
  try {
    const response = await rewardApi.getAll();
    console.log(response.data); // Process the reward data
  } catch (error) {
    console.error("Error fetching rewards:", error); // Handle the error
  }
};
```

5. **Technical Notes:**

- Centralizing API logic improves maintainability and consistency.
- Using interfaces like `Transaction` enhances type safety.
- Consider adding an interceptor to `api` for global error handling or request/response transformations.

---

<a id='client-src-services-auth-service-ts'></a>

#### auth.service.ts

*Path: client/src/services/auth.service.ts*

1. **Purpose:** This file provides authentication-related functionalities, including login, registration, token management, and logout.

2. **Key Functionality:**

- **`login(email, password)`:** Sends a POST request to `/auth/signin` using `api` from `api.ts`. Stores the returned token in local storage.
- **`register(name, email, password)`:** Sends a POST request to `/auth/register`. Stores the returned token in local storage.
- **`getToken()`:** Retrieves the token from local storage.
- **`logout()`:** Removes the token from local storage and redirects the user to the signin page.
- **`isAuthenticated()`:** Checks if a token exists in local storage, indicating whether the user is authenticated.

3. **Dependencies and Relationships:**

- **Imports:** `api` from `./api.ts` for making API requests.
- **Relationships:** This service depends on `api.ts` for communication with the backend.  Components related to authentication (login, registration, profile) will use this service.

4. **Usage Example:**

```typescript
import { authService } from './auth.service';

const handleLogin = async (email, password) => {
  try {
    const response = await authService.login(email, password);
    // Redirect to protected route or update UI
  } catch (error) {
    // Handle login error
  }
};
```

5. **Technical Notes:**

- Storing tokens in local storage is a common practice but consider security implications.  For enhanced security, explore alternatives like HttpOnly cookies.
- The redirect in `logout()` assumes a client-side routing solution.

---

<a id='client-src-services-mockdata-ts'></a>

#### mockData.ts

*Path: client/src/services/mockData.ts*

1. **Purpose:** This file provides mock data for rewards, simulating API responses for development or testing purposes.

2. **Key Functionality:**

- **`mockRewards` (Array):** An array of objects, each representing a reward.  Each object has properties like `id`, `title`, `description`, `points`, `code`, `expiryDate`, `isActive`, `createdAt`, and `updatedAt`.

3. **Dependencies and Relationships:**

- **Dependencies:** None.
- **Relationships:** This file can be used by components or services that need reward data during development or testing, allowing them to function without a connection to the real backend.

4. **Usage Example:**

```typescript
import { mockRewards } from './mockData';

const MyComponent = () => {
  // Use mockRewards to display rewards
  return (
    <ul>
      {mockRewards.map(reward => (
        <li key={reward.id}>{reward.title}</li>
      ))}
    </ul>
  );
};
```

5. **Technical Notes:**

- Using mock data facilitates frontend development independent of backend availability.  It also allows for predictable testing scenarios.


**Overall System Relationships:**

- `api.ts` is the central point of communication with the backend.
- `auth.service.ts` uses `api.ts` for authentication-related API calls.
- `mockData.ts` provides mock data that can be used instead of real API calls during development or testing.
- Components throughout the application will likely use `auth.service.ts` for authentication and `api.ts` (or `mockData.ts` during development) to interact with the API and retrieve/manipulate data.  This creates a clear flow of data and dependencies within the client application.

---

### client/src/types

<a id='client-src-types-user-ts'></a>

#### User.ts

*Path: client/src/types/User.ts*

1. **Purpose:** This file defines the TypeScript interface for the `User` object used in the client-side application. It specifies the data structure for user-related information.

2. **Key Functionality:**

- **`User` Interface:**
    - `username`: `string` - The username of the user.
    -  _(... other existing properties ...)_ - Placeholder indicating other properties likely exist in the full code but are omitted for brevity in this example.

    This interface serves as a type definition, ensuring type safety when working with user data in the client-side code.  It doesn't contain any executable logic.

3. **Dependencies and Relationships:**

- **Dependencies:**  This file depends on TypeScript's type system.
- **Relationships:** This `User` type is likely used in components and services across the client application wherever user data is handled, including potential interactions with File 2 (transaction.ts) where `fromUser` and `toUser` utilize a subset of the `User` properties.

4. **Usage Example:**

```typescript
import { User } from './types/User';

const currentUser: User = {
    username: 'john_doe',
    // ... other properties
};
```

5. **Technical Notes:**  Using a TypeScript interface enforces type checking at compile time, improving code maintainability and reducing runtime errors related to unexpected data types.

---

<a id='client-src-types-transaction-ts'></a>

#### transaction.ts

*Path: client/src/types/transaction.ts*

1. **Purpose:** This file defines the TypeScript interface for a `Transaction` object. It outlines the structure of transaction data within the client-side application, specifically related to reward redemptions.

2. **Key Functionality:**

- **`Transaction` Interface:**
    - `_id`: `string` - Unique identifier for the transaction.
    - `fromUser`: `{ _id: string; name: string; }` - Subset of user data representing the sender. Note that this structure suggests a relationship with the `User` type, likely a simplified version for display or efficiency.
    - `toUser`: `{ _id: string; name: string; }` - Subset of user data representing the recipient, similar to `fromUser`.
    - `points`: `number` - The number of points involved in the transaction.
    - `reward`: `{ _id: string; title: string; points: number; code: string; description?: string; }` - Details of the reward redeemed in the transaction.
    - `type`:  `'redemption'` -  Indicates the transaction type.  Currently, only 'redemption' is defined, suggesting potential future expansion for other transaction types.
    - `createdAt`: `string` - Timestamp of the transaction creation.

    This interface ensures type safety when dealing with transaction data.  It doesn't contain executable logic.

3. **Dependencies and Relationships:**

- **Dependencies:** This file depends on TypeScript's type system.
- **Relationships:** This file likely interacts with components and services related to transaction display, processing, and history.  It has a strong relationship with File 1 (User.ts) as it uses simplified versions of the `User` type within the `fromUser` and `toUser` properties.  This suggests a deliberate design choice to potentially minimize data transfer or simplify the transaction data structure.

4. **Usage Example:**

```typescript
import { Transaction } from './types/transaction';

const newTransaction: Transaction = {
    _id: 'tx_12345',
    fromUser: { _id: 'user_abc', name: 'Alice' },
    toUser: { _id: 'user_def', name: 'Bob' },
    points: 100,
    reward: { _id: 'reward_xyz', title: 'Free Coffee', points: 100, code: 'COFFEE100' },
    type: 'redemption',
    createdAt: '2024-10-27T10:00:00Z'
};
```

5. **Technical Notes:** The consistent use of `_id` fields suggests a backend database like MongoDB is used. The `export` keyword makes this interface available for use in other modules. The explicit `type: 'redemption'` suggests a closed set of transaction types, which can be beneficial for maintainability and predictability.  The use of partial user data within the transaction object (`fromUser`, `toUser`) is a performance optimization, avoiding potentially large user objects being embedded within each transaction.

---

### server/src

<a id='server-src-app-ts'></a>

#### app.ts

*Path: server/src/app.ts*

1. **Purpose:** This file sets up the Express.js application, including middleware for security, CORS, routing, and error handling. It initializes the application and defines the main entry point for all API requests.

2. **Key Functionality:**

- **Middleware Setup:**
    - `helmet()`: Sets various HTTP headers to enhance security.
    - `mongoSanitize()`: Prevents MongoDB injection attacks.
    - `hpp()`: Protects against HTTP Parameter Pollution attacks.
    - `cors(corsOptions)`: Enables Cross-Origin Resource Sharing with specific allowed origins and configurations.  The `corsOptions` object defines allowed origins, credentials handling, allowed methods and headers.  It also handles preflight requests using `app.options('*', cors(corsOptions))`.
    - `express.json()`: Parses incoming JSON payloads.

- **Routing:**
    - Defines routes for different functionalities using imported route handlers (`authRoutes`, `rewardRoutes`, etc.).  These routes handle specific API endpoints related to authentication, rewards, transactions, categories, and requests.
    - Root route (`/`): Returns a welcome message with API status and version information.
    - Health check route (`/api/health`): Returns a health status and timestamp.

- **Error Handling:**
    - A global error handling middleware is implemented to catch and process errors that occur during request processing.  It logs the error and sends a JSON response with an error message and code.  It also ensures CORS headers are sent even in error responses.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `express`, `cors`, `mongoose`, `helmet`, `mongoSanitize`, `hpp`, configuration from `./config/config`, and various route handlers from `./routes/*.routes`.
- **Code Relationships:** This file serves as the main entry point for the application. It depends on the route handler files to handle specific API requests and the configuration file for environment variables.

4. **Usage Example:**  N/A - This file sets up the application; it's not directly used by other modules.  It's the entry point of the application.

5. **Technical Notes:**
    - The CORS configuration is crucial for allowing cross-origin requests from specified origins, particularly important for web clients hosted on different domains.
    - The error handling middleware provides a centralized mechanism for handling errors and sending consistent error responses.  The inclusion of CORS headers in error responses is important for client-side error handling in cross-origin scenarios.
    - The security middleware (helmet, mongoSanitize, hpp) is essential for protecting the application against common web vulnerabilities.

---

<a id='server-src-index-ts'></a>

#### index.ts

*Path: server/src/index.ts*

1. **Purpose:** This file starts the server and connects to the MongoDB database. It also handles unhandled promise rejections for improved application stability.

2. **Key Functionality:**

- **Database Connection:** Connects to MongoDB using `mongoose.connect()` with the URI from the configuration file.  Handles successful connection and connection errors.
- **Server Start:** Starts the Express.js server using `app.listen()` after a successful database connection.  Logs server port and environment information.
- **Error Handling:** Includes a handler for `unhandledRejection` events to gracefully exit the process in case of unhandled promise rejections.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports the `app` instance from `./app`, `mongoose` for database interaction, and configuration from `./config/config`.
- **Code Relationships:** This file depends on `app.ts` for the Express application instance and the configuration file for environment variables. It initializes the database connection and starts the server.

4. **Usage Example:** N/A - This file is the main entry point for running the server; it's not used by other modules.

5. **Technical Notes:**
    - Starting the server only after a successful database connection ensures that the application can function correctly.
    - The `unhandledRejection` handler is crucial for preventing the application from crashing due to unhandled errors.
    - The inclusion of `transactionRoutes` after the database connection seems misplaced and redundant as it's already included in `app.ts`. This line should be removed.  This highlights the importance of clear separation of concerns and avoiding code duplication.  The application initialization and routing setup should be handled in `app.ts`, while `index.ts` should focus on starting the server and handling process-level concerns.

---

### server/src/config

<a id='server-src-config-config-ts'></a>

#### config.ts

*Path: server/src/config/config.ts*

1. **Purpose:** This file centralizes configuration parameters for the server application, loading values from environment variables or providing defaults. It ensures consistent access to settings across the application.

2. **Key Functionality:**

- **`CONFIG` (object):**  Exports a configuration object containing key-value pairs for various settings.
    - `NODE_ENV` (string):  The application environment (development, production, etc.). Default: 'development'.
    - `PORT` (number): The port the server listens on. Default: 5000.
    - `API_VERSION` (string): The API version. Default: 'v1'.
    - `MONGODB_URI` (string): The MongoDB connection string.
    - `JWT_SECRET` (string): The secret key for JWT signing.
    - `JWT_EXPIRES_IN` (string): JWT expiration time. Default: '7d'.
    - `CORS_ORIGIN` (string[]): Allowed origins for CORS.  Conditionally sets origins based on `NODE_ENV`.
    - `RATE_LIMIT_ENABLED` (boolean): Enables/disables rate limiting. Default: false (if `process.env.RATE_LIMIT_ENABLED` is not 'true').
    - `RATE_LIMIT_WINDOW` (number): Time window for rate limiting in milliseconds. Default: 900000 (15 minutes).
    - `RATE_LIMIT_MAX` (number): Maximum requests allowed within the rate limit window. Default: 5.
    - `ENABLE_SWAGGER` (boolean): Enables/disables Swagger documentation. Default: false (if `process.env.ENABLE_SWAGGER` is not 'true').

- **Implementation:** Uses `dotenv.config()` to load environment variables from a `.env` file.  Provides default values for settings if environment variables are not defined.  Uses a ternary operator to dynamically set `CORS_ORIGIN` based on the `NODE_ENV`.  Parses string environment variables to integers for `RATE_LIMIT_WINDOW` and `RATE_LIMIT_MAX`.

- **Fallback Mechanisms:** Default values are provided for most configuration parameters, ensuring the application can run even if some environment variables are not set.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `dotenv` to load environment variables.
- **Code Relationships:** This file is a central dependency for other modules that require configuration settings.  Specifically, `JWT_SECRET` and `JWT_EXPIRES_IN` are used in `jwt.config.ts`.

4. **Usage Example:**

```typescript
import { CONFIG } from './config';

const port = CONFIG.PORT;
const databaseURI = CONFIG.MONGODB_URI;
// ... other configuration usage
```

5. **Technical Notes:**

- Centralizing configuration in a single file improves maintainability and reduces code duplication.
- Using environment variables allows for easy configuration changes without modifying code.
- Dynamic CORS configuration based on `NODE_ENV` enhances security in production.

---

<a id='server-src-config-jwt-config-ts'></a>

#### jwt.config.ts

*Path: server/src/config/jwt.config.ts*

1. **Purpose:** This file configures JWT (JSON Web Token) settings, specifically extracting the secret key and expiration time from the main configuration file (`config.ts`).

2. **Key Functionality:**

- **`JWT_CONFIG` (object):** Exports an object containing the JWT secret and expiration time.
    - `secret` (string): The JWT secret key. Obtained from `CONFIG.JWT_SECRET`.
    - `expiresIn` (string): The JWT expiration time. Obtained from `CONFIG.JWT_EXPIRES_IN`.

- **`JWT_SECRET` (string):** Directly exports the JWT secret from environment variables. This might be redundant given its presence in `JWT_CONFIG`.

- **Implementation:** Imports `CONFIG` from `config.ts` and uses its values to populate the `JWT_CONFIG` object. Also directly accesses the `JWT_SECRET` from environment variables.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `CONFIG` from `./config`.
- **Code Relationships:** This file depends on `config.ts` for JWT settings. It is likely used by authentication middleware or services that handle JWT generation and verification.

4. **Usage Example:**

```typescript
import { JWT_CONFIG } from './jwt.config';

// Example usage in an authentication middleware (using a hypothetical 'jwt' library)
jwt.sign(payload, JWT_CONFIG.secret, { expiresIn: JWT_CONFIG.expiresIn });
```

5. **Technical Notes:**

-  The direct export of `JWT_SECRET` seems redundant and potentially risky.  It's best practice to access this sensitive information through the `JWT_CONFIG` object for consistency and better management.  Consider removing the direct export of `JWT_SECRET`.
-  This file demonstrates the relationship between configuration files, promoting modularity and organization.

---

### server/src/controllers

<a id='server-src-controllers-authcontroller-ts'></a>

#### authController.ts

*Path: server/src/controllers/authController.ts*

1.  **Purpose:** This file handles user authentication and profile management, including registration, login, profile retrieval, and profile updates. It uses JWT for authentication and bcrypt for password hashing.

2.  **Key Functionality:**

    *   **`register(req: Request, res: Response)`:** Registers a new user.
        *   *Parameters:* `req` (Express Request with user details), `res` (Express Response).
        *   *Return:* JSON response indicating success or failure.
        *   *Implementation:* Validates input, checks for existing email, creates a new user with initial points, generates a JWT, and returns user details (excluding password). Uses `bcryptjs` for password hashing and `jsonwebtoken` for token generation.
        *   *Fallback:* Returns 400 for invalid input or existing email, 500 for server errors.
    *   **`login(req: Request, res: Response)`:** Logs in an existing user.
        *   *Parameters:* `req` (Express Request with email and password), `res` (Express Response).
        *   *Return:* JSON response with JWT and user details upon successful login.
        *   *Implementation:* Retrieves user by email, compares hashed passwords using `bcrypt.compare`, generates a JWT with a 30-day expiry, and returns user details.
        *   *Fallback:* Returns 401 for invalid credentials, 500 for server errors.
    *   **`getProfile(req: AuthRequest, res: Response)`:** Retrieves the current user's profile.
        *   *Parameters:* `req` (Authenticated request with user ID), `res` (Express Response).
        *   *Return:* JSON response with user profile (excluding password).
        *   *Implementation:* Retrieves user by ID from the authenticated request, returns 404 if not found, and returns user details.
        *   *Fallback:* Returns 404 for user not found, 500 for server errors.
    *   **`updateProfile(req: AuthRequest, res: Response)`:** Updates the current user's profile.
        *   *Parameters:* `req` (Authenticated request with updated user details), `res` (Express Response).
        *   *Return:* JSON response with updated user details.
        *   *Implementation:* Retrieves user by ID, validates input (including checking for existing email if changed), updates user details (including password if provided), and returns updated user details.
        *   *Fallback:* Returns 400 for invalid input or existing email, 401 for unauthorized requests, 404 for user not found, 500 for server errors.

3.  **Dependencies and Relationships:**

    *   *Imports:* `express`, `bcryptjs`, `jsonwebtoken`, `User` model, `JWT_CONFIG`, `AuthRequest`, `CONFIG`.
    *   *Relationships:* Interacts with the `User` model for database operations. Uses `AuthRequest` from the authentication middleware for protected routes. Depends on `JWT_CONFIG` and `CONFIG` for configuration settings.

4.  **Usage Example:**

    ```typescript
    // Register a new user
    router.post('/register', register);

    // Login an existing user
    router.post('/login', login);

    // Get user profile (protected route)
    router.get('/profile', authMiddleware, getProfile);

    // Update user profile (protected route)
    router.put('/profile', authMiddleware, updateProfile);
    ```

5.  **Technical Notes:**

    *   Uses `bcrypt` for password hashing, which is a standard practice for secure password storage.
    *   JWT is used for authentication, providing stateless authentication and authorization.
    *   Error handling is implemented to provide informative error messages to the client.
    *   Input validation is performed to prevent invalid data from being stored in the database.

---

<a id='server-src-controllers-requestcontroller-ts'></a>

#### requestController.ts

*Path: server/src/controllers/requestController.ts*

1.  **Purpose:** This file manages exchange requests for rewards between users. It handles creating requests, retrieving requests (sent and received), fetching a specific request, and responding to requests.

2.  **Key Functionality:**

    *   **`createRequest(req: AuthRequest, res: Response)`:** Creates a new exchange request.
        *   Uses mongoose transactions for data consistency.
        *   Validates reward availability and prevents users from requesting their own rewards.
        *   Updates the reward status to 'pending'.
    *   **`getMyRequests(req: AuthRequest, res: Response)`:** Retrieves sent and received requests for the authenticated user.
        *   Populates the `reward`, `sender`, and `receiver` fields for detailed information.
    *   **`getRequestById(req: AuthRequest, res: Response)`:** Retrieves a specific request by ID, accessible only to the sender or receiver.
        *   Includes detailed information by populating related fields.
    *   **`respondToRequest(req: AuthRequest, res: Response)`:** Handles responses to exchange requests ('accepted' or 'rejected').
        *   Uses mongoose transactions to ensure data consistency.
        *   Updates the request and reward statuses accordingly.
        *   Cancels other pending requests for the same reward if a request is accepted.

3.  **Dependencies and Relationships:**

    *   *Imports:* `express`, `ExchangeRequest` model, `Reward` model, `mongoose`, custom `AuthRequest` type.
    *   *Relationships:* Interacts with `ExchangeRequest` and `Reward` models for database operations. Depends on the `AuthRequest` type for authentication middleware.

4.  **Usage Example:**

    ```typescript
    // Create a new request
    router.post('/requests/:rewardId', authMiddleware, createRequest);

    // Get user's requests
    router.get('/requests', authMiddleware, getMyRequests);

    // Get a specific request
    router.get('/requests/:id', authMiddleware, getRequestById);

    // Respond to a request
    router.put('/requests/:id/respond', authMiddleware, respondToRequest);
    ```

5.  **Technical Notes:**

    *   Mongoose transactions are used to ensure atomicity and data consistency during request creation and response handling.
    *   Error handling and input validation are implemented for robustness.
    *   Population of related fields provides comprehensive data in responses.

---

<a id='server-src-controllers-rewardcontroller-ts'></a>

#### rewardController.ts

*Path: server/src/controllers/rewardController.ts*

1.  **Purpose:** This file manages reward-related operations, including retrieving all rewards, user-specific rewards, creating rewards, retrieving a single reward, redeeming rewards, updating rewards, and deleting rewards.

2.  **Key Functionality:**

    *   **`getAllRewards`**: Retrieves all rewards, populating owner and category details.
    *   **`getMyRewards`**: Retrieves rewards owned by the authenticated user, including detailed logging and error handling.  Uses `lean()` for optimized querying.
    *   **`getAllAvailableRewards`**: Retrieves all available rewards (status: 'available').
    *   **`createReward`**: Creates a new reward, validating input and handling potential errors like validation failures and duplicate keys.  Allows optional categories.
    *   **`getRewardById`**: Retrieves a specific reward by ID, populating owner details.
    *   **`redeemReward`**: Handles reward redemption, updating user points, reward status, and creating a transaction record. Uses atomic operations to ensure data consistency.
    *   **`updateReward`**: Updates an existing reward, verifying ownership before allowing modification.
    *   **`deleteReward`**: Deletes a reward, verifying ownership before deletion.

3.  **Dependencies and Relationships:**

    *   *Imports:* `express`, `Reward` model, `AuthRequest`, `mongoose`, `User` model, `Transaction` model.
    *   *Relationships:* Interacts with `Reward`, `User`, and `Transaction` models. Uses `AuthRequest` for authentication.

4.  **Usage Example:**

    ```typescript
    // Get all rewards
    router.get('/rewards', getAllRewards);

    // Get authenticated user's rewards
    router.get('/my-rewards', authMiddleware, getMyRewards);

    // Get all available rewards
    router.get('/rewards/available', getAllAvailableRewards);

    // Create a new reward
    router.post('/rewards', authMiddleware, createReward);

    // Get a specific reward
    router.get('/rewards/:id', getRewardById); // Consider adding authMiddleware if needed

    // Redeem a reward
    router.post('/rewards/:id/redeem', authMiddleware, redeemReward);

    // Update a reward
    router.put('/rewards/:id', authMiddleware, updateReward);

    // Delete a reward
    router.delete('/rewards/:id', authMiddleware, deleteReward);
    ```

5.  **Technical Notes:**

    *   Uses `populate` to retrieve related data for rewards, improving data retrieval efficiency.
    *   Implements robust error handling and input validation.
    *   `redeemReward` uses atomic operations to maintain data consistency during transactions.
    *   `getMyRewards` utilizes `lean()` for performance optimization.

---

<a id='server-src-controllers-transactioncontroller-ts'></a>

#### transactionController.ts

*Path: server/src/controllers/transactionController.ts*

1.  **Purpose:** This file handles retrieving a user's transaction history.

2.  **Key Functionality:**

    *   **`getTransactionHistory(req: AuthRequest, res: Response)`:** Retrieves the transaction history for the authenticated user.
        *   *Parameters:* `req` (Authenticated request with user ID), `res` (Express Response).
        *   *Return:* JSON response with an array of transactions.
        *   *Implementation:* Retrieves transactions related to the user (either fromUser or toUser), populates related fields (`reward`, `fromUser`, `toUser`), sorts by creation date in descending order, and returns the result.
        *   *Fallback:* Returns 401 for unauthorized requests, 500 for server errors.

3.  **Dependencies and Relationships:**

    *   *Imports:* `Response` from `express`, `AuthRequest`, `Transaction` model.
    *   *Relationships:* Interacts with the `Transaction` model for database operations. Uses `AuthRequest` for authentication.

4.  **Usage Example:**

    ```typescript
    // Get transaction history (protected route)
    router.get('/transactions', authMiddleware, getTransactionHistory);
    ```

5.  **Technical Notes:**

    *   Uses `$or` operator in the MongoDB query to efficiently retrieve transactions related to the user.
    *   Populates related fields to provide detailed information about each transaction.
    *   Sorts transactions by `createdAt` to display the most recent transactions first.


**Inter-file Relationships and Dependencies:**

*   `authController` depends on the `User` model and is responsible for user authentication, which is used by other controllers via the `AuthRequest` middleware.
*   `requestController` depends on the `ExchangeRequest` and `Reward` models and interacts with `rewardController` for reward status updates.
*   `rewardController` depends on the `Reward`, `User`, and `Transaction` models and interacts with `requestController` for reward status updates during request processing.  It also uses `authController` for user authentication.
*   `transactionController` depends on the `Transaction` model and relies on `authController` for user authentication.

This documentation provides a comprehensive overview of the purpose, functionality, dependencies, and relationships of each file within the system. It emphasizes how the files work together and interact with each other, providing a clear understanding of the system's architecture.  The documentation also highlights key technical decisions and considerations, such as the use of bcrypt for password hashing, JWT for authentication, mongoose transactions for data consistency, and `lean()` for query optimization.

---

### server/src/middleware

<a id='server-src-middleware-auth-ts'></a>

#### auth.ts

*Path: server/src/middleware/auth.ts*

1. **Purpose:** This middleware function authenticates requests by verifying JWTs (JSON Web Tokens) passed in the `Authorization` header. It populates the request object with user details if authentication is successful.

2. **Key Functionality:**

- **`auth(req: AuthRequest, res: Response, next: NextFunction)`:**
    - **Parameters:**
        - `req`: An Express request object extended with a `user` property.
        - `res`: An Express response object.
        - `next`: An Express next function.
    - **Return Type:** `void`
    - **Implementation:**
        1. Extracts the JWT from the `Authorization` header.
        2. If no token is present, returns a 401 Unauthorized response.
        3. Verifies the JWT using `jsonwebtoken.verify` with the `JWT_SECRET` from the configuration.
        4. If verification is successful, decodes the token payload and adds the `userId` to the `req.user` object.
        5. Calls `next()` to pass control to the next middleware.
        6. If `jsonwebtoken.verify` throws a `TokenExpiredError`, returns a 401 response with a specific error code `TOKEN_EXPIRED`.
        7. Catches other errors during verification and re-throws them.
        8. Catches any other errors during the process, logs the error, and returns a 401 Unauthorized response.
    - **Fallback Mechanisms:** Error handling is implemented to catch JWT verification errors and other potential exceptions. Specific error codes are returned for expired tokens.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `express`: Used for types `Request`, `Response`, and `NextFunction`.
    - `jsonwebtoken`: Used for JWT verification.
    - `../config/config`: Imports the `CONFIG` object, which likely contains the `JWT_SECRET`.
- **Code Relationships:** This middleware is used to protect routes that require authentication. It is placed before the route handlers in the request processing pipeline.

4. **Usage Example:**

```typescript
import express from 'express';
import { auth } from './middleware/auth';

const app = express();

app.get('/protected-route', auth, (req: AuthRequest, res) => {
  // req.user will contain the user information if authenticated
  res.send(`Hello, ${req.user?.userId}`);
});
```

5. **Technical Notes:**  The `TOKEN_EXPIRED` code allows the client to handle token expiration gracefully, potentially by refreshing the token.

---

<a id='server-src-middleware-errorhandler-ts'></a>

#### errorHandler.ts

*Path: server/src/middleware/errorHandler.ts*

1. **Purpose:** This middleware function handles errors that occur during request processing. It logs error details and sends appropriate error responses to the client.

2. **Key Functionality:**

- **`errorHandler(err, req, res, next)`:**
    - **Parameters:**
        - `err`: The error object.
        - `req`: The Express request object.
        - `res`: The Express response object.
        - `next`: The Express next function.
    - **Return Type:** `void`
    - **Implementation:**
        1. Logs the error details using a logger service, including the error message, stack trace, request path, and method.
        2. Handles specific error types:
            - `ValidationError`: Returns a 400 Bad Request with validation error messages.
            - `MongoError` with code 11000 (duplicate key): Returns a 400 Bad Request with a specific message and the duplicated field.
        3. For other errors, returns a 500 Internal Server Error with a generic message. In development mode, the error object is included in the response.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `express`: Used for types `Request`, `Response`, and `NextFunction`.
    - `../services/logger`: Used for logging error details.
- **Code Relationships:** This middleware should be placed at the end of the middleware chain to catch errors from preceding middleware and route handlers.

4. **Usage Example:**  This middleware is typically added last in the Express app configuration:

```typescript
import express from 'express';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// ... other middleware and routes

app.use(errorHandler);
```

5. **Technical Notes:** The conditional inclusion of the error object in the response based on the `NODE_ENV` is a good security practice.

---

<a id='server-src-middleware-ratelimiter-ts'></a>

#### rateLimiter.ts

*Path: server/src/middleware/rateLimiter.ts*

1. **Purpose:** This file defines rate limiting middleware using the `express-rate-limit` library to prevent abuse and protect against denial-of-service attacks.

2. **Key Functionality:**

- **`apiLimiter`:**  A rate limiter for general API requests, allowing 100 requests every 15 minutes.
- **`authLimiter`:** A stricter rate limiter for authentication routes, allowing 5 requests per hour. This helps mitigate brute-force attacks.
- **`redeemLimiter`:** A configurable rate limiter, enabled based on `CONFIG.RATE_LIMIT_ENABLED`.  Uses values from the configuration (`CONFIG.RATE_LIMIT_WINDOW`, `CONFIG.RATE_LIMIT_MAX`) to control the rate limit. If disabled, it acts as a pass-through middleware.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `express-rate-limit`: Used for rate limiting functionality.
    - `../config/config`: Imports the `CONFIG` object for rate limiting configuration.
- **Code Relationships:** These middleware functions are used in conjunction with route handlers.  `apiLimiter` and `authLimiter` likely protect broader sets of routes, while `redeemLimiter` is probably used for a specific route or group of routes related to a "redeem" functionality.

4. **Usage Example:**

```typescript
import express from 'express';
import { apiLimiter, authLimiter, redeemLimiter } from './middleware/rateLimiter';

const app = express();

app.use('/api', apiLimiter);
app.post('/auth/login', authLimiter, /* login handler */);
app.post('/redeem', redeemLimiter, /* redeem handler */);
```

5. **Technical Notes:** The configurable `redeemLimiter` allows for flexible rate limiting based on application needs.  Disabling it via configuration avoids unnecessary middleware execution.  The use of separate limiters for different functionalities allows for fine-grained control over rate limiting.


**Inter-file Relationships:**

- `auth.ts` depends on `config/config.ts` for the `JWT_SECRET`.
- `errorHandler.ts` depends on `services/logger` for logging.
- `rateLimiter.ts` depends on `config/config.ts` for rate limit configurations.
- `auth.ts`, `errorHandler.ts`, and `rateLimiter.ts` are all middleware functions that can be used together in an Express application.  `errorHandler.ts` should be placed last in the middleware chain.  `auth.ts` and the rate limiters are placed before the route handlers they protect.

---

### server/src/models

<a id='server-src-models-request-ts'></a>

#### Request.ts

*Path: server/src/models/Request.ts*

1. **Purpose:** This file defines the Mongoose schema and model for a Request, representing a request to redeem a reward between users. It manages the structure and data types for reward requests within the application.

2. **Key Functionality:**

- **`IRequest` Interface:** Defines the structure of a Request document.
    - `reward`: (ObjectId, required) - References the `Reward` object.
    - `sender`: (ObjectId, required) - References the sending `User` object.
    - `receiver`: (ObjectId, required) - References the receiving `User` object.
    - `status`: (enum, default: 'pending') - Current status of the request ('pending', 'accepted', 'rejected').
    - `message`: (String, optional) - An optional message accompanying the request.
    - `createdAt`: (Date, default: Date.now) - Timestamp of request creation.

- **`RequestSchema`:**  The Mongoose schema derived from the `IRequest` interface. It enforces data types and validation rules.

- **`mongoose.model<IRequest>('Request', RequestSchema)`:** Creates the Mongoose model named 'Request' based on the schema. This model is used to interact with the 'requests' collection in the database.  Error handling and fallback mechanisms are inherent to Mongoose operations (e.g., connection errors, validation errors).

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose` for MongoDB interaction and schema definition.
- **Code Relationships:**
    - `reward` field references the `Reward` model (File 4).
    - `sender` and `receiver` fields reference the `User` model (File 2 or File 7, depending on the overall architecture).  This establishes a many-to-one relationship between Requests and Users/Rewards.

4. **Usage Example:**

```typescript
import Request from './Request';

const newRequest = new Request({
  reward: rewardId,
  sender: senderId,
  receiver: receiverId,
  message: 'Can I redeem this reward?'
});

newRequest.save().then(savedRequest => {
  // Handle the saved request
});
```

5. **Technical Notes:**  Uses Mongoose for schema validation and database interaction.  The schema enforces data integrity.

---

<a id='server-src-models-user-ts'></a>

#### User.ts

*Path: server/src/models/User.ts*

1. **Purpose:** Defines a simplified User model using Mongoose.  This version appears to be a preliminary or alternative representation of a user, lacking key features like password hashing and timestamps present in File 7.

2. **Key Functionality:**

- **`IUser` Interface:**  Defines the structure of the User document.
    - `username`: (String, required) - User's username.
    - `email`: (String, required, unique) - User's email.
    - `password`: (String, required) - User's password (stored as plain text - **security risk!**).
    - `points`: (Number, default: 0) - User's points balance.
    - `redeemedRewards`: (Number, default: 0) - Count of redeemed rewards.

- **`UserSchema`:** The Mongoose schema for the User model.

- **`mongoose.models.User || mongoose.model<IUser>('User', UserSchema)`:**  This checks if the 'User' model already exists in `mongoose.models` (due to potentially importing it elsewhere). If it exists, it reuses the existing model; otherwise, it creates a new one. This prevents redefining the model multiple times, which can cause errors.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose` for MongoDB interaction.
- **Code Relationships:** This model is likely referenced by other models, such as `Request` (File 1), for establishing relationships.

4. **Usage Example:**  Similar to File 1, using `User.create`, `User.findById`, etc.

5. **Technical Notes:**  **Critical:** This model lacks password hashing, which is a severe security vulnerability.  It also lacks timestamps, which are generally useful for tracking user activity.  Consider using File 7 instead, which addresses these issues.

---

<a id='server-src-models-category-model-ts'></a>

#### category.model.ts

*Path: server/src/models/category.model.ts*

1. **Purpose:** Defines the Mongoose schema and model for a Category, used to categorize rewards.

2. **Key Functionality:**

- **`categorySchema`:** Defines the structure and validation for Category documents.
    - `name`: (String, required, unique) - Category name.
    - `slug`: (String, required, unique, lowercase) - URL-friendly version of the name.
    - `icon`: (String, required) - Likely a URL or path to an icon image.
    - `description`: (String, required) - Category description.
    - `isActive`: (Boolean, default: true) - Flag indicating category's active status.

- **`categorySchema.pre('save', ...)`:**  A Mongoose middleware function that automatically generates the `slug` from the `name` before saving a new category or updating an existing one where the name has been modified. This ensures slugs are consistent and automatically updated.

- **`mongoose.model('Category', categorySchema)`:** Creates the Mongoose model named 'Category'.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose`.
- **Code Relationships:** The `category` field in the `Reward` model (File 4) references this model.

4. **Usage Example:**  Similar to other model files, using `Category.create`, `Category.find`, etc.

5. **Technical Notes:** The slug generation middleware improves data consistency and reduces redundancy.

---

<a id='server-src-models-reward-model-ts'></a>

#### reward.model.ts

*Path: server/src/models/reward.model.ts*

1. **Purpose:** Defines the Mongoose schema and model for a Reward, representing redeemable rewards within the application.

2. **Key Functionality:**

- **`IReward` Interface:** Defines the structure of a Reward document.  Includes fields like `title`, `description`, `points`, `code`, `owner` (User), `status`, `category`, redemption details (`redeemedBy`, `redeemedAt`), `expiryDate`, timestamps, and an `isActive` flag.

- **`rewardSchema`:** The Mongoose schema for the Reward model, based on the `IReward` interface.  Includes data type validation and constraints (e.g., `points` must be non-negative).

- **`mongoose.model<IReward>('Reward', rewardSchema)`:** Creates the Mongoose model named 'Reward'.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose`.
- **Code Relationships:**
    - `owner` field references the `User` model (File 2 or File 7).
    - `category` field references the `Category` model (File 3).
    - `redeemedBy` field references the `User` model (File 2 or File 7).
    - This model is referenced by the `Request` model (File 1).

4. **Usage Example:** Similar to other model files.

5. **Technical Notes:** The schema design ensures data integrity and provides a comprehensive structure for managing rewards.

---

<a id='server-src-models-rewardredemption-model-ts'></a>

#### rewardRedemption.model.ts

*Path: server/src/models/rewardRedemption.model.ts*

1. **Purpose:**  Tracks reward redemptions, recording which user redeemed which reward and when.

2. **Key Functionality:**

- **`rewardRedemptionSchema`:** Defines the structure for reward redemption records.
    - `userId`: (ObjectId, required, indexed) - References the redeeming user.
    - `rewardId`: (ObjectId, required, indexed) - References the redeemed reward.
    - `points`: (Number, required) - The number of points associated with the redemption.
    - `redeemedAt`: (Date, required, default: Date.now) - Timestamp of redemption.

- **`rewardRedemptionSchema.index({ userId: 1, redeemedAt: -1 })`:** Creates a compound index on `userId` and `redeemedAt` (descending). This optimizes queries that retrieve a user's redemption history sorted by date.

- **`mongoose.model('RewardRedemption', rewardRedemptionSchema)`:** Creates the Mongoose model.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose`, indirectly on `User` and `Reward` models through references.
- **Code Relationships:**  Links `User` and `Reward` models, creating a many-to-many relationship (a user can redeem multiple rewards, and a reward can be redeemed by multiple users, although likely only once in a typical scenario).

4. **Usage Example:**  Creating a new record after a reward is redeemed.

5. **Technical Notes:** The compound index significantly improves query performance for common use cases like retrieving user redemption history.

---

<a id='server-src-models-transaction-model-ts'></a>

#### transaction.model.ts

*Path: server/src/models/transaction.model.ts*

1. **Purpose:** Records transactions related to reward redemptions, specifically tracking the flow of points between users.

2. **Key Functionality:**

- **`ITransaction` Interface:** Defines the structure of a transaction record.  Includes `fromUser`, `toUser`, `points`, `reward`, `type` ('redemption'), and `createdAt`.

- **`transactionSchema`:** The Mongoose schema for the Transaction model.

- **`mongoose.model<ITransaction>('Transaction', transactionSchema)`:** Creates the Mongoose model.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose`.
- **Code Relationships:**  Relates to `User` and `Reward` models through object references.  Provides a clear audit trail of point transfers during reward redemptions.

4. **Usage Example:**  Creating a new transaction record when a reward is redeemed.

5. **Technical Notes:**  Currently only supports 'redemption' type transactions.  Could be extended to handle other transaction types in the future.

---

<a id='server-src-models-user-model-ts'></a>

#### user.model.ts

*Path: server/src/models/user.model.ts*

1. **Purpose:** Defines a more robust User model with password hashing, timestamps, and validation.  This is the preferred User model compared to File 2.

2. **Key Functionality:**

- **`IUser` Interface:** Defines the User document structure, including `name`, `email`, `password`, `points`, `redeemedRewards`, and timestamps.  Includes the `comparePassword` method for secure password comparison.

- **`userSchema`:** The Mongoose schema with validation rules for `name`, `email`, and `password`.

- **`userSchema.pre('save', ...)` (Password Hashing):** Middleware to hash the password using `bcryptjs` before saving.  This is crucial for security.

- **`userSchema.pre('save', ...)` (Index Dropping):** Middleware to drop a potentially outdated `username` index before saving. This handles a migration scenario where the `username` field might have been removed or renamed.

- **`userSchema.methods.comparePassword`:**  An instance method to securely compare a provided password against the stored hashed password using `bcryptjs`.

- **`mongoose.model<IUser>('User', userSchema)`:** Creates the Mongoose model.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Depends on `mongoose` and `bcryptjs`.
- **Code Relationships:** This model is likely referenced by other models like `Request`, `Reward`, and `RewardRedemption`.

4. **Usage Example:**  Standard Mongoose model usage.  For password comparison:

```typescript
const user = await User.findOne({ email: 'user@example.com' });
const isMatch = await user.comparePassword('password123');
```

5. **Technical Notes:**  This model implements essential security measures (password hashing) and data validation.  The index dropping middleware demonstrates attention to schema evolution and potential migration issues.  This is the recommended User model to use.


**Overall System Relationships:**

The models are interconnected, forming a cohesive system for managing rewards, requests, redemptions, and user data.  `User` is a central model, referenced by `Request`, `Reward`, `RewardRedemption`, and `Transaction`.  `Reward` is linked to `Category` and is also central to the redemption process.  `Request` connects users and rewards for redemption requests. `RewardRedemption` and `Transaction` track the details of successful redemptions.  This interconnectedness highlights the importance of understanding the relationships between these models when developing and maintaining the application.  Using consistent ObjectId references ensures data integrity and facilitates efficient querying and data retrieval.

---

### server/src/routes

<a id='server-src-routes-auth-routes-ts'></a>

#### auth.routes.ts

*Path: server/src/routes/auth.routes.ts*

1. **Purpose:** This file defines the API endpoints related to user authentication, including registration, login, and profile management. It uses Express.js to handle routing and middleware for authentication.

2. **Key Functionality:**

- **`register`**:
    - Parameters: `req` (request object), `res` (response object)
    - Return Type: None
    - Implementation: Calls the `register` function from the `authController` (not shown in this file) to handle user registration logic.
- **`login`**:
    - Parameters: `req`, `res`
    - Return Type: None
    - Implementation: Calls the `login` function from the `authController` to handle user login logic.
- **`getProfile`**:
    - Parameters: `req`, `res`
    - Return Type: None
    - Implementation: Calls the `getProfile` function from the `authController` to retrieve and return the user's profile information.  Uses the `auth` middleware to ensure the user is authenticated.
- **`updateProfile`**:
    - Parameters: `req`, `res`
    - Return Type: None
    - Implementation: Calls the `updateProfile` function from the `authController` to update the user's profile. Uses the `auth` middleware for authentication.
- **`auth` Middleware:**
    - Implementation:  Intercepts requests to protected routes. Verifies user authentication (likely through JWT or similar). If authentication fails, it blocks access to the route.

3. **Dependencies and Relationships:**

- **Imports:** `express`, `register`, `login`, `getProfile`, `updateProfile` from `../controllers/authController`, and `auth` from `../middleware/auth`.
- **Relationships:** This file depends on the `authController` for authentication logic and the `auth` middleware for protecting routes.

4. **Usage Example:**  A client application would send a POST request to `/register` with user data to register a new user.  Subsequent requests to `/profile` would require an authentication token in the request headers.

5. **Technical Notes:** The use of middleware for authentication is a standard practice for separating concerns and ensuring consistent authentication across protected routes.

---

<a id='server-src-routes-category-routes-ts'></a>

#### category.routes.ts

*Path: server/src/routes/category.routes.ts*

1. **Purpose:** This file defines the API endpoints for managing categories and retrieving rewards associated with them.

2. **Key Functionality:**

- **`GET /`**: Retrieves all active categories.
- **`GET /:slug/rewards`**: Retrieves all active rewards for a given category slug.  Uses Mongoose's `populate` method to include category details with the rewards.
- **`POST /`**: Creates a new category (admin only).  Uses the `auth` middleware.  Handles potential duplicate category errors (error code 11000).
- **`PATCH /:id`**: Updates a category by ID (admin only). Uses the `auth` middleware.  Uses Mongoose's `findByIdAndUpdate` with `runValidators` for data integrity.

3. **Dependencies and Relationships:**

- **Imports:** `express`, `auth` middleware, `Category` and `Reward` models.
- **Relationships:** Interacts with the `Category` and `Reward` models for database operations. Depends on the `auth` middleware for protected routes.

4. **Usage Example:**  A client might fetch all categories with a GET request to `/` and then fetch rewards for a specific category using `/:slug/rewards`.

5. **Technical Notes:**  Error handling includes checking for duplicate categories and handling database errors.  The use of slugs for category URLs is good practice for SEO and user-friendly URLs.

---

<a id='server-src-routes-request-routes-ts'></a>

#### request.routes.ts

*Path: server/src/routes/request.routes.ts*

1. **Purpose:** This file defines a single API endpoint for creating reward requests.

2. **Key Functionality:**

- **`POST /:rewardId`**: Creates a new request for a specific reward.  Uses the `auth` middleware to ensure the user is authenticated.

3. **Dependencies and Relationships:**

- **Imports:** `express`, `auth` middleware, `createRequest` from `../controllers/requestController`.
- **Relationships:** Depends on the `requestController` for the request creation logic.

4. **Usage Example:** A user would send a POST request to `/:rewardId` (where `:rewardId` is the ID of the reward) to create a request for that reward.

5. **Technical Notes:** This file is very concise, focusing solely on the request creation endpoint.

---

<a id='server-src-routes-requestroutes-ts'></a>

#### requestRoutes.ts

*Path: server/src/routes/requestRoutes.ts*

1. **Purpose:** This file defines API endpoints for managing reward requests, including creating, retrieving, and responding to requests.

2. **Key Functionality:**

- **`POST /:rewardId`**: Creates a new request for a specific reward.
- **`GET /my-requests`**: Retrieves the authenticated user's requests.
- **`GET /:id`**: Retrieves a specific request by ID.
- **`PATCH /:id/respond`**: Allows responding to a request (likely by an admin or reward provider).

3. **Dependencies and Relationships:**

- **Imports:** `express`, `auth` middleware, various functions from `../controllers/requestController`.
- **Relationships:** Depends on the `requestController` for request management logic.

4. **Usage Example:**  A user can create a request with a POST to `/:rewardId`, view their requests with a GET to `/my-requests`, and an admin can respond to a request with a PATCH to `/:id/respond`.

---

<a id='server-src-routes-rewardroutes-ts'></a>

#### rewardRoutes.ts

*Path: server/src/routes/rewardRoutes.ts*

1. **Purpose:** This file defines API endpoints for managing rewards, including creating, retrieving, updating, deleting, and redeeming rewards.

2. **Key Functionality:**

- **`GET /`**: Retrieves all available rewards (public).
- **`GET /:id`**: Retrieves a specific reward by ID (public).
- **`GET /user/my-rewards`**: Retrieves the authenticated user's rewards.
- **`POST /`**: Creates a new reward.
- **`PUT /:id`**: Updates a reward.
- **`DELETE /:id`**: Deletes a reward.
- **`POST /:id/redeem`**: Redeems a reward.

3. **Dependencies and Relationships:**

- **Imports:** `express`, `auth` middleware, various functions from `../controllers/rewardController`.
- **Relationships:** Depends on the `rewardController` for reward management logic.

4. **Usage Example:**  Users can browse available rewards with a GET to `/`, and authenticated users can manage their rewards and redeem them.

---

<a id='server-src-routes-transaction-routes-ts'></a>

#### transaction.routes.ts

*Path: server/src/routes/transaction.routes.ts*

1. **Purpose:** This file defines API endpoints related to transaction history and reward redemption.

2. **Key Functionality:**

- **`GET /history`**: Retrieves the transaction history for the authenticated user.
- **`POST /redeem/:id`**: Redeems a reward (this appears to be a duplicate of the redeem route in `rewardRoutes.ts`).

3. **Dependencies and Relationships:**

- **Imports:** `express`, `auth` middleware, `getTransactionHistory` from `../controllers/transactionController`, and `redeemReward` from `../controllers/rewardController`.
- **Relationships:** Depends on the `transactionController` and `rewardController`.

4. **Usage Example:**  A user can view their transaction history with a GET request to `/history`.

5. **Technical Notes:** The duplicate `redeemReward` route should be reviewed and potentially removed to avoid redundancy and potential inconsistencies.  It's important to consolidate core functionality in a single location to improve maintainability.  This file and `rewardRoutes.ts` both depend on `rewardController`, indicating a close relationship between reward management and transaction tracking.  The `auth` middleware is consistently used across all protected routes in these files, demonstrating good security practice.

---

### server/src/scripts

<a id='server-src-scripts-addpointstoexistingusers-ts'></a>

#### addPointsToExistingUsers.ts

*Path: server/src/scripts/addPointsToExistingUsers.ts*

1. **Purpose:** This script adds initial points and sets `redeemedRewards` to 0 for existing users in the database who don't have a `points` field. This is likely a one-time migration script for updating user data.

2. **Key Functionality:**

- **`addPointsToExistingUsers()`:**
    - Parameters: None
    - Return Type: `Promise<void>`
    - Implementation:
        1. Connects to MongoDB Atlas using the `MONGODB_URI` from the `config/config.ts` file.
        2. Uses `User.updateMany()` to find all users without a `points` field and sets their `points` to 100 and `redeemedRewards` to 0.
        3. Logs the number of modified users.
        4. Closes the MongoDB connection.
    - Error Handling: Includes a `try...catch` block to handle potential errors during database connection and update operations.  If an error occurs, it logs the error and exits the process with code 1.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `mongoose`: Used for MongoDB interaction.
    - `User`: The User model from `../models/user.model`, representing the user schema.
    - `CONFIG`: Imports the `MONGODB_URI` from the configuration file located at `../config/config.ts`.
- **Code Relationships:** This script directly interacts with the MongoDB database, updating the `users` collection based on the `User` model's schema. It depends on the `config/config.ts` file for the database connection string.

4. **Usage Example:** This script is executed directly using `node addPointsToExistingUsers.ts`.  It's likely a one-time migration script and wouldn't be part of the regular application flow.

5. **Technical Notes:**
    - The script assumes the existence of a MongoDB database and a `users` collection with a schema compatible with the `User` model.
    - The `$exists: false` query ensures that only users without pre-existing `points` are updated. This prevents accidental overwriting of points for users who already have them.  This is crucial for a migration script to avoid data corruption.
    - Exiting the process with `process.exit(1)` after an error ensures that the script doesn't continue execution in an undefined state.

---

### server/src/services

<a id='server-src-services-logger-ts'></a>

#### logger.ts

*Path: server/src/services/logger.ts*

1. **Purpose:** This file sets up a centralized logger using the `winston` library. It provides a consistent way to log messages across the application, configurable based on the environment.

2. **Key Functionality:**

- **`logger` (object):**  The main exported object, an instance of `winston.Logger`.  It exposes methods for logging at different levels (e.g., `logger.info()`, `logger.error()`, `logger.debug()`).

    - **Methods:** `info(message: string, ...meta: any[])`, `error(message: string, ...meta: any[])`, `debug(message: string, ...meta: any[])`, etc.
        - **Parameters:** `message` (string) - the log message, `meta` (optional) - additional metadata objects.
        - **Return:** `void`
        - **Implementation:** These methods write log messages to the configured transports. The `meta` parameter allows adding structured data to log entries.

- **Configuration:** The logger is configured based on `CONFIG.NODE_ENV`.
    - In 'production', the log level is set to 'info'.
    - In other environments (e.g., development, testing), the log level is set to 'debug', providing more verbose output.
    - The log format is JSON for all environments, ensuring consistent structure.  In the console transport, it also uses `colorize` and `simple` formats for better readability during development.

- **Transports:**  Currently, only a `Console` transport is used, meaning logs are printed to the console.  This can be extended to include file transports or other logging destinations.

3. **Dependencies and Relationships:**

- **Imports & Usage:**
    - `winston`:  Used for creating and managing the logger.
    - `../config/config`: Imports the `CONFIG` object, likely containing environment variables and settings.  The logger uses `CONFIG.NODE_ENV` to determine the appropriate log level.
- **Code Relationships:** This `logger` will likely be imported and used across other modules in the `server/src` directory to provide consistent logging.

4. **Usage Example:**

```typescript
import logger from './services/logger';

// ... inside another module ...

try {
    // some operation
    logger.info('Operation completed successfully.');
} catch (error) {
    logger.error('Operation failed:', error);
}

logger.debug('Detailed debug information.'); // This will only show in non-production environments.
```

5. **Technical Notes:**

- The use of environment-based configuration (`CONFIG.NODE_ENV`) allows for different log levels in production and development. This is a standard practice for controlling log verbosity.
- Using a centralized logger promotes maintainability and consistency in logging across the application.
- The JSON log format is suitable for log aggregation and analysis tools.  The addition of `colorize` and `simple` formats for the console transport enhances readability during development without affecting the underlying JSON structure.  This allows for easy integration with logging systems that parse JSON while still providing a user-friendly console output.
-  Consider adding a file transport for production environments to persist logs.  This is crucial for debugging and monitoring in production scenarios.

---

### server/src/types

<a id='server-src-types-express-d-ts'></a>

#### express.d.ts

*Path: server/src/types/express.d.ts*

1. **Purpose:** This file extends the Express `Request` interface to include a `user` property, which is used for storing user information after authentication. This allows access to user data throughout the request lifecycle.

2. **Key Functionality:**

- **`declare global { ... }`**: This construct allows extending the global namespace.  It's crucial for modifying existing types like the Express `Request` interface without directly altering the library's source code.

- **`namespace Express { ... }`**:  This targets the Express namespace specifically, ensuring the extension applies only to Express objects.

- **`interface Request { ... }`**: This extends the existing `Request` interface.

- **`user?: { userId: string; };`**: This adds an optional `user` property to the `Request` object. The `?` makes it optional, acknowledging that requests might not always have an authenticated user. The `user` object contains a `userId` of type string.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `Request` from `express`. This dependency is essential for extending the correct interface.
- **Code Relationships:** This file is crucial for any file that handles authenticated requests.  By augmenting the `Request` object, it provides a standardized way to access user information within route handlers and middleware.  This eliminates the need to manually pass user data between functions.

4. **Usage Example:**

```typescript
// In a route handler:
import { Request, Response } from 'express';

const myRouteHandler = (req: Request, res: Response) => {
  if (req.user) {
    const userId = req.user.userId;
    // Use the userId to fetch user-specific data, etc.
  } else {
    // Handle unauthenticated requests
  }
};
```

5. **Technical Notes:**

- This approach leverages TypeScript's declaration merging to seamlessly extend the `Request` interface. This avoids modifying the original `express` library code, ensuring compatibility and maintainability.
- The optional `user` property accounts for both authenticated and unauthenticated requests, preventing runtime errors.


---


There were no other files provided in the prompt, so only File 1 was documented. If you provide additional files, I can generate documentation for them following the same structure.  Remember to emphasize how the files interact and depend on each other to form a complete system.

---

### server/src/validators

<a id='server-src-validators-auth-validator-ts'></a>

#### auth.validator.ts

*Path: server/src/validators/auth.validator.ts*

1. **Purpose:** This file defines Zod schemas for validating user registration and login data. It ensures data integrity before it reaches the application logic.

2. **Key Functionality:**

- **`registerSchema`**: Validates user registration data.
    - **Parameters:** An object with `name` (string), `email` (string), and `password` (string) properties.
    - **Return Type:** A Zod validation result.
    - **Implementation:** Uses Zod's `object` method to define the schema, specifying the type and validation rules for each field.  `min` length validation is applied to `name` and `password`, and `email` format is validated.
- **`loginSchema`**: Validates user login data.
    - **Parameters:** An object with `email` (string) and `password` (string) properties.
    - **Return Type:** A Zod validation result.
    - **Implementation:** Similar to `registerSchema`, it uses Zod's `object` method and validates `email` format and `password` minimum length.

    - **Fallback Mechanisms:** Zod throws errors if the validation fails, which are typically handled by the calling code (e.g., an API route handler).

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `z` from the `zod` library for schema definition.
- **Code Relationships:** This file is used by route handlers or service functions responsible for user authentication (e.g., registration and login).  It ensures data integrity before further processing.

4. **Usage Example:**

```typescript
import { registerSchema } from './validators/auth.validator';

// Inside a route handler
try {
    const validatedData = registerSchema.parse(req.body);
    // Proceed with registration logic using validatedData
} catch (error) {
    // Handle validation error (e.g., return a 400 Bad Request response)
}
```

5. **Technical Notes:**

- Zod is used for validation due to its type-safety and comprehensive validation capabilities.  This improves code maintainability and reduces runtime errors.

---

<a id='server-src-validators-reward-validator-ts'></a>

#### reward.validator.ts

*Path: server/src/validators/reward.validator.ts*

1. **Purpose:** This file defines a Zod schema for validating reward data.  It ensures that reward data conforms to the expected format before being processed.

2. **Key Functionality:**

- **`rewardSchema`**: Validates reward data.
    - **Parameters:** An object with `title` (string), `description` (string), `category` (string, representing a MongoDB ObjectId), `points` (number), `code` (string), and `expiryDate` (string representing a date-time) properties.
    - **Return Type:** A Zod validation result.
    - **Implementation:** Uses Zod's `object` method to define the schema.  It validates the minimum length of `title`, `description`, and `code`.  It also uses a regular expression to validate the format of the `category` field (expecting a 24-character hexadecimal string, typical for MongoDB ObjectIds).  `points` are validated to be positive, and `expiryDate` is validated as a date-time string.
    - **Fallback Mechanisms:** Zod throws errors if validation fails, which should be handled by the calling code.

3. **Dependencies and Relationships:**

- **Imports & Usage:** Imports `z` from the `zod` library.
- **Code Relationships:** This file is likely used by route handlers or service functions related to reward creation or updating. It ensures data integrity before interacting with the database or other services.  It likely interacts with a data access layer or service that handles reward persistence.

4. **Usage Example:**

```typescript
import { rewardSchema } from './validators/reward.validator';

// Inside a route handler or service function
try {
    const validatedData = rewardSchema.parse(req.body);
    // Proceed with reward creation/update logic using validatedData
} catch (error) {
    // Handle validation error
}
```

5. **Technical Notes:**

- The regular expression for `category` ensures it's a valid MongoDB ObjectId format, improving data integrity when interacting with the database.
- Using Zod provides type safety and clear error messages, simplifying debugging and maintenance.

**Relationship between File 1 and File 2:**

Both files utilize the `zod` library for schema validation, demonstrating a consistent approach to data validation across the application.  They are independent in terms of their specific schemas but share the common goal of ensuring data integrity before processing.  They would be used in different parts of the application – File 1 for authentication and File 2 for reward management – but contribute to the overall robustness of the system.

---

