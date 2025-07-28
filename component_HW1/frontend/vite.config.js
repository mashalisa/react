// install testing library
//npm install -D vitest ////test runner (like Jest alternative):
//npm install -D @testing-library/react ///React Testing Library for rendering and user-event simulation
// npm install --save-dev @testing-library/react @testing-library/jest-dom jest // for custom matchers like .toBeInTheDocument():
// npm install --save-dev @testing-library/user-event

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, //This allows you to write tests without importing describe, it, expect, etc. every time.
    environment: 'jsdom', //This tells Vitest to simulate a browser environment (DOM, window, document).
    setupFiles: './src/test/setupTests.js' //This is a startup script that runs before each test file. example expect(button).toBeInTheDocument();
  }
})
