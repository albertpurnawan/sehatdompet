import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { screen, theme } from '../../src/theme';
import { EmptyState } from '../../src/components/EmptyState';
import { StatCard, BudgetCard, HealthCard } from '../../src/components/Cards';
import { router } from 'expo-router';
import { api } from '../../src/api';
import { useEffect, useState } from 'react';

export default function Home(){
  const [loading, setLoading] = useState(false);
  const [finance, setFinance] = useState<any>();
  const [budgets, setBudgets] = useState<any[]>([]);
  const [reco, setReco] = useState<any[]>([]);
  useEffect(()=>{
    setLoading(true);
    Promise.all([
      api.get('/insights/finance'),
      api.get('/budgets'),
      api.get('/reco/today')
    ]).then(([f,b,rc])=>{ setFinance(f.data); setBudgets(b.data||[]); setReco(rc.data||[]); }).finally(()=> setLoading(false));
  },[]);
  return (
    <ScrollView style={screen.bg} contentContainerStyle={{ padding:16 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight:'700' }}>SehatDompet</Text>
        <Pressable accessibilityRole="button" onPress={()=>router.push('/(tabs)/profile')}><Text style={{ color: theme.colors.accent }}>Profil</Text></Pressable>
      </View>

      <View style={{ gap: 12 }}>
        <StatCard title="Health Score" value="78" delta="↑2" cta="Lihat detail" />
        <BudgetCard category={budgets[0]?.category || 'Makanan'} spent={loading? '...' : `Rp${(budgets[0]?.actual||1250000).toLocaleString('id-ID')}`} limit={`Rp${(budgets[0]?.limit||1500000).toLocaleString('id-ID')}`} percent={(budgets[0]?.actual||1250000)/(budgets[0]?.limit||1500000)} cta="Atur" />
        <HealthCard summary="Gula minggu ini 230g (↑30%)" cta="Target <2x" />
        {reco.map((r)=>(
          <HealthCard key={r.id} summary={r.title} cta={r.actions?.[0]?.label} onPress={async()=>{
            try{ await api.post(`/reco/${r.id}/action`, { id:r.id, action:r.actions?.[0]?.id, payload:r.actions?.[0]?.payload }); }
            catch(e){ /* could show toast */ }
          }} />
        ))}
        <Pressable accessibilityRole="button" style={{ padding: 16, borderRadius: 20, backgroundColor: theme.colors.muted }} onPress={()=>router.push('/upload')}>
          <Text style={{ color: theme.colors.text, textAlign:'center' }}>+ Add receipt</Text>
        </Pressable>
      </View>
      {!finance && !loading && (
        <EmptyState title="No data yet" subtitle="Upload a receipt to start seeing financial & health insights." cta="+ Add receipt" />
      )}
    </ScrollView>
  );
}
