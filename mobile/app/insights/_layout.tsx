import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../src/theme';

export default function InsightsLayout(){
  const insets = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        contentStyle: { paddingTop: insets.top, backgroundColor: theme.colors.bg },
      }}
    />
  );
}
