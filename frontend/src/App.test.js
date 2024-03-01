import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import fetchMock from 'jest-fetch-mock';
import RegisterForm from './components/RegisterForm';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

console.error = jest.fn();

describe('LoginForm', () => {
  test('Attempt to login with invalid username and password', async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(
      JSON.stringify({ access: 'mockAccessToken', refresh: 'mockRefreshToken' })
    );

    // Mocking fetch API
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Invalid username or password'));

    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText('Invalid username or password')
      ).toBeInTheDocument();
    });
  });

  test('attempt to login with valid username and password', async () => {
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'apple123' } });
    fireEvent.change(passwordInput, { target: { value: 'apple123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(queryByText('Invalid username or password')).toBeNull();
    });
  });

  test('attempt to login with empty username and password', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Find the login button and click it
    const loginButton = getByTestId('login-button');
    fireEvent.click(loginButton);

    // Wait for the validation messages to appear
    await waitFor(() => {
      expect(screen.getByText('Please enter a username')).toBeInTheDocument();
      expect(screen.getByText('Please enter a password')).toBeInTheDocument();
    });
  });
});

describe('RegisterForm', () => {
  test('Attempt to register providing all required fields and valid inputs', async () => {
    // Render the component
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Register'));

    // Wait for the registration process
    await waitFor(() => {
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    // Check if the user is redirected to the login page
    expect(screen.getByText('Already have account?')).toBeInTheDocument();
  });
});

// Restore console.error after all tests
afterAll(() => {
  console.error.mockRestore();
});
