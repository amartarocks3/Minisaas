import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/login';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(),
    };
  },
}));

describe('Login Page', () => {
  it('renders login form correctly', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { level: 1, name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });
});
