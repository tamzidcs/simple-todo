// src/setupTests.ts
import '@testing-library/jest-dom'; // Extends expect with jest-dom matchers
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Automatically clean up after each test
afterEach(() => {
  cleanup();
});