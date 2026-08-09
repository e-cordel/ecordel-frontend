# ecordel-frontend - AGENTS Guide

## Project Purpose
Single Page Application for browsing and reviewing digital cordels.

## Tech Stack
- React 17
- TypeScript
- React Router
- MUI (Material UI)
- Axios
- SWR
- Create React App (`react-scripts`)

## Key Commands
- Install deps: `yarn`
- Start dev server: `yarn start`
- Run tests: `yarn test`
- Build production bundle: `yarn build`

## Environment Notes
- Copy `.env.template` to environment-specific files:
  - `.env.development`
  - `.env.test`
  - `.env.production`
- Configure API base URL to point to:
  - Local REST API during development.
  - Heroku backend in production.

## API Integration
- Consumes endpoints from `../ecordel-restapi`.
- API contract reference: `../ecordel-restapi/openapi.yaml`.
- Keep request/response models aligned with backend changes.

## Testing and Validation
- Use `yarn test` for unit/integration tests.
- Validate critical user flows after API contract updates:
  - List cordels
  - Cordel details
  - Review-related operations

## Mocking Option
You can run Prism with the OpenAPI spec for local mock API testing:
1. `npm install -g @stoplight/prism-cli`
2. `prism mock https://raw.githubusercontent.com/e-cordel/ecordel-restapi/main/openapi.yaml`
3. Point frontend env API URL to the generated mock URL.
