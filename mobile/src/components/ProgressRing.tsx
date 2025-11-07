import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '../theme';

export function ProgressRing({ size=120, thickness=10, values }:{ size?:number; thickness?:number; values:{ label:string; value:number; color:string }[] }){
  const c = size/2;
  const r = c - thickness/2;
  const L = 2*Math.PI*r;
  return (
    <Svg width={size} height={size}>
      <Circle cx={c} cy={c} r={r} stroke={theme.colors.muted} strokeWidth={thickness} fill="none" />
      {values.map((v,i)=>{
        const gap = 6; const start = (L/values.length)*i + gap; const arc = (L/values.length)-gap*2; const prog = Math.max(0, Math.min(arc, arc*v.value));
        return (
          <Circle key={i} cx={c} cy={c} r={r} stroke={v.color} strokeWidth={thickness}
            strokeDasharray={`${prog} ${L}`} strokeDashoffset={L - start} strokeLinecap="round" fill="none" />
        )
      })}
    </Svg>
  )
}

