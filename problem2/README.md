# Currency Swap Application

A professional React + TypeScript application for token swapping, featuring real-time price data, robust validation, and a modern, Material-UI-based interface. Built with Vite for lightning-fast development and best-in-class developer experience.

---

## 🌟 Why This Project Stands Out

- **Modern React Patterns**: Uses functional components, hooks, and separation of concerns for maintainability and scalability.
- **TypeScript Everywhere**: Full type safety for all logic, API, and UI layers.
- **Material-UI Integration**: Consistent, accessible, and responsive design with custom theming.
- **Robust Validation**: Comprehensive input validation and user feedback.
- **Error Boundaries**: Graceful error handling for a production-ready experience.
- **API Abstraction**: Clean separation between UI and data fetching logic.
- **Reusable Custom Hooks**: All business logic encapsulated in `useSwapFormLogic` for testability and reusability.
- **Clean Code Structure**: Clear folder organization, single-responsibility components, and easy extensibility.
- **Real-World UX**: Token icons, live price fetching, and mobile-friendly layout.

---

## 🏛️ Design Patterns Used & Rationale

- **Container/Presentational Component Pattern**
  - *Why*: Separates business logic (container) from UI (presentational), making components easier to test, reuse, and maintain.
  - *How*: `SwapFormContainer` handles state and logic, while `SwapForm` focuses on rendering the UI.

- **Custom Hooks**
  - *Why*: Encapsulates reusable logic and state, promoting DRY code and separation of concerns.
  - *How*: `useSwapFormLogic` manages all swap-related state, validation, and handlers.

- **Error Boundary**
  - *Why*: Catches unexpected errors in the component tree, preventing the entire app from crashing and providing user-friendly error messages.
  - *How*: `ErrorBoundary` wraps the main app.

- **API Abstraction Layer**
  - *Why*: Decouples data fetching from UI, making it easier to swap out APIs, mock data, or add caching.
  - *How*: All API calls are handled in `api/swapApi.ts` and `api/apiClient.ts`.

- **Centralized Constants**
  - *Why*: Keeps configuration, endpoints, and static values in one place for easy maintenance and consistency.
  - *How*: `constants.ts` holds API URLs, token icon generator, and mock balance.

- **TypeScript Interfaces**
  - *Why*: Ensures type safety, better documentation, and fewer runtime errors.
  - *How*: All data structures and props are typed.

- **Separation of Concerns**
  - *Why*: Each file/component/hook has a single responsibility, making the codebase easier to understand and extend.

---

## 🚀 Features

- **Currency Swap Form**: Select source/target tokens, input amount, and see the calculated result instantly.
- **Input Validation**: Prevents invalid numbers, negative/zero amounts, exceeding balance, and same-token swaps.
- **Live Price Fetching**: Loads token prices from Switcheo’s API (`https://interview.switcheo.com/prices.json`).
- **Token Icons**: Visual clarity with Switcheo’s CDN token icons.
- **Responsive UI**: Looks great on desktop and mobile.
- **Error Handling**: ErrorBoundary component for unexpected issues.

---

## 🏗️ Project Structure

```
src/
├── api/                # API abstraction (apiClient, swapApi)
├── assets/             # Static assets (e.g., icons)
├── components/         # UI components (SwapForm, SwapFormContainer, ErrorBoundary, swapFormStyles)
├── constants.ts        # API endpoints, token icon URL, mock balance
├── hooks/              # Custom React hooks (useSwapFormLogic)
├── App.tsx             # Main app entry
├── main.tsx            # ReactDOM render
└── index.css           # Global styles
```

---

## 🧑‍💻 How It Works

- **SwapFormContainer**: Connects business logic to the UI.
- **SwapForm**: Main form UI, handles user input, validation, and confirmation dialog.
- **useSwapFormLogic**: Custom hook for state, validation, and swap logic.
- **ErrorBoundary**: Catches and displays errors gracefully.

You can run the project with either **npm** or **yarn**:

### Using npm
```bash
npm install
npm run dev
```

### Using yarn
```bash
yarn install
yarn dev
```

---

## 📝 Interviewer Talking Points

- **Separation of Concerns**: UI, logic, and API are clearly separated for maintainability.
- **Type Safety**: All business logic and UI are fully typed with TypeScript.
- **Extensibility**: Easy to add new tokens, validation rules, or UI features.
- **Error Handling**: User-friendly error messages and robust error boundaries.
- **Performance**: Efficient state management and minimal re-renders.
- **UI/UX**: Professional, accessible, and responsive design.

---

**Built with React, TypeScript, Vite, and Material-UI.**
