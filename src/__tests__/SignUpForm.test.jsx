import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from '../pages/signup'; // Adjust path as needed

// Mock next/router for useRouter hook
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(),
    };
  },
}));

describe('Signup Form', () => {
  it('renders signup form correctly', () => {
  render(<SignupForm />);
  // Fix the regex to match 'Sign Up' instead of 'Signup'
  expect(screen.getByRole('heading', { level: 2, name: /sign up/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});


  it('updates input values on change', () => {
    render(<SignupForm />);
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    expect(nameInput.value).toBe('Alice');

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    expect(emailInput.value).toBe('alice@example.com');

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    expect(passwordInput.value).toBe('mypassword');
  });
});
