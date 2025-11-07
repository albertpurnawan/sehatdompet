import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme, card } from '../theme';

export function StatCard({ title, value, delta, cta, onPress }:{ title:string; value:string; delta?:string; cta?:string; onPress?:()=>void }){
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'baseline' }}>
        <Text style={styles.value}>{value}</Text>
        {delta && <Text style={styles.delta}>{delta}</Text>}
      </View>
      {cta && (
        <Pressable onPress={onPress} accessibilityRole="button"><Text style={styles.cta}>{cta}</Text></Pressable>
      )}
    </View>
  );
}

export function BudgetCard({ category, spent, limit, percent, cta, onPress }:{category:string; spent:string; limit:string; percent:number; cta?:string; onPress?:()=>void}){
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Budget: {category}</Text>
      <Text style={styles.value}>{spent}/{limit} ({Math.round(percent*100)}%)</Text>
      {cta && (
        <Pressable onPress={onPress} accessibilityRole="button"><Text style={styles.cta}>{cta}</Text></Pressable>
      )}
    </View>
  );
}

export function HealthCard({ summary, cta, onPress }:{summary:string; cta?:string; onPress?:()=>void}){
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Health</Text>
      <Text style={styles.value}>{summary}</Text>
      {cta && (
        <Pressable onPress={onPress} accessibilityRole="button"><Text style={styles.cta}>{cta}</Text></Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { ...card.base },
  title: { fontSize: 16, fontWeight:'600', color: theme.colors.text, marginBottom: 8 },
  value: { fontSize: 20, fontWeight:'700', color: theme.colors.text },
  delta: { fontSize: 14, color: theme.colors.subtext },
  cta: { marginTop: 8, color: theme.colors.accent }
});
