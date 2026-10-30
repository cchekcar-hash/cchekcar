import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, Menu, X, Navigation, ArrowLeft } from 'lucide-react';
import { business, catalogue, ui, ui2 } from './content';
import { useLang, track } from './useLang';

export function CallButton({
  className = '',
  label,
  pulse = false,
}: {
  className?: string;
  label?: string;
  pulse?: boolean;
}) {
  const { t } = useLang();
  return (
    <a
      href={`tel:${business.phone}`}
      className={`relative inline-flex items-center justify-center gap-2 rounded-2xl bg-fire px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-fire/40 transition hover:bg-fire-dark ${className}`}>
      {pulse && <span className='absolute inset-0 animate-ping rounded-2xl bg-fire opacity-20' />}
      <Phone className='relative h-5 w-5' />
      <span className='relative'>{label ?? t(ui.call)}</span>
    </a>
  );
}

export function RouteButton({ className = '' }: { className?: string }) {
  const { t } = useLang();
  return (
    <a
      href={business.routeUrl}
      target='_blank'
      rel='noopener noreferrer'
      onClick={() => track('route_click', { destination: 'google_maps' })}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-fg/25 bg-fg/5 px-6 py-4 text-lg font-bold text-fg backdrop-blur transition hover:bg-fg/10 ${className}`}>
      <Navigation className='h-5 w-5' />
      {t(ui.route)}
    </a>
  );
}

// Open/closed status in Kyiv time: Mon-Fri 10:00-19:00
function kyivNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: get('weekday'), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function OpenStatus({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const [now, setNow] = useState(kyivNow);
  useEffect(() => {
    const id = setInterval(() => setNow(kyivNow()), 60_000);
    return () => clearInterval(id);
  }, []);
  const weekday = !['Sat', 'Sun'].includes(now.day);
  const open = weekday && now.minutes >= 600 && now.minutes < 1140;
  const opensToday = weekday && now.minutes < 600;
  const opensMonday = !weekday || (now.day === 'Fri' && now.minutes >= 1140);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
        open ? 'bg-emerald-500/15 text-emerald-300' : 'bg-fg/10 text-ink-200'
      } ${className}`}>
      <span className={`h-2 w-2 rounded-full ${open ? 'animate-pulse bg-emerald-400' : 'bg-ink-400'}`} />
      {open
        ? `${t(ui2.openNow)} ${t(ui2.closesAt)}`
        : `${t(ui2.closedNow)} ${opensToday ? t(ui2.openNext) : opensMonday ? t(ui2.openMonday) : t(ui2.openNext)}`}
    </span>
  );
}

export function Socials({ className = '' }: { className?: string }) {
  const links = [
    { href: business.social.instagram, icon: 'instagram', label: 'Instagram' },
    { href: business.social.tiktok, icon: 'tiktok', label: 'TikTok' },
    { href: business.social.facebook, icon: 'facebook', label: 'Facebook' },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map((l) => (
        <a
          key={l.icon}
          href={l.href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={l.label}
          onClick={() => track('social_click', { network: l.icon })}
          className='flex h-11 w-11 items-center justify-center rounded-xl border border-fg/10 text-ink-200 transition hover:border-fire hover:text-fire'>
          <span
            aria-hidden
            className='block h-5 w-5 bg-current'
            style={{
              WebkitMask: `url(/assets/brands/${l.icon}.svg) center / contain no-repeat`,
              mask: `url(/assets/brands/${l.icon}.svg) center / contain no-repeat`,
            }}
          />
        </a>
      ))}
    </div>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-extrabold tracking-tight text-fg ${className}`}>
      Chek<span className='text-fire'>Car</span>
    </span>
  );
}

const styles = [
  { id: 'dark', label: { uk: 'Темний', ru: 'Тёмный' } },
  { id: 'blue', label: { uk: 'Синій', ru: 'Синий' } },
  { id: 'light', label: { uk: 'Світлий', ru: 'Светлый' } },
];

const backgrounds = [
  { id: 'photo', label: { uk: 'Фото', ru: 'Фото' } },
  { id: 'glow', label: { uk: 'Світло', ru: 'Свет' } },
  { id: 'grid', label: { uk: 'Креслення', ru: 'Чертёж' } },
];

function initial(param: string, options: { id: string }[]) {
  const fromUrl = new URLSearchParams(window.location.search).get(param);
  if (fromUrl && options.some((o) => o.id === fromUrl)) return fromUrl;
  try {
    return localStorage.getItem(`demo-${param}`) ?? options[0].id;
  } catch {
    return options[0].id;
  }
}

function usePersisted(param: 'style' | 'bg', options: { id: string }[]) {
  const [value, setValue] = useState(() => initial(param, options));
  useEffect(() => {
    document.documentElement.dataset[param] = value;
    try {
      localStorage.setItem(`demo-${param}`, value);
    } catch {
      /* storage unavailable */
    }
  }, [param, value]);
  return [value, setValue] as const;
}

// Demo-only switcher so the owner can compare colour and background variants on a phone
function StyleSwitcher() {
  const { t } = useLang();
  const [style, setStyle] = usePersisted('style', styles);
  const [bg, setBg] = usePersisted('bg', backgrounds);
  const [open, setOpen] = useState(false);
  const pill = (active: boolean) =>
    `whitespace-nowrap rounded-full px-2.5 py-1 ${active ? 'bg-fire text-white' : 'text-ink-200'}`;
  if (!open)
    return (
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='fixed right-2 top-[4.5rem] z-30 rounded-full border border-fg/10 bg-ink-800/90 px-3 py-1.5 text-[11px] font-bold text-ink-200 shadow-lg backdrop-blur'>
        🎨 {t({ uk: 'Стиль', ru: 'Стиль' })}
      </button>
    );
  return (
    <div className='fixed right-2 top-[4.5rem] z-30 flex flex-col items-end gap-1 rounded-2xl border border-fg/10 bg-ink-800/90 p-1 text-[11px] font-bold shadow-lg backdrop-blur'>
      <div className='flex gap-0.5'>
        {styles.map((s) => (
          <button key={s.id} type='button' onClick={() => setStyle(s.id)} className={pill(style === s.id)}>
            {t(s.label)}
          </button>
        ))}
        <button type='button' onClick={() => setOpen(false)} className='px-2 text-ink-400' aria-label='Close'>
          ✕
        </button>
      </div>
      <div className='flex gap-0.5'>
        {backgrounds.map((b) => (
          <button key={b.id} type='button' onClick={() => setBg(b.id)} className={pill(bg === b.id)}>
            {t(b.label)}
          </button>
        ))}
      </div>
    </div>
  );
}

const backLabel = { uk: 'Назад', ru: 'Назад' };

// Back button: shown after moving between pages inside the site, returns to the same scroll position
function BackButton() {
  const { t } = useLang();
  const { key } = useLocation();
  const navigate = useNavigate();
  if (key === 'default') return null;
  return (
    <button
      type='button'
      onClick={() => navigate(-1)}
      className='fixed bottom-[4.75rem] left-3 z-50 inline-flex items-center gap-1.5 rounded-full border border-fg/10 bg-ink-800/95 px-4 py-2.5 text-sm font-bold text-fg shadow-lg backdrop-blur hover:border-fire/60 md:bottom-6 md:left-6'>
      <ArrowLeft className='h-4 w-4' /> {t(backLabel)}
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { t, prefix, lang, switchPath } = useLang();
  const [open, setOpen] = useState(false);
  const home = prefix || '/';

  const nav = [
    { href: `${home}#services`, label: t(ui.services) },
    { href: `${home}#how`, label: t(ui.howWeWork) },
    { href: `${home}#why`, label: t(ui.whyUs) },
    { href: `${home}#contacts`, label: t(ui.contacts) },
  ];

  return (
    <div className='demo-bg min-h-screen bg-ink-900 pb-20 font-body text-ink-200 antialiased md:pb-0'>
      <header className='sticky top-0 z-40 border-b border-fg/5 bg-ink-900/85 backdrop-blur-xl'>
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4'>
          <Link to={home} aria-label='ChekCar'>
            <Logo />
          </Link>

          <nav className='hidden items-center gap-7 text-sm font-semibold text-ink-200 md:flex'>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className='transition hover:text-fg'>
                {n.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <Socials className='hidden scale-90 lg:flex' />
            <Link
              to={switchPath}
              className='rounded-lg border border-fg/15 px-2.5 py-1 text-xs font-bold uppercase text-ink-200 hover:text-fg'
              aria-label='Мова / Язык'>
              {lang === 'ru' ? 'UA' : 'RU'}
            </Link>
            <a
              href={`tel:${business.phone}`}
              className='hidden items-center gap-2 rounded-xl bg-fire px-4 py-2 font-bold text-white transition hover:bg-fire-dark sm:flex'>
              <Phone className='h-4 w-4' />
              {business.phoneDisplay}
            </a>
            <button
              type='button'
              className='p-2 text-fg md:hidden'
              aria-label='Меню'
              onClick={() => setOpen(!open)}>
              {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {open && (
          <div className='border-t border-fg/5 bg-ink-900 px-4 pb-6 pt-4 md:hidden'>
            <nav className='flex flex-col gap-3 text-lg font-semibold text-fg'>
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
            </nav>
            <Socials className='mt-5' />
          </div>
        )}
      </header>

      <main>{children}</main>
      <StyleSwitcher />
      <BackButton />

      <footer className='border-t border-fg/5 bg-ink-950 text-ink-400'>
        <div className='mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3'>
          <div>
            <Logo className='text-2xl' />
            <p className='mt-3 text-sm'>{t(ui2.heroText)}</p>
            <Socials className='mt-5' />
          </div>
          <div>
            <div className='mb-3 font-bold text-fg'>{t(ui.services)}</div>
            <ul className='space-y-1.5 text-sm'>
              {catalogue.map((c) => (
                <li key={c.slug}>
                  <Link to={`${prefix}/${c.slug}`} className='hover:text-fg'>
                    {t(c.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-3 text-sm'>
            <div className='mb-3 font-bold text-fg'>{t(ui.contacts)}</div>
            <p className='flex gap-2'>
              <MapPin className='h-4 w-4 shrink-0 text-fire' />
              <span>
                {t(business.address)}
                <br />
                {t(business.addressNote)}
              </span>
            </p>
            <p className='flex gap-2'>
              <Clock className='h-4 w-4 shrink-0 text-fire' />
              <span>
                {t(business.hours)}
                <br />
                {t(business.weekend)}
              </span>
            </p>
            <p className='flex gap-2'>
              <Phone className='h-4 w-4 shrink-0 text-fire' />
              <a href={`tel:${business.phone}`} className='font-bold text-fg'>
                {business.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
        <div className='border-t border-fg/5 py-5 text-center text-xs'>© {new Date().getFullYear()} ChekCar</div>
      </footer>

      {/* Sticky mobile action bar: the call button is always one tap away */}
      <div className='fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.4fr_1fr] gap-2 border-t border-fg/10 bg-ink-900/95 p-2 backdrop-blur-xl md:hidden'>
        <a
          href={`tel:${business.phone}`}
          className='flex items-center justify-center gap-2 rounded-xl bg-fire py-3.5 text-base font-extrabold text-white'>
          <Phone className='h-5 w-5' />
          {t(ui.call)}
        </a>
        <a
          href={business.routeUrl}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => track('route_click', { destination: 'google_maps' })}
          className='flex items-center justify-center gap-2 rounded-xl bg-ink-700 py-3.5 font-bold text-fg'>
          <Navigation className='h-4 w-4' />
          {t(ui.route)}
        </a>
      </div>
    </div>
  );
}
