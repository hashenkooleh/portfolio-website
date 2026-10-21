import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSans } from '@remotion/google-fonts/Geist';
import { loadFont as loadMono } from '@remotion/google-fonts/GeistMono';

export const sans = loadSans('normal', { weights: ['400', '600'], subsets: ['latin'] }).fontFamily;
export const mono = loadMono('normal', { weights: ['400'], subsets: ['latin'] }).fontFamily;

export const c = {
  canvas: '#000',
  panel: '#0a0a0a',
  raised: '#111',
  line: '#222',
  line2: '#333',
  text: '#ededed',
  muted: '#8a8a8a',
  dim: '#555',
};

const outCubic = Easing.bezier(0.22, 1, 0.36, 1);

/** Clamped, eased 0→1 progress between two frames. */
export const p = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: outCubic });

export const mix = (t: number, a: number, b: number) => a + (b - a) * t;

/** Fades the whole scene in and out so the loop is seamless on black. */
export const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = Math.min(p(frame, 0, 18), 1 - p(frame, durationInFrames - 18, durationInFrames));
  return (
    <AbsoluteFill style={{ background: c.canvas, fontFamily: sans, color: c.text }}>
      <AbsoluteFill style={{ opacity, padding: 64 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Window: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: c.panel,
      border: `1px solid ${c.line2}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 40px 120px rgba(255,255,255,0.04)',
    }}
  >
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 20px',
        borderBottom: `1px solid ${c.line}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c.line2 }} />
      ))}
      <div style={{ flex: 1, textAlign: 'center', fontFamily: mono, fontSize: 15, color: c.muted, marginRight: 60 }}>
        {title}
      </div>
    </div>
    <div style={{ position: 'absolute', inset: '48px 0 0 0' }}>{children}</div>
  </div>
);

type Point = { f: number; x: number; y: number };

/** Pointer that glides between keyframes and dips on clicks. */
export const Cursor: React.FC<{ path: Point[]; clicks?: number[] }> = ({ path, clicks = [] }) => {
  const frame = useCurrentFrame();
  let x = path[0].x;
  let y = path[0].y;
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    if (frame >= a.f) {
      const t = p(frame, a.f, b.f);
      x = mix(t, a.x, b.x);
      y = mix(t, a.y, b.y);
    }
  }
  const press = clicks.reduce((s, f) => Math.max(s, 1 - Math.abs(frame - f) / 4), 0);
  const ring = clicks.map((f) => ({ f, t: (frame - f) / 14 })).find(({ t }) => t >= 0 && t <= 1);
  return (
    <>
      {ring && (
        <div
          style={{
            position: 'absolute',
            left: x - 22,
            top: y - 22,
            width: 44,
            height: 44,
            borderRadius: 22,
            border: '2px solid #fff',
            opacity: 1 - ring.t,
            transform: `scale(${0.4 + ring.t})`,
          }}
        />
      )}
      <svg
        width={28}
        height={28}
        viewBox="0 0 24 24"
        style={{ position: 'absolute', left: x - 4, top: y - 2, transform: `scale(${1 - press * 0.15})`, transformOrigin: '4px 2px' }}
      >
        <path d="M4 2l16 9.5-7 1.6-3.6 6.4L4 2z" fill="#fff" stroke="#000" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </>
  );
};

export const Pill: React.FC<{ children: React.ReactNode; solid?: boolean; style?: React.CSSProperties }> = ({
  children,
  solid,
  style,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 30,
      padding: '0 12px',
      borderRadius: 15,
      fontSize: 15,
      fontFamily: mono,
      background: solid ? '#fff' : 'transparent',
      color: solid ? '#000' : c.muted,
      border: `1px solid ${solid ? '#fff' : c.line2}`,
      ...style,
    }}
  >
    {children}
  </span>
);

export const Spinner: React.FC<{ size?: number }> = ({ size = 16 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        border: `2px solid ${c.line2}`,
        borderTopColor: '#fff',
        transform: `rotate(${frame * 14}deg)`,
      }}
    />
  );
};

/** Reveals `text` character by character between two frames. */
export const type = (text: string, frame: number, start: number, end: number) =>
  text.slice(0, Math.round(text.length * interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
