import React from 'react';
import { useCurrentFrame } from 'remotion';
import { c, Cursor, mix, mono, p, Pill, Scene, type, Window } from './ui';

const transcript = [
  { who: 'Anna · Acme', t: '04:12', text: 'Honestly the price is the hard part for us this quarter.' },
  { who: 'You', t: '04:20', text: 'Makes sense. What would make it an easy yes?' },
  { who: 'Anna · Acme', t: '04:31', text: 'If it synced with HubSpot out of the box, we’d switch tomorrow.' },
  { who: 'Mark · Acme', t: '05:02', text: 'We looked at Gong too, but it felt heavy for a team our size.' },
  { who: 'You', t: '05:15', text: 'Got it — I’ll send a plan for a 12-seat team.' },
];

const insights = [
  { tag: 'Pricing objection', text: 'Budget is tight this quarter — price is the main blocker.', src: '04:12', at: 70 },
  { tag: 'Feature request', text: 'Native HubSpot sync would unlock the deal.', src: '04:31', at: 118 },
  { tag: 'Competitor', text: 'Evaluated Gong, found it too heavy for 12 seats.', src: '05:02', at: 166 },
];

const ASK = 206;
const draft =
  'Hi Anna — thanks for the time today. Based on what you shared, here’s a 12-seat plan with HubSpot sync included from day one…';

export const Bridj: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Scene>
      <Window title="app.bridj.ai / calls / acme-discovery">
        {/* Transcript */}
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 700, borderRight: `1px solid ${c.line}`, padding: '32px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600 }}>Acme × Discovery call</div>
              <div style={{ fontSize: 16, color: c.muted, marginTop: 6 }}>Recorded via Zoom · 32:14 · 3 speakers</div>
            </div>
            <Pill>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#fff', opacity: 0.5 + 0.5 * Math.sin(frame / 5) }} />
              Analyzing
            </Pill>
          </div>
          {transcript.map((l, i) => {
            const t = p(frame, 14 + i * 26, 30 + i * 26);
            const lit = insights.some((s) => s.src === l.t && frame >= s.at);
            return (
              <div
                key={l.t}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 16,
                  padding: '16px 14px',
                  marginBottom: 6,
                  borderRadius: 10,
                  background: lit ? c.raised : 'transparent',
                  border: `1px solid ${lit ? c.line2 : 'transparent'}`,
                  opacity: t,
                  transform: `translateY(${mix(t, 12, 0)}px)`,
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 15, color: c.muted, paddingTop: 2 }}>{l.t}</span>
                <div>
                  <div style={{ fontSize: 15, color: c.muted, marginBottom: 4 }}>{l.who}</div>
                  <div style={{ fontSize: 19, lineHeight: 1.4 }}>{l.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights */}
        <div style={{ position: 'absolute', inset: '0 0 0 700px', padding: '32px 36px' }}>
          <div style={{ fontFamily: mono, fontSize: 15, color: c.muted, marginBottom: 20 }}>INSIGHTS</div>
          {insights.map((s) => {
            const t = p(frame, s.at, s.at + 16);
            return (
              <div
                key={s.tag}
                style={{
                  border: `1px solid ${c.line2}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  marginBottom: 14,
                  opacity: t,
                  transform: `translateX(${mix(t, 24, 0)}px)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{s.tag}</span>
                  <Pill style={{ height: 26, fontSize: 13 }}>↳ {s.src}</Pill>
                </div>
                <div style={{ fontSize: 17, color: c.muted, marginTop: 8, lineHeight: 1.4 }}>{s.text}</div>
              </div>
            );
          })}

          {/* Composer */}
          <div
            style={{
              position: 'absolute',
              left: 36,
              right: 36,
              bottom: 32,
              border: `1px solid ${frame >= ASK ? '#fff' : c.line2}`,
              borderRadius: 14,
              padding: 20,
              minHeight: 150,
            }}
          >
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <Pill solid={frame >= ASK}>✦ Follow-up email</Pill>
              <Pill>Battlecard</Pill>
            </div>
            <div style={{ fontSize: 17, lineHeight: 1.5, color: frame >= ASK + 8 ? c.text : c.dim }}>
              {frame >= ASK + 8 ? type(draft, frame, ASK + 8, ASK + 70) : 'Ask Bridj about this call…'}
              {frame >= ASK + 8 && frame < ASK + 74 && <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>▍</span>}
            </div>
          </div>
        </div>
      </Window>

      <Cursor
        path={[
          { f: 0, x: 1200, y: 420 },
          { f: 170, x: 1200, y: 420 },
          { f: 198, x: 905, y: 790 },
          { f: 300, x: 905, y: 790 },
        ]}
        clicks={[ASK]}
      />
    </Scene>
  );
};
