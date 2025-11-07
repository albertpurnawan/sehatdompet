import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { screen, theme } from '../../src/theme';
import { ReceiptItemRow, SkeletonList } from '../../src/components/List';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../src/api';

export default function ReceiptDetail(){
  const { id } = useLocalSearchParams<{id:string}>();
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any>();
  useEffect(()=>{
    if(!id) return;
    api.get(`/receipts/${id}`).then(r=> setReceipt(r.data)).finally(()=> setLoading(false));
  },[id]);
  const items = (receipt?.items||[]).map((it:any)=> ({ title: it.raw_name, subtitle: it.category, value: `Rp${it.unit_price.toLocaleString('id-ID')}` }))
  return (
    <ScrollView style={screen.bg} contentContainerStyle={{ padding:16 }}>
      <Text style={{ color: theme.colors.text, fontSize:20, fontWeight:'700' }}>Receipt Detail</Text>
      <View style={{ marginTop:12, padding:16, borderRadius:20, backgroundColor: theme.colors.surface }}>
        {loading ? (
          <View style={{ height:60, borderRadius:12, backgroundColor: theme.colors.muted }} />
        ) : (
          <>
            <Text style={{ color: theme.colors.text }}>{receipt?.merchant}</Text>
            <Text style={{ color: theme.colors.subtext }}>{receipt?.ts}</Text>
            <Text style={{ color: theme.colors.text, fontWeight:'700', marginTop:8 }}>{`Rp${(receipt?.total||0).toLocaleString('id-ID')}`}</Text>
          </>
        )}
      </View>
      <View style={{ marginTop:16 }}>
        {loading ? <SkeletonList rows={6} /> : items.map((it,i)=>(
          <ReceiptItemRow key={i} title={it.title} subtitle={it.subtitle} value={it.value} flags={it.flags} />
        ))}
      </View>
      <View style={{ flexDirection:'row', gap:8, marginTop:16 }}>
        <Pressable style={{ padding:12, borderRadius:16, backgroundColor: theme.colors.muted }}><Text style={{ color: theme.colors.text }}>Koreksi item</Text></Pressable>
        <Pressable style={{ padding:12, borderRadius:16, backgroundColor: theme.colors.muted }}><Text style={{ color: theme.colors.text }}>Hapus foto</Text></Pressable>
        <Pressable style={{ padding:12, borderRadius:16, backgroundColor: theme.colors.primary }}><Text style={{ color: theme.colors.text }}>Lihat rekomendasi</Text></Pressable>
      </View>
    </ScrollView>
  );
}
