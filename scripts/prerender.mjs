// Writes a static HTML file per route so crawlers and link previews see the page text without running JS
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://chekcar-sto.com.ua';
const { render } = await import(path.join(root, 'dist-ssr/entry-server.js'));

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const routes = [...new Set([...sitemap.matchAll(/<loc>https:\/\/chekcar-sto\.com\.ua([^<]*)<\/loc>/g)].map((m) => m[1] || '/'))];
routes.push('/privacy', '/ru/privacy');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

for (const route of routes) {
  const { html, head, business } = render(route);
  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (head) {
    const { lang, bare, title, description, faq } = head;
    const ukUrl = `${SITE}${bare}`;
    const ruUrl = `${SITE}${bare === '/' ? '/ru' : `/ru${bare}`}`;
    const url = lang === 'ru' ? ruUrl : ukUrl;
    page = page
      .replace(/<html lang="[^"]*"/, `<html lang="${lang === 'ru' ? 'ru' : 'uk'}"`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`)
      .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`)
      .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${lang === 'ru' ? 'ru_UA' : 'uk_UA'}" />`)
      .replace(/<script type="application\/ld\+json" id="ld-business">[\s\S]*?<\/script>/, () => `<script type="application/ld+json" id="ld-business">${json(business)}</script>`);
    let extra = `<link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="uk" href="${ukUrl}" />
    <link rel="alternate" hreflang="ru" href="${ruUrl}" />
    <link rel="alternate" hreflang="x-default" href="${ukUrl}" />`;
    if (faq && faq.length) {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      };
      extra += `\n    <script type="application/ld+json" id="ld-faq">${json(ld)}</script>`;
    }
    page = page.replace('</head>', `    ${extra}\n  </head>`);
  }
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), page);
  console.log('prerendered', route, '→', file, head ? '' : '(no head)');
}
