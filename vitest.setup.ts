import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Stripe environment variables
vi.mock('./client/src/env.d.ts', () => ({
  VITE_STRIPE_PUBLISHABLE_KEY: 'mock_key'
}));

// Mock fetch
global.fetch = vi.fn();

// Mock window.location
delete window.location;
window.location = {
  href: '',
} as unknown as Location;
