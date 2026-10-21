// Renders every composition to ../public/previews as mp4 + a poster frame.
import { execSync } from 'node:child_process';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['baseout', 'bridj', 'prodata'];
const out = '../public/previews';
const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

for (const id of ids) {
  run(`npx remotion render src/index.ts ${id} ${out}/${id}.mp4 --port=3456 --codec=h264 --crf=26 --scale=0.75`);
  run(`npx remotion still src/index.ts ${id} ${out}/${id}.jpg --port=3456 --frame=150 --scale=0.75 --jpeg-quality=85`);
}
