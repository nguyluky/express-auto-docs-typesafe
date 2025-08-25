# Express Auto Docs Typesafe Boilerplate

A scalable, **type-safe** backend boilerplate for Node.js using Express, designed with modular structure, auto-generated docs, and modern coding conventions.

---

## Features

- **Modular Architecture:** Organize business logic by module (controller, service, types).
- **Type Safety:** End-to-end type safety with TypeScript, decorators, and schema validation (zod or custom).
- **Auto-generated API Docs:** Swagger/OpenAPI integration.
- **RESTful & Socket.IO Ready:** Standardized REST controllers, (easy integration for Socket.IO realtime modules \[devp\]).
- **Code Generator Scripts:** CLI tools to scaffold new modules and endpoints, keeping codebase consistent.
- **Error Handling:** Centralized, consistent error handler and custom error classes.
- **Validation:** Input validation at the controller layer using schema or decorators.
- **Testability:** Code structure encourages unit and integration testing.

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR-ORG/express-auto-docs-typesafe.git
cd express-auto-docs-typesafe
npm install
```

### 2. Environment Setup

Copy and edit `.env` as needed:

```bash
cp .env.example .env
```

### 3. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000/docs](http://localhost:3000/docs) for API documentation.

---

## Project Structure

```
src/
  module/
    <module-name>/
      controller.ts
      service.ts
      types/
        <endpoint>.type.ts
  socket/
    <module>/
      controller.ts
      types.ts
      service.ts
    index.ts
  config/
  middleware/
  utils/
  scripts/
    generate-module.ts
    add_endpoint.ts
```

---

## Coding Conventions

- Each business module = `controller.ts`, `service.ts`, `types/`
- **Controllers**: Define endpoint, validate input, call service, return output (no business logic!).
- **Services**: Contain business logic, DB queries, external API calls.
- **Types**: Use class + decorator or zod schema for input/output definition.
- **Validation**: All input must be validated at controller (decorator/zod).
- **Error Handling**: Throw custom errors; all errors caught by middleware.
- **Response Format**: Consistent `{ code, message, data }` or error object.
- **Type Safety**: All route, service, and type definitions are strictly typed.

---

## Code Generator

- **Generate Module:**
  ```bash
  npx ts-node scripts/generate-module.ts <moduleName>
  ```
- **Add Endpoint:**
  ```bash
  npx ts-node scripts/add_endpoint.ts <moduleName> <EndpointName>
  ```

---

## Socket.IO Integration

- Socket logic is organized by module in `src/socket/`.
- Each socket module: `controller.ts`, `types.ts`, `service.ts`
- Socket modules are registered in `src/socket/index.ts` and attached in `src/index.ts`

---

## Example: Adding a REST Endpoint

1. Generate a module:
   ```bash
   npx ts-node scripts/generate-module.ts course
   ```

2. Add an endpoint:
   ```bash
   npx ts-node scripts/add_endpoint.ts course List
   ```

3. Implement business logic in `src/module/course/service.ts`.

4. Define input/output types in `src/module/course/types/List.type.ts`.

---

## License

MIT

---