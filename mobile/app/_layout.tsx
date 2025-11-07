import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { StatusBar } from 'expo-status-bar';
import { restoreToken } from '../src/auth';

function RootStack({ initialRoute }: { initialRoute: 'login'|'(tabs)' }){
  const insets = useSafeAreaInsets();
  return (
    <Stack
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        contentStyle: { paddingTop: insets.top, backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="receipt/[id]" />
      <Stack.Screen name="insights/finance" />
      <Stack.Screen name="insights/health" />
    </Stack>
  );
}

export default function RootLayout(){
  const [initialRoute, setInitialRoute] = useState<'login'|'(tabs)'>('login');
  useEffect(()=>{ restoreToken().then(t=> setInitialRoute(t ? '(tabs)' : 'login')); },[]);
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={theme.colors.bg} translucent />
      <RootStack initialRoute={initialRoute} />
    </SafeAreaProvider>
  );
}
