import { useLocation } from 'react-router-dom';
import type { Lang, T } from './content';

export function useLang() {
  const { pathname } = useLocation();
  const lang: Lang = pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'uk';
  const prefix = lang === 'ru' ? '/ru' : '';
  const t = (value: T) => value[lang];
  // Path of the same page in the other language
  const bare = lang === 'ru' ? pathname.replace(/^\/ru/, '') || '/' : pathname;
  const switchPath = lang === 'ru' ? bare : bare === '/' ? '/ru' : `/ru${bare}`;
  return { lang, prefix, t, switchPath, bare };
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
}
