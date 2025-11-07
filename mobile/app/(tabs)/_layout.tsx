import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../src/theme';

export default function TabsLayout(){
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: { paddingTop: insets.top, backgroundColor: theme.colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title:'SehatDompet' }} />
      <Tabs.Screen name="insights" options={{ title:'Insights' }} />
      <Tabs.Screen name="profile" options={{ title:'Profile' }} />
    </Tabs>
  );
}
