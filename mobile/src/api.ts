import axios from 'axios';

const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';
export const api = axios.create({ baseURL: base + '/v1' });

