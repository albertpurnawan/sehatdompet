import React, { useState } from 'react';
import { View, Text, Pressable, Image, Platform } from 'react-native';
import { screen, theme } from '../src/theme';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../src/api';
import { router } from 'expo-router';

export default function Upload(){
  const [image, setImage] = useState<string|undefined>();
  const [status, setStatus] = useState<'idle'|'picking'|'uploading'|'done'|'error'>('idle');

  async function pick(){
    setStatus('picking');
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!perm.granted){ setStatus('idle'); return; }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      // iOS: show Cancel/Done by enabling multi-select UI; we'll use first asset
      allowsMultipleSelection: Platform.OS === 'ios',
      // Editing is ignored when allowsMultipleSelection is true; keep editing for Android only
      allowsEditing: Platform.OS !== 'ios',
      aspect: [4, 3],
      // Present as a sheet on iOS to ensure system toolbar (Cancel/Done) is visible
      presentationStyle: Platform.OS === 'ios' ? ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET : undefined,
    } as any);
    if(!res.canceled && 'assets' in res && res.assets?.length){ setImage(res.assets[0].uri); }
    setStatus('idle');
  }

  async function upload(){
    if(!image) return;
    try{
      setStatus('uploading');
      const form = new FormData();
      // @ts-ignore
      form.append('file', { uri: image, name: 'receipt.jpg', type: 'image/jpeg' });
      const r = await api.post('/receipts:upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('done');
      const id = r.data?.receipt_id;
      if(id){ router.replace(`/receipt/${id}`); } else { router.replace('/(tabs)'); }
    }catch(e){ setStatus('error'); }
  }

  return (
    <View style={[screen.bg, { padding:16 }]}>
      <Text style={{ color: theme.colors.text, fontSize:20, fontWeight:'700', marginBottom:12 }}>Add Receipt</Text>
      {!image && (
        <Pressable onPress={pick} style={{ padding:16, borderRadius:20, backgroundColor: theme.colors.muted }}>
          <Text style={{ color: theme.colors.text, textAlign:'center' }}>Pick from Gallery</Text>
        </Pressable>
      )}
      {image && (
        <View>
          <Image source={{ uri: image }} style={{ width:'100%', height:280, borderRadius:12 }} />
          <View style={{ flexDirection:'row', gap:8, marginTop:12 }}>
            <Pressable style={{ flex:1, padding:12, borderRadius:16, backgroundColor: theme.colors.muted }} onPress={pick}><Text style={{ color: theme.colors.text, textAlign:'center' }}>Change</Text></Pressable>
            <Pressable style={{ flex:1, padding:12, borderRadius:16, backgroundColor: theme.colors.primary }} onPress={upload}><Text style={{ color: theme.colors.text, textAlign:'center' }}>{status==='uploading' ? 'Uploading…' : 'Upload'}</Text></Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
