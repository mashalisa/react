import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { test, expect, vi } from 'vitest';
import * as api from '../../../config/api/ManageAPIAuth';
import { AuthContext } from '../../../contexts/AuthContext';

test('renders login page', async () => {
   
    const mockSetUser = vi.fn();

    vi.spyOn(api, 'login').mockResolvedValue({
        success: true,
        data: {
          user: { id: '65fbc7da-c9c3-472f-9669-17351f702166', user_name: 'test', email: 'test@test.com' }
        }
      });
      
    //   vi.spyOn(api, 'login') replace // src/api/auth.js
    //   export async function login(data, path) {
    //     return fetch(`http://api.com/${path}`, {
    //       method: 'POST',
    //       body: JSON.stringify(data),
    //       headers: { 'Content-Type': 'application/json' }
    //     }).then(res => res.json());
    //   }

    render(
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      );

    fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@test.com' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'test' }
      });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(api.login).toHaveBeenCalledWith(
          { email: 'test@test.com', password: 'test' },
          'login'
        );
      });
      expect(mockSetUser).toHaveBeenCalled(); // User should be set on success
});

test('failed login shows error message', async () => {
    const mockSetUser = vi.fn();
  
    vi.spyOn(api, 'login').mockResolvedValue({
      success: false,
      message: 'wrong credentials',
    });
  
    render(
      <AuthContext.Provider value={{ setUser: mockSetUser }}>
        <Login />
      </AuthContext.Provider>
    );
  
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test2@test.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'test2' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith(
        { email: 'test2@test.com', password: 'test2' },
        'login'
      );
    });
  
    // Check error message is shown
    await waitFor(() => {
      expect(screen.getByText(/wrong credentials/i)).toBeInTheDocument();
    });
  
    expect(mockSetUser).not.toHaveBeenCalled(); // User should NOT be set on failure
  });

  test('shows validation error if email is empty', async () => {
    const mockSetUser = vi.fn();
  
    vi.spyOn(api, 'login').mockResolvedValue({
      success: false,
      message: 'email or password is empty',
    });
  
    render(
      <AuthContext.Provider value={{ setUser: mockSetUser }}>
        <Login />
      </AuthContext.Provider>
    );
  
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: '' }
    });
  
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'test' }
    });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
        expect(api.login).toHaveBeenCalledWith( //This checks that  login function was called exactly once with the values you expect from the form.
          { email: '', password: 'test' },
          'login'
        );
      });
  
   // Confirm error message is visible
   //Verifies that an element with role="alert" appears in the DOM (usually for error messages).
  expect(await screen.findByRole('alert')).toHaveTextContent(/email or password is empty/i); 

  // Confirm user wasn't logged in
  expect(mockSetUser).not.toHaveBeenCalled();
  });
  