import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { c, Cursor, mix, mono, p, Pill, Scene, Spinner, Window } from './ui';

const RUN = 76; // click "Run backup"
const DONE = 172; // backup finished
const OPEN = 214; // open snapshot drawer

const nav = ['Overview', 'Bases', 'Backups', 'Restore', 'Schema', 'Audit log', 'Settings'];
const history = [
  { id: '#1284', when: 'Today, 06:00', records: '12,280', size: '48.2 MB' },
  { id: '#1283', when: 'Yesterday, 06:00', records: '12,191', size: '47.9 MB' },
  { id: '#1282', when: 'Oct 18, 06:00', records: '12,044', size: '47.1 MB' },
  { id: '#1281', when: 'Oct 17, 06:00', records: '11,962', size: '46.8 MB' },
  { id: '#1280', when: 'Oct 16, 06:00', records: '11,870', size: '46.3 MB' },
];
const cols = '160px 1fr 180px 160px 180px';

const Cell: React.FC<{ children: React.ReactNode; dim?: boolean; style?: React.CSSProperties }> = ({ children, dim, style }) => (
  <div style={{ fontFamily: mono, fontSize: 17, color: dim ? c.muted : c.text, ...style }}>{children}</div>
);

export const Baseout: React.FC = () => {
  const frame = useCurrentFrame();
  const inserted = p(frame, RUN + 4, RUN + 18);
  const progress = interpolate(frame, [RUN + 10, DONE], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const done = frame >= DONE;
  const drawer = p(frame, OPEN + 2, OPEN + 22);
  const press = Math.max(0, 1 - Math.abs(frame - RUN) / 5);

  return (
    <Scene>
      <Window title="app.baseout.io / backups">
        {/* Sidebar */}
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 260, borderRight: `1px solid ${c.line}`, padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fff' }} />
            <div style={{ fontSize: 20, fontWeight: 600 }}>Baseout</div>
          </div>
          {nav.map((n) => (
            <div
              key={n}
              style={{
                fontSize: 17,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 4,
                color: n === 'Backups' ? c.text : c.muted,
                background: n === 'Backups' ? c.raised : 'transparent',
              }}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ position: 'absolute', inset: '0 0 0 260px', padding: '36px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Backups</div>
              <div style={{ fontSize: 17, color: c.muted, marginTop: 6 }}>Marketing CRM · 14 tables · daily at 06:00</div>
            </div>
            <div
              style={{
                height: 44,
                padding: '0 22px',
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
              Run backup
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '0 20px 14px', borderBottom: `1px solid ${c.line}` }}>
            {['Snapshot', 'Created', 'Records', 'Size', 'Status'].map((h) => (
              <Cell key={h} dim style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                {h}
              </Cell>
            ))}
          </div>

          {/* New snapshot row */}
          <div style={{ height: mix(inserted, 0, 68), overflow: 'hidden', opacity: inserted }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: cols,
                alignItems: 'center',
                height: 68,
                padding: '0 20px',
                borderBottom: `1px solid ${c.line}`,
                background: drawer > 0 ? c.raised : 'transparent',
              }}
            >
              <Cell>#1285</Cell>
              <Cell dim>Just now</Cell>
              <Cell>{Math.round(mix(progress, 0, 12408)).toLocaleString('en')}</Cell>
              <Cell dim>{mix(progress, 0, 48.6).toFixed(1)} MB</Cell>
              {done ? (
                <Pill solid>✓ Completed</Pill>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Spinner />
                  <div style={{ width: 110, height: 6, borderRadius: 3, background: c.line2 }}>
                    <div style={{ width: `${progress * 100}%`, height: '100%', borderRadius: 3, background: '#fff' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {history.map((r) => (
            <div
              key={r.id}
              style={{
                display: 'grid',
                gridTemplateColumns: cols,
                alignItems: 'center',
                height: 68,
                padding: '0 20px',
                borderBottom: `1px solid ${c.line}`,
              }}
            >
              <Cell>{r.id}</Cell>
              <Cell dim>{r.when}</Cell>
              <Cell>{r.records}</Cell>
              <Cell dim>{r.size}</Cell>
              <Pill>Completed</Pill>
            </div>
          ))}
        </div>

        {/* Snapshot drawer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 540,
            background: c.panel,
            borderLeft: `1px solid ${c.line2}`,
            padding: 36,
            transform: `translateX(${mix(drawer, 560, 0)}px)`,
            boxShadow: `-40px 0 80px rgba(0,0,0,${0.6 * drawer})`,
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 15, color: c.muted }}>SNAPSHOT #1285</div>
          <div style={{ fontSize: 26, fontWeight: 600, marginTop: 8 }}>Changes since #1284</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            {[
              ['+128', 'added'],
              ['42', 'updated'],
              ['−3', 'deleted'],
            ].map(([n, l], i) => (
              <div
                key={l}
                style={{
                  flex: 1,
                  border: `1px solid ${c.line2}`,
                  borderRadius: 12,
                  padding: 18,
                  opacity: p(frame, OPEN + 14 + i * 5, OPEN + 26 + i * 5),
                }}
              >
                <div style={{ fontFamily: mono, fontSize: 28 }}>{n}</div>
                <div style={{ fontSize: 15, color: c.muted, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 15, color: c.muted, margin: '32px 0 12px' }}>Record history · Leads</div>
          {[
            ['Status', 'Contacted', 'Qualified'],
            ['Owner', 'Maya R.', 'Daniel K.'],
            ['Deal size', '$12,000', '$18,500'],
            ['Next step', '—', 'Send proposal'],
          ].map(([field, from, to], i) => (
            <div
              key={field}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr',
                padding: '14px 0',
                borderTop: `1px solid ${c.line}`,
                fontSize: 17,
                opacity: p(frame, OPEN + 26 + i * 6, OPEN + 38 + i * 6),
              }}
            >
              <span style={{ color: c.muted }}>{field}</span>
              <span style={{ fontFamily: mono }}>
                <span style={{ color: c.dim, textDecoration: 'line-through' }}>{from}</span>
                <span style={{ color: c.muted }}> → </span>
                {to}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: 28,
              height: 48,
              borderRadius: 10,
              border: `1px solid ${c.line2}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
              opacity: p(frame, OPEN + 50, OPEN + 62),
            }}
          >
            Restore this snapshot
          </div>
        </div>
      </Window>

      <Cursor
        path={[
          { f: 0, x: 980, y: 760 },
          { f: 24, x: 980, y: 760 },
          { f: 66, x: 1406, y: 172 },
          { f: 182, x: 1406, y: 172 },
          { f: 206, x: 720, y: 322 },
          { f: 300, x: 720, y: 322 },
        ]}
        clicks={[RUN, OPEN]}
      />
    </Scene>
  );
};
