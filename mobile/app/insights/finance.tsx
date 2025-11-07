import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { screen, theme } from '../../src/theme';
import { api } from '../../src/api';

export default function InsightsFinance(){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  useEffect(()=>{ setLoading(true); api.get('/insights/finance').then(r=>setData(r.data)).finally(()=>setLoading(false)); },[]);
  return (
    <ScrollView style={screen.bg} contentContainerStyle={{ padding:16 }}>
      <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight:'700' }}>This Month’s Summary</Text>
      <View style={{ marginTop:12, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
        <Text style={{ color: theme.colors.text }}>Total: {loading? '...' : `Rp${(data?.total||0).toLocaleString('id-ID')}`}</Text>
        <Text style={{ color: theme.colors.subtext }}>Top categories: {loading? '...' : (data?.top_categories||[]).join(', ')}</Text>
        <Text style={{ color: theme.colors.subtext }}>Top merchants: {loading? '...' : (data?.top_merchants||[]).join(', ')}</Text>
      </View>
      <View style={{ marginTop:16, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
        <Text style={{ color: theme.colors.text, marginBottom:8 }}>Trend chart (placeholder)</Text>
        <View style={{ height:120, borderRadius:12, backgroundColor: theme.colors.muted }} />
      </View>
      {loading ? (
        <View style={{ marginTop:16, height:40, borderRadius:12, backgroundColor: theme.colors.muted }} />
      ) : (
        <View style={{ marginTop:16, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
          <Text style={{ color: theme.colors.text }}>Anomaly: {data?.anomalies?.[0]?.label} (↑{data?.anomalies?.[0]?.delta_pct}%)</Text>
          <Text style={{ color: theme.colors.accent }}>Review</Text>
        </View>
      )}
    </ScrollView>
  );
}
