import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export async function login(email:string, password:string){
  const r = await api.post('/auth/login', { email, password });
  const token = r.data?.access_token;
  if(token){ await AsyncStorage.setItem('token', token); api.defaults.headers.common['Authorization'] = `Bearer ${token}`; }
  return token;
}

export async function restoreToken(){
  const token = await AsyncStorage.getItem('token');
  if(token){ api.defaults.headers.common['Authorization'] = `Bearer ${token}`; }
  return token;
}

