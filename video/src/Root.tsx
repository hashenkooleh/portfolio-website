import React from 'react';
import { Composition } from 'remotion';
import { Baseout } from './Baseout';
import { Bridj } from './Bridj';
import { ProData } from './ProData';

// 16:10 to match the preview frame on the site.
const size = { width: 1600, height: 1000, fps: 30, durationInFrames: 300 };

export const Root: React.FC = () => (
  <>
    <Composition id="baseout" component={Baseout} {...size} />
    <Composition id="bridj" component={Bridj} {...size} />
    <Composition id="prodata" component={ProData} {...size} />
  </>
);
