// Build-time renderer: turns each route into static HTML (see scripts/prerender.mjs)
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { localBusiness, ssrHead } from './demo/Seo';

export function render(url: string) {
  ssrHead.current = null;
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
  const head = ssrHead.current;
  return { html, head, business: head ? localBusiness(head.lang) : null };
}
