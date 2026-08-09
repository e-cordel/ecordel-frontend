
## GitHub Copilot — project conventions

This project uses React and communicates with a backend API. The goal of this file is to give Copilot concise, actionable conventions so its suggestions align with the repository layout and team expectations.

Keep suggestions simple and consistent with the existing codebase.

## Where to put things

- Components: `src/components` (each component can be a folder with an `index.tsx`, styles, and tests).
- Pages / route views: `src/pages` (each page is a top-level route view — e.g., `Home.tsx`, `Login.tsx`).
- Hooks: `src/hooks` (custom hooks like `useAuth.tsx`, `useFetch.ts`).
- Services/api: `src/services` (API wrapper(s) such as `api.ts`).
- Context providers: `src/contexts` (React Context providers such as `AuthProvider`).
- Types: `src/types` (shared TypeScript types and interfaces).

## File & naming conventions

- Use PascalCase for React components and filenames (e.g., `MyButton`, `CordelCard`).
- Component entry point should be `index.tsx` inside the component folder when the component has multiple files.
- Prefer named exports for hooks and utility functions, default exports for components only when there is a single main export.
- Keep component props typed with interfaces or types in the same file or a nearby `types.ts` if large.

## Component structure (recommended)

Example component folder:

- `src/components/MyComponent/`
	- `index.tsx` (main component)
	- `MyComponent.module.css` or `styles.ts` (styling)
	- `MyComponent.test.tsx` (unit tests)
	- `types.ts` (optional, if complex props)

When suggesting code, include a small, focused test for new components (happy path + one edge case).

## API consumption

- Centralize HTTP logic in `src/services/api.ts` (or a similar file).
- Read base URL from environment (e.g., `process.env.REACT_APP_API_URL`) and keep request functions small and typed.
- Prefer fetch/axios wrapped in small helpers that return typed data and throw consistent errors.

## State management

- Prefer local component state and custom hooks.
- Use React Context for simple app-wide state (auth, theme). Avoid introducing Redux unless necessary.

## Styling

- Follow existing pattern in the repo (there is a `theme.tsx` — prefer using the shared theme).
- Choices: CSS Modules, CSS-in-JS, or the project's existing approach. Keep styles colocated with components when practical.

## Testing

- Use the existing testing setup (React Testing Library + Jest). Put tests next to the component in a `tests` folder or `.test.tsx` files.
- Aim for small, fast unit tests. For components, test rendering and important behavior (user interactions and props-driven outputs).

## TypeScript and linting

- Use the project's `tsconfig.json` types and keep code typed.
- When suggesting code, prefer explicit types for public interfaces and use `unknown`->`type` narrowing if necessary.

## Commits & PRs

- Small, focused commits. Follow conventional commits if possible (feat/, fix/, chore/, docs/, test/).
- PR checklist suggestions:
	- Code builds and typechecks locally
	- Unit tests added/updated and passing
	- Linting/formatting applied
	- No secret or environment values committed

## What Copilot should avoid

- Introducing large architectural changes (new global state libraries, major toolchain changes) without an explicit request.
- Hardcoding API URLs or secrets in code.
- Generating UI that conflicts with `theme.tsx` or the project's visual patterns.

## Short contract for generated code

When generating a file, follow this minimal contract:

- Inputs: props (typed), hooks (if used), and service functions called from `src/services`.
- Outputs: a properly-typed component or hook, default export if it is the main item, and at least one small unit test.
- Error modes: validate required props and throw/return typed errors for API failures.

## Quick run notes (for reference)

- Local dev: `npm install` then `npm start` (use the project's existing scripts).
- Tests: `npm test` (use existing test runner setup).

---

Keep suggestions short and aligned with the existing code when possible. When in doubt, follow existing nearby files for style, types, and patterns.
