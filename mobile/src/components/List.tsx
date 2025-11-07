import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export function ReceiptItemRow({ title, subtitle, value, flags }:{ title:string; subtitle?:string; value?:string; flags?:string[] }){
  return (
    <View style={styles.row}>
      <View style={{ flex:1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {flags && flags.length>0 && (
          <View style={{ flexDirection:'row', gap:8, marginTop: 6 }}>
            {flags.map((f,i)=> <View key={i} style={styles.flag}><Text style={styles.flagText}>{f}</Text></View>)}
          </View>
        )}
      </View>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
  );
}

export function SkeletonList({ rows=6 }:{ rows?: number }){
  return (
    <View>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={styles.skelRow} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.muted },
  title: { color: theme.colors.text, fontSize: 16, fontWeight:'500' },
  subtitle: { color: theme.colors.subtext, fontSize: 12 },
  value: { color: theme.colors.text, fontSize: 16, fontWeight:'600' },
  flag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: theme.colors.muted },
  flagText: { color: theme.colors.subtext, fontSize: 12 },
  skelRow: { height: 18, borderRadius: 6, backgroundColor: theme.colors.muted, marginVertical: 8 }
});

