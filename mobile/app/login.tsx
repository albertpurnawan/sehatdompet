import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { screen, theme } from '../src/theme';
import { login, restoreToken } from '../src/auth';
import { router } from 'expo-router';

export default function Login(){
  const [email, setEmail] = useState('demo@local');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{ restoreToken().then(t=>{ if(t) router.replace('/(tabs)'); }); },[]);

  async function onSubmit(){
    setLoading(true); setError('');
    try{ const t = await login(email, password); if(t) router.replace('/(tabs)'); }
    catch(e){ setError('Login gagal'); }
    finally{ setLoading(false); }
  }

  return (
    <View style={[screen.bg, { padding:16 }]}>
      <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight:'700', marginBottom: 12 }}>Sign In</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={theme.colors.subtext}
        style={{ height:42, borderRadius:12, borderWidth:1, borderColor: theme.colors.muted, color: theme.colors.text, paddingHorizontal:12, marginBottom:8 }} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry placeholderTextColor={theme.colors.subtext}
        style={{ height:42, borderRadius:12, borderWidth:1, borderColor: theme.colors.muted, color: theme.colors.text, paddingHorizontal:12 }} />
      {error ? <Text style={{ color: theme.colors.danger, marginTop:8 }}>{error}</Text> : null}
      <Pressable accessibilityRole="button" testID="login-submit" onPress={onSubmit} style={{ marginTop:12, padding:12, borderRadius:16, backgroundColor: theme.colors.primary }}>
        <Text style={{ color: theme.colors.text, textAlign:'center' }}>{loading ? 'Processing…' : 'Sign In'}</Text>
      </Pressable>
    </View>
  );
}
