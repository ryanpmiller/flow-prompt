# Flow Prompt

A modern prompt engineering and workflow tool built with React, TypeScript, and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.11.1 or higher)
- [nvm](https://github.com/nvm-sh/nvm) (recommended for Node.js version management)
- [pnpm](https://pnpm.io/) (recommended package manager)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/flow-prompt.git
    cd flow-prompt
    ```

2. Set up the correct Node.js version:

    ```bash
    nvm use
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

4. Start the development server:
    ```bash
    pnpm dev
    ```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Features

- 🔧 Visual prompt flow builder
- 📝 Template management
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Lightning-fast development with Vite
- 🔒 Type-safe with TypeScript
- 🧪 State management with Zustand
- 🎯 Token counting and rate limiting

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview the production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Development Stack

- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Flow](https://reactflow.dev/)
- [Headless UI](https://headlessui.dev/)

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── config/        # Configuration files
  ├── hooks/         # Custom React hooks
  ├── pages/         # Route components
  ├── services/      # API and external services
  ├── store/         # State management
  ├── types/         # TypeScript type definitions
  └── utils/         # Utility functions
```
