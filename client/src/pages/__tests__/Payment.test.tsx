import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import PaymentPage from '../Payment';

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

const renderPaymentPage = (): RenderResult => {
  return render(<PaymentPage />);
};

describe('PaymentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all plan options', () => {
    renderPaymentPage();
    expect(screen.getByText('Basic Plan')).toBeTruthy();
    expect(screen.getByText('Premium Plan')).toBeTruthy();
    expect(screen.getByText('Elite Plan')).toBeTruthy();
  });

  it('shows pricing information', () => {
    renderPaymentPage();
    expect(screen.getByText('$29.99')).toBeTruthy();
    expect(screen.getByText('$49.99')).toBeTruthy();
    expect(screen.getByText('$99.99')).toBeTruthy();
    expect(screen.getAllByText('/month').length).toBe(3);
  });

  it('shows notification about payment system status', () => {
    renderPaymentPage();
    expect(screen.getByText('Payment system currently unavailable - New payment system coming soon')).toBeTruthy();
  });

  it('disables button during payment processing', async () => {
    renderPaymentPage();
    const subscribeButtons = screen.getAllByRole('button', { name: /Subscribe Now/i });
    fireEvent.click(subscribeButtons[0]);
    
    expect(subscribeButtons[0].hasAttribute('disabled')).toBeTruthy();
    expect(screen.getByText('Processing...')).toBeTruthy();
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(subscribeButtons[0].hasAttribute('disabled')).toBeFalsy();
    }, { timeout: 1500 });
  });
});