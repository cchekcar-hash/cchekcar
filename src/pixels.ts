// Meta (Facebook/Instagram) and TikTok pixels. They load only when their IDs are set
// in the environment (VITE_META_PIXEL_ID, VITE_TIKTOK_PIXEL_ID), so ads on those
// platforms can be connected later without changing the site.

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

const META_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const TIKTOK_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined;

// Site events -> standard events of each platform
const metaEvents: Record<string, string> = {
  phone_click: 'Contact',
  booking_form_submit: 'Lead',
  route_click: 'FindLocation',
};
const tiktokEvents: Record<string, string> = {
  phone_click: 'Contact',
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

function initTiktok(id: string) {
  if (window.ttq) return;
  const queue: unknown[][] = [];
  const methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
  const ttq = queue as unknown as Ttq;
  methods.forEach((m) => {
    ttq[m] = (...args: unknown[]) => queue.push([m, ...args]);
  });
  window.TiktokAnalyticsObject = 'ttq';
  window.ttq = ttq;
  loadScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(id)}&lib=ttq`);
}

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
