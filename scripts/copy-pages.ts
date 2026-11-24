import { cp, mkdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const studio = resolve(root, 'parcelstack/studio');
await mkdir(resolve(root, 'dist'), { recursive: true });

for (const entry of ['nyangnyangbox', 'parcelstack', 'pacelstack', 'stuntbiketour', 'app-ads.txt']) {
  await cp(resolve(root, entry), resolve(root, 'dist', entry), {
    recursive: true,
    filter: (source) => source !== studio && !source.startsWith(studio + sep),
  });
}
await cp(resolve(studio, 'assets/OFL-Pretendard.txt'), resolve(root, 'dist/studio-assets/OFL-Pretendard.txt'));
console.log('기존 게임 페이지·정책·지원 페이지·app-ads.txt 복사 완료.');
