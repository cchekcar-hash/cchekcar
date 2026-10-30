import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Menu, X, Navigation, Instagram, Facebook } from 'lucide-react';
import { business, services, ui } from './content';
import { useLang, track } from './useLang';

export function CallButton({ className = '', label }: { className?: string; label?: string }) {
  const { t } = useLang();
  return (
    <a
      href={`tel:${business.phone}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-brand-orange-dark ${className}`}>
      <Phone className='h-5 w-5' />
      {label ?? t(ui.call)}
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
      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-6 py-4 text-lg font-bold text-white transition hover:bg-white/10 ${className}`}>
      <Navigation className='h-5 w-5' />
      {t(ui.route)}
    </a>
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
    <div className='min-h-screen bg-white pb-20 text-text-dark md:pb-0'>
      <header className='sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur'>
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4'>
          <Link to={home} className='text-2xl font-extrabold tracking-tight text-brand-blue'>
            Chek<span className='text-brand-orange'>Car</span>
          </Link>

          <nav className='hidden items-center gap-6 text-sm font-semibold md:flex'>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className='hover:text-brand-blue'>
                {n.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-3'>
            <Link
              to={switchPath}
              className='rounded-lg border border-border px-2 py-1 text-xs font-bold uppercase text-text-light hover:text-brand-blue'
              aria-label='Мова / Язык'>
              {lang === 'ru' ? 'UA' : 'RU'}
            </Link>
            <a
              href={`tel:${business.phone}`}
              className='hidden items-center gap-2 font-bold text-brand-blue sm:flex'>
              <Phone className='h-4 w-4' />
              {business.phoneDisplay}
            </a>
            <button
              type='button'
              className='p-2 md:hidden'
              aria-label='Меню'
              onClick={() => setOpen(!open)}>
              {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {open && (
          <div className='border-t border-border bg-white px-4 py-4 md:hidden'>
            <nav className='flex flex-col gap-3 font-semibold'>
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
              <div className='mt-2 border-t border-border pt-3 text-sm font-normal text-text-light'>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`${prefix}/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className='block py-1 hover:text-brand-blue'>
                    {t(s.name)}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer id='contacts-footer' className='bg-text-dark text-gray-300'>
        <div className='mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3'>
          <div>
            <div className='mb-3 text-2xl font-extrabold text-white'>
              Chek<span className='text-brand-orange'>Car</span>
            </div>
            <p className='text-sm'>{t(ui.heroText)}</p>
            <div className='mt-4 flex gap-4'>
              <a href={business.social.instagram} target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
                <Instagram className='h-6 w-6 hover:text-white' />
              </a>
              <a href={business.social.facebook} target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
                <Facebook className='h-6 w-6 hover:text-white' />
              </a>
            </div>
          </div>
          <div>
            <div className='mb-3 font-bold text-white'>{t(ui.services)}</div>
            <ul className='space-y-1 text-sm'>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`${prefix}/${s.slug}`} className='hover:text-white'>
                    {t(s.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-3 text-sm'>
            <div className='mb-3 font-bold text-white'>{t(ui.contacts)}</div>
            <p className='flex gap-2'>
              <MapPin className='h-4 w-4 shrink-0' />
              <span>
                {t(business.address)}
                <br />
                {t(business.addressNote)}
              </span>
            </p>
            <p className='flex gap-2'>
              <Clock className='h-4 w-4 shrink-0' />
              <span>
                {t(business.hours)}
                <br />
                {t(business.weekend)}
              </span>
            </p>
            <p className='flex gap-2'>
              <Phone className='h-4 w-4 shrink-0' />
              <a href={`tel:${business.phone}`} className='font-bold text-white'>
                {business.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
        <div className='border-t border-gray-700 py-4 text-center text-xs text-gray-500'>
          © {new Date().getFullYear()} ChekCar
        </div>
      </footer>

      {/* Sticky mobile action bar: call and booking are always one tap away */}
      <div className='fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-white p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden'>
        <a
          href={`tel:${business.phone}`}
          className='flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 font-bold text-white'>
          <Phone className='h-5 w-5' />
          {t(ui.call)}
        </a>
        <a
          href='#booking'
          className='flex items-center justify-center rounded-xl bg-brand-blue py-3 font-bold text-white'>
          {t(ui.book)}
        </a>
      </div>
    </div>
  );
}
