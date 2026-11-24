import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const vite = await createServer({ cacheDir: 'node_modules/.vite-check', server: { middlewareMode: true, hmr: false }, appType: 'custom' });

try {
  const { default: App } = await vite.ssrLoadModule('/pacelstack/studio/App.tsx');
  const html = renderToStaticMarkup(createElement(App));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, '메인 제목은 하나여야 합니다.');
  assert.ok(html.includes('aria-expanded="false"'), '모바일 메뉴는 닫힌 상태로 시작해야 합니다.');

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (href.startsWith('#')) assert.ok(ids.has(href.slice(1)), `없는 섹션: ${href}`);
    else if (href.startsWith('/')) {
      const target = join(dist, href.endsWith('/') ? `${href}index.html` : href);
      assert.ok((await stat(target)).isFile(), `없는 게임·지원·정책 페이지: ${href}`);
    }
  }

  const images = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]);
  for (const src of new Set(images)) {
    if (src.startsWith('data:image/')) continue;
    assert.ok(src.startsWith('/'), `외부 서버에 의존하는 이미지: ${src}`);
    const file = await readFile(resolve(root, `.${src.split('?')[0]}`));
    if (src.endsWith('.webp')) {
      assert.equal(file.toString('ascii', 0, 4), 'RIFF', `잘못된 WebP 파일: ${src}`);
      assert.equal(file.toString('ascii', 8, 12), 'WEBP', `잘못된 WebP 파일: ${src}`);
    } else if (src.endsWith('.png')) {
      assert.equal(file.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `잘못된 PNG 파일: ${src}`);
    }
  }
  const bikeCard = html.match(/<article class="secondary-game bike-game">[\s\S]*?<\/article>/)?.[0];
  assert.ok(bikeCard?.includes('<img '), 'Stunt Bike Tour 카드에 공식 이미지가 필요합니다.');

  const builtHtml = await readFile(join(dist, 'index.html'), 'utf8');
  for (const match of builtHtml.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
    const target = match[1];
    await stat(join(dist, target.endsWith('/') ? `${target}index.html` : target));
  }

  async function checkCopiedFiles(source: string, destination: string): Promise<void> {
    for (const entry of await readdir(source, { withFileTypes: true })) {
      if (entry.name === 'studio' && source === resolve(root, 'pacelstack')) continue;
      const original = join(source, entry.name);
      const copied = join(destination, entry.name);
      if (entry.isDirectory()) await checkCopiedFiles(original, copied);
      else assert.deepEqual(await readFile(copied), await readFile(original), `기존 파일이 변경됨: ${original}`);
    }
  }

  for (const directory of ['nyangnyangbox', 'pacelstack', 'stuntbiketour']) {
    await checkCopiedFiles(resolve(root, directory), resolve(dist, directory));
  }
  assert.deepEqual(await readFile(join(dist, 'app-ads.txt')), await readFile(join(root, 'app-ads.txt')));

  const assets = await readdir(join(dist, 'studio-assets'));
  for (const file of assets.filter((name) => name.endsWith('.css'))) {
    const cssPath = join(dist, 'studio-assets', file);
    const css = await readFile(cssPath, 'utf8');
    for (const match of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
      if (match[1].startsWith('data:')) continue;
      await stat(match[1].startsWith('/') ? join(dist, match[1]) : resolve(dirname(cssPath), match[1]));
    }
  }
  console.log(`검증 완료: React 렌더링, ${links.length}개 링크, ${images.length}개 이미지, 번들·폰트 경로, 기존 게임 파일 전체 일치.`);
} finally {
  await vite.close();
}
