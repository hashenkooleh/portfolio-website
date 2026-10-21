import React from 'react';
import { useCurrentFrame } from 'remotion';
import { c, Cursor, mix, mono, p, Pill, Scene, Spinner, Window } from './ui';

const PICK_REGION = 44;
const PICK_PLAN = 82;
const DEPLOY = 118;
const SWITCH = 130; // form → instances list
const RUNNING = 196;

const regions = ['Almaty', 'Tashkent', 'Bishkek', 'Frankfurt'];
const plans = [
  { name: 'Basic', spec: '2 vCPU · 4 GB', price: '$12' },
  { name: 'General', spec: '4 vCPU · 16 GB', price: '$48' },
  { name: 'Compute', spec: '8 vCPU · 32 GB', price: '$96' },
  { name: 'GPU', spec: 'L4 · 24 GB VRAM', price: '$410' },
];
const servers = [
  { name: 'api-prod-01', ip: '10.12.0.4', region: 'Almaty', cpu: 38 },
  { name: 'api-prod-02', ip: '10.12.0.5', region: 'Almaty', cpu: 41 },
  { name: 'db-primary', ip: '10.12.0.9', region: 'Tashkent', cpu: 22 },
];

const Spark: React.FC<{ seed: number; live?: number }> = ({ seed, live = 1 }) => {
  const frame = useCurrentFrame();
  const pts = Array.from({ length: 24 }, (_, i) => {
    const v = 0.5 + 0.28 * Math.sin((i + frame / 6) * 0.7 + seed) + 0.12 * Math.sin(i * 1.9 + seed * 3);
    return `${i * 8},${36 - v * 30}`;
  });
  const n = Math.max(2, Math.round(24 * live));
  return (
    <svg width={184} height={40}>
      <polyline points={pts.slice(0, n).join(' ')} fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
};

const Row: React.FC<{ cells: React.ReactNode[]; head?: boolean; hi?: boolean; style?: React.CSSProperties }> = ({ cells, head, hi, style }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '240px 170px 150px 210px 1fr',
      alignItems: 'center',
      height: head ? 44 : 72,
      padding: '0 20px',
      borderBottom: `1px solid ${c.line}`,
      background: hi ? c.raised : 'transparent',
      fontFamily: mono,
      fontSize: head ? 14 : 17,
      color: head ? c.muted : c.text,
      textTransform: head ? 'uppercase' : 'none',
      letterSpacing: head ? 1 : 0,
      ...style,
    }}
  >
    {cells.map((cell, i) => (
      <div key={i}>{cell}</div>
    ))}
  </div>
);

export const ProData: React.FC = () => {
  const frame = useCurrentFrame();
  const sw = p(frame, SWITCH, SWITCH + 16);
  const added = p(frame, SWITCH + 12, SWITCH + 28);
  const running = frame >= RUNNING;
  const press = Math.max(0, 1 - Math.abs(frame - DEPLOY) / 5);

  return (
    <Scene>
      <Window title="console.pro-data.tech / compute">
        {/* Sidebar */}
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 230, borderRight: `1px solid ${c.line}`, padding: 28 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 32 }}>Pro-Data</div>
          {['Compute', 'Kubernetes', 'Storage', 'Networking', 'Monitoring', 'Billing'].map((n) => (
            <div
              key={n}
              style={{
                fontSize: 17,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 4,
                color: n === 'Compute' ? c.text : c.muted,
                background: n === 'Compute' ? c.raised : 'transparent',
              }}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Create server form */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 0 230px',
            padding: '36px 40px',
            opacity: 1 - sw,
            transform: `translateY(${mix(sw, 0, -16)}px)`,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Create server</div>
          <div style={{ fontSize: 17, color: c.muted, marginTop: 6 }}>Ubuntu 24.04 LTS · SSH key: oleh@mbp</div>

          <div style={{ fontFamily: mono, fontSize: 14, color: c.muted, margin: '36px 0 14px', letterSpacing: 1 }}>REGION</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {regions.map((r, i) => {
              const on = i === 1 && frame >= PICK_REGION;
              return (
                <div
                  key={r}
                  style={{
                    width: 200,
                    height: 56,
                    borderRadius: 10,
                    border: `1px solid ${on ? '#fff' : c.line2}`,
                    background: on ? c.raised : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 18px',
                    fontSize: 17,
                    color: on ? c.text : c.muted,
                  }}
                >
                  {r}
                </div>
              );
            })}
          </div>

          <div style={{ fontFamily: mono, fontSize: 14, color: c.muted, margin: '36px 0 14px', letterSpacing: 1 }}>PLAN</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {plans.map((pl, i) => {
              const on = i === 1 && frame >= PICK_PLAN;
              return (
                <div
                  key={pl.name}
                  style={{
                    height: 170,
                    borderRadius: 14,
                    border: `1px solid ${on ? '#fff' : c.line2}`,
                    background: on ? c.raised : 'transparent',
                    padding: 22,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 600 }}>{pl.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 15, color: c.muted, marginTop: 6 }}>{pl.spec}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 26 }}>
                    {pl.price}
                    <span style={{ fontSize: 15, color: c.muted }}> /mo</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 24, marginTop: 40 }}>
            <span style={{ fontFamily: mono, fontSize: 17, color: c.muted }}>
              Total {frame >= PICK_PLAN ? '$48.00' : '$0.00'} /mo
            </span>
            <div
              style={{
                height: 48,
                padding: '0 28px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 10,
                background: '#fff',
                color: '#000',
                fontSize: 17,
                fontWeight: 600,
                transform: `scale(${1 - press * 0.05})`,
              }}
            >
              Deploy server
            </div>
          </div>
        </div>

        {/* Instances list */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 0 230px',
            padding: '36px 40px',
            opacity: sw,
            transform: `translateY(${mix(sw, 16, 0)}px)`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Servers</div>
              <div style={{ fontSize: 17, color: c.muted, marginTop: 6 }}>4 running · $186.00 /mo</div>
            </div>
            <Pill>Last 1h</Pill>
          </div>
          <Row head cells={['Name', 'Private IP', 'Region', 'Status', 'CPU']} />
          <div style={{ height: mix(added, 0, 72), overflow: 'hidden', opacity: added }}>
            <Row
              hi
              cells={[
                'web-prod-04',
                running ? '10.14.0.2' : '—',
                'Tashkent',
                running ? (
                  <Pill solid>● Running</Pill>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: c.muted }}>
                    <Spinner /> Provisioning
                  </span>
                ),
                running ? <Spark seed={7} live={p(frame, RUNNING, RUNNING + 50)} /> : <span style={{ color: c.dim }}>—</span>,
              ]}
            />
          </div>
          {servers.map((s, i) => (
            <Row key={s.name} cells={[s.name, s.ip, s.region, <Pill>● Running</Pill>, <Spark seed={i * 2.3} />]} />
          ))}
        </div>
      </Window>

      <Cursor
        path={[
          { f: 0, x: 900, y: 820 },
          { f: 18, x: 900, y: 820 },
          { f: 40, x: 640, y: 321 },
          { f: 58, x: 640, y: 321 },
          { f: 78, x: 690, y: 500 },
          { f: 94, x: 690, y: 500 },
          { f: 114, x: 1410, y: 642 },
          { f: 150, x: 1410, y: 642 },
          { f: 190, x: 1060, y: 470 },
          { f: 300, x: 1060, y: 470 },
        ]}
        clicks={[PICK_REGION, PICK_PLAN, DEPLOY]}
      />
    </Scene>
  );
};
