import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import PaymentPage from '../Payment';
import { loadStripe } from '@stripe/stripe-js';

// Mock environment variables
vi.mock('../../env.d.ts', () => ({
  VITE_STRIPE_PUBLISHABLE_KEY: 'mock_key'
}));

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn()
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Helper function to render component with required providers
const renderPaymentPage = (): RenderResult => {
  return render(<PaymentPage />);
};

describe('PaymentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (loadStripe as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ url: 'mock-checkout-url' })
    });
  });

  it('renders all plan options', () => {
    renderPaymentPage();

    expect(screen.getByText('Basic Plan')).toBeTruthy();
    expect(screen.getByText('Premium Plan')).toBeTruthy();
    expect(screen.getByText('Elite Plan')).toBeTruthy();
  });

  it('shows loading state when initializing Stripe', async () => {
    (loadStripe as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() => new Promise(() => {}));
    renderPaymentPage();

    expect(screen.getByText('Loading Payment System...')).toBeTruthy();
  });

  it('handles successful payment initiation', async () => {
    renderPaymentPage();

    const subscribeButton = screen.getByRole('button', { name: /Subscribe Now/i });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/stripe/create-checkout-session',
        expect.any(Object)
      );
    });
  });

  it('shows error toast when payment creation fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Payment failed'));
    renderPaymentPage();

    const subscribeButton = screen.getByRole('button', { name: /Subscribe Now/i });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeTruthy();
    });
  });

  it('disables button during payment processing', async () => {
    renderPaymentPage();

    const subscribeButton = screen.getByRole('button', { name: /Subscribe Now/i });
    fireEvent.click(subscribeButton);

    expect(subscribeButton.hasAttribute('disabled')).toBeTruthy();
    expect(screen.getByText('Processing...')).toBeTruthy();
  });
});