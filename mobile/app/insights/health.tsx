import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { screen, theme } from '../../src/theme';
import { ProgressRing } from '../../src/components/ProgressRing';
import { api } from '../../src/api';

export default function InsightsHealth(){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  useEffect(()=>{ setLoading(true); api.get('/insights/health').then(r=>setData(r.data)).finally(()=>setLoading(false)); },[]);
  return (
    <ScrollView style={screen.bg} contentContainerStyle={{ padding:16 }}>
      <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight:'700' }}>Weekly Health Score</Text>
      <View style={{ marginTop:12, alignItems:'center' }}>
        {loading ? (
          <View style={{ width:120, height:120, borderRadius:60, backgroundColor: theme.colors.muted }} />
        ) : (
          <ProgressRing values={[
            { label:'sugar', value: Math.min(1, (data?.sugar_g||0)/300), color: theme.colors.primary },
            { label:'sodium', value: Math.min(1, (data?.sodium_g||0)/2), color: theme.colors.warning },
            { label:'UPF', value: Math.min(1, (data?.upf_pct||0)), color: theme.colors.danger },
          ]} />
        )}
      </View>
      <View style={{ marginTop:16, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
        <Text style={{ color: theme.colors.text }}>Top drivers</Text>
        <Text style={{ color: theme.colors.subtext }}>{loading? '...' : (data?.drivers||[]).map((d:any)=> d.merchant||d.item).join(', ')}</Text>
      </View>
      <View style={{ marginTop:16, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
        <Text style={{ color: theme.colors.text }}>Recommendations</Text>
        <Text style={{ color: theme.colors.subtext }}>Swap: water/unsweetened tea (save Rp80k & −420g sugar/month)</Text>
      </View>
      <Pressable style={{ marginTop:16, padding:16, borderRadius:20, backgroundColor: theme.colors.primary }}>
        <Text style={{ color: theme.colors.text, textAlign:'center' }}>Start 7‑day Challenge</Text>
      </Pressable>
    </ScrollView>
  );
}
