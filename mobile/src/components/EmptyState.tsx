import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';

export function EmptyState({ title, subtitle, cta }:{ title:string; subtitle?:string; cta?:string }){
  return (
    <View style={{ alignItems:'center', padding: 24 }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.muted }} />
      <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight:'600', marginTop: 12 }}>{title}</Text>
      {subtitle && <Text style={{ color: theme.colors.subtext, textAlign:'center', marginTop: 6 }}>{subtitle}</Text>}
      {cta && <Text style={{ color: theme.colors.accent, marginTop: 8 }}>{cta}</Text>}
    </View>
  );
}

