// Meta (Facebook/Instagram) and TikTok pixels. Pixel IDs are public (they appear in the page
// source anyway); the environment (VITE_META_PIXEL_ID, VITE_TIKTOK_PIXEL_ID) can override them.

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded?: boolean; version?: string; push?: unknown };
type Ttq = Record<string, unknown> & { track: (...a: unknown[]) => void; page: () => void; load: (id: string) => void };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    ttq?: Ttq;
    TiktokAnalyticsObject?: string;
    pixelTrack?: (event: string, params?: Record<string, unknown>) => void;
  }
}

const META_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || '1103547352274019';
const TIKTOK_ID = (import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined) || 'DBJ2NCBC77U38B7LS110';

// Site events -> standard events of each platform
const metaEvents: Record<string, string> = {
  phone_click: 'Contact',
  messenger_click: 'Contact',
  booking_form_submit: 'Lead',
  route_click: 'FindLocation',
};
const tiktokEvents: Record<string, string> = {
  phone_click: 'Contact',
  messenger_click: 'Contact',
  booking_form_submit: 'SubmitForm',
  route_click: 'ClickButton',
};

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function initMeta(id: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = window._fbq = fbq;
  loadScript('https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', id);
}

// TikTok's own base code (from Events Manager), unminified: queues calls until events.js loads
/* eslint-disable @typescript-eslint/no-explicit-any -- mirrors TikTok's untyped snippet */
function initTiktok(id: string) {
  if (window.ttq) return;
  const w = window as unknown as Record<string, any>;
  w.TiktokAnalyticsObject = 'ttq';
  const ttq: any = (w.ttq = w.ttq || []);
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
  ttq.setAndDefer = (target: any, method: string) => {
    target[method] = (...args: unknown[]) => target.push([method, ...args]);
  };
  ttq.methods.forEach((m: string) => ttq.setAndDefer(ttq, m));
  ttq.instance = (t: string) => {
    const e = ttq._i[t] || [];
    ttq.methods.forEach((m: string) => ttq.setAndDefer(e, m));
    return e;
  };
  ttq.load = (e: string, n?: Record<string, unknown>) => {
    const r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    const o = n && (n as any).partner;
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
    ttq._i[e]._u = r;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[e] = n || {};
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = `${r}?sdkid=${e}&lib=ttq`;
    const first = document.getElementsByTagName('script')[0];
    first.parentNode!.insertBefore(s, first);
    if (o) ttq._p = o;
  };
  ttq.load(id);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function initPixels() {
  if (META_ID) initMeta(META_ID);
  if (TIKTOK_ID) initTiktok(TIKTOK_ID);
  window.pixelTrack = pixelTrack;
}

export function pixelPageView() {
  window.fbq?.('track', 'PageView');
  window.ttq?.page();
}

export function pixelTrack(event: string, params: Record<string, unknown> = {}) {
  if (window.fbq) {
    if (metaEvents[event]) window.fbq('track', metaEvents[event], params);
    else window.fbq('trackCustom', event, params);
  }
  if (window.ttq && tiktokEvents[event]) window.ttq.track(tiktokEvents[event], params);
}
