import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../app/login';
import { router } from 'expo-router';
import { api } from '../src/api';

jest.mock('expo-router', () => ({
  router: { replace: jest.fn(), push: jest.fn() },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(async () => {}),
  getItem: jest.fn(async () => null),
}));

jest.mock('../src/api', () => {
  const axios = require('axios');
  const instance = axios.create();
  return { api: instance };
});

describe('Login screen', () => {
  it('submits and navigates on success', async () => {
    jest.spyOn(api, 'post' as any).mockResolvedValueOnce({ data: { access_token: 'mock.jwt' } });
    render(<Login />);
    fireEvent.press(screen.getByTestId('login-submit'));
    await waitFor(() => expect(router.replace).toHaveBeenCalled());
  });

  it('shows error on failure', async () => {
    (api.post as any) = jest.fn().mockRejectedValueOnce(new Error('bad'));
    render(<Login />);
    fireEvent.press(screen.getByTestId('login-submit'));
    await waitFor(() => expect(screen.getByText('Login gagal')).toBeTruthy());
  });
});
