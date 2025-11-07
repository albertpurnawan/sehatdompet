import { login, restoreToken } from '../src/auth';
import { api } from '../src/api';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(async () => {}),
  getItem: jest.fn(async () => null),
}));

jest.mock('../src/api', () => {
  const axios = require('axios');
  const instance = axios.create();
  return { api: instance };
});

describe('auth', () => {
  it('login stores token and sets header', async () => {
    jest.spyOn(api, 'post' as any).mockResolvedValueOnce({ data: { access_token: 'mock.jwt' } });
    const token = await login('demo@local', 'password');
    expect(token).toBe('mock.jwt');
    expect((api.defaults.headers as any).common['Authorization']).toBe('Bearer mock.jwt');
  });

  it('restoreToken sets header when token exists', async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    AsyncStorage.getItem.mockResolvedValueOnce('restored.jwt');
    const token = await restoreToken();
    expect(token).toBe('restored.jwt');
    expect((api.defaults.headers as any).common['Authorization']).toBe('Bearer restored.jwt');
  });
});

