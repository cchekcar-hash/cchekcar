import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { advantages, business, services, steps, ui, type Faq } from './content';
import { useLang, track } from './useLang';
import { CallButton, RouteButton } from './Layout';
import BookingForm from './BookingForm';

export function Hero({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  const { t } = useLang();
  return (
    <section className='relative overflow-hidden bg-gradient-hero text-white'>
      <img
        src='/assets/сто.jpg'
        alt=''
        className='absolute inset-0 h-full w-full object-cover opacity-20'
        loading='eager'
      />
      <div className='relative mx-auto max-w-6xl px-4 py-14 md:py-24'>
        <div className='mb-5 flex flex-wrap gap-2 text-sm font-semibold'>
          <span className='inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1'>
            <MapPin className='h-4 w-4' /> {t(business.address)}
          </span>
          <span className='inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1'>
            <Clock className='h-4 w-4' /> {t(business.hours)}
          </span>
        </div>
        <h1 className='max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl'>{title}</h1>
        <p className='mt-5 max-w-2xl text-lg text-white/90 md:text-xl'>{text}</p>
        {children}
        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <CallButton label={business.phoneDisplay} />
          <RouteButton />
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className='mb-10 max-w-3xl'>
      <h2 className='text-3xl font-extrabold md:text-4xl'>{title}</h2>
      {sub && <p className='mt-3 text-lg text-text-light'>{sub}</p>}
    </div>
  );
}

export function ServicesGrid({ exclude }: { exclude?: string }) {
  const { t, prefix } = useLang();
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <section id='services' className='bg-surface-light py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={exclude ? t(ui.allServices) : t(ui.services)} />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {list.map((s) => (
            <Link
              key={s.slug}
              to={`${prefix}/${s.slug}`}
              className='group flex flex-col rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft'>
              <div className='text-xl font-bold group-hover:text-brand-blue'>{t(s.name)}</div>
              <ul className='mt-3 flex-1 space-y-1 text-sm text-text-light'>
                {s.works.slice(0, 3).map((w) => (
                  <li key={w.uk}>• {t(w)}</li>
                ))}
              </ul>
              <span className='mt-4 inline-flex items-center gap-1 font-semibold text-brand-blue'>
                {t(ui.more)} <ChevronRight className='h-4 w-4' />
              </span>
            </Link>
          ))}
        </div>
        <p className='mt-6 text-sm text-text-light'>{t(ui.notDo)}</p>
      </div>
    </section>
  );
}

export function Steps() {
  const { t } = useLang();
  return (
    <section id='how' className='py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={t(ui.howWeWork)} />
        <ol className='grid gap-4 md:grid-cols-5'>
          {steps.map((s, i) => (
            <li key={s.title.uk} className='rounded-2xl border border-border p-5'>
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-lg font-extrabold text-white'>
                {i + 1}
              </div>
              <div className='font-bold'>{t(s.title)}</div>
              <p className='mt-1 text-sm text-text-light'>{t(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useLang();
  return (
    <section id='why' className='bg-text-dark py-16 text-white'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='mb-10 text-3xl font-extrabold md:text-4xl'>{t(ui.whyUs)}</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {advantages.map((a) => (
            <div key={a.title.uk} className='flex gap-3'>
              <CheckCircle2 className='mt-1 h-6 w-6 shrink-0 text-brand-orange' />
              <div>
                <div className='text-lg font-bold'>{t(a.title)}</div>
                <p className='mt-1 text-gray-300'>{t(a.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const photos = [1, 2, 3, 4, 5, 6].map((n) => `/assets/photo_${n}_2025-08-26_12-02-14.jpg`);

export function Gallery() {
  const { t } = useLang();
  return (
    <section className='py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={t(ui.photos)} />
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
          {photos.map((src) => (
            <img
              key={src}
              src={src}
              alt='СТО ChekCar'
              loading='lazy'
              className='aspect-[4/3] w-full rounded-xl object-cover'
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqBlock({ items }: { items: Faq[] }) {
  const { t } = useLang();
  return (
    <section className='bg-surface-light py-16'>
      <div className='mx-auto max-w-3xl px-4'>
        <SectionTitle title={t(ui.faq)} />
        <div className='space-y-3'>
          {items.map((f) => (
            <details key={f.q.uk} className='group rounded-xl bg-white p-5 shadow-card'>
              <summary className='flex cursor-pointer list-none items-center justify-between font-bold'>
                {t(f.q)}
                <ChevronRight className='h-5 w-5 transition group-open:rotate-90' />
              </summary>
              <p className='mt-3 text-text-light'>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactsAndBooking({ defaultService }: { defaultService?: string }) {
  const { t } = useLang();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`;
  return (
    <section id='contacts' className='py-16'>
      <div id='booking' className='mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2'>
        <div className='rounded-2xl bg-white p-6 shadow-card md:p-8'>
          <h2 className='text-2xl font-extrabold md:text-3xl'>{t(ui.formTitle)}</h2>
          <p className='mb-6 mt-2 text-text-light'>{t(ui.formText)}</p>
          <BookingForm defaultService={defaultService} />
          <div className='mt-6 border-t border-border pt-6'>
            <CallButton className='w-full' label={business.phoneDisplay} />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='rounded-2xl bg-surface-light p-6'>
            <div className='mb-2 flex items-center gap-2 font-bold'>
              <MapPin className='h-5 w-5 text-brand-orange' /> {t(ui.address)}
            </div>
            <p>
              {t(business.address)}, {t(business.addressNote)}
            </p>
            <div className='mb-2 mt-4 flex items-center gap-2 font-bold'>
              <Clock className='h-5 w-5 text-brand-orange' /> {t(ui.schedule)}
            </div>
            <p>
              {t(business.hours)}, {t(business.weekend)}
            </p>
            <div className='mb-2 mt-4 flex items-center gap-2 font-bold'>
              <Phone className='h-5 w-5 text-brand-orange' /> {t(ui.phone)}
            </div>
            <a href={`tel:${business.phone}`} className='text-lg font-bold text-brand-blue'>
              {business.phoneDisplay}
            </a>
            <div className='mt-5 flex flex-wrap gap-3'>
              <a
                href={business.routeUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => track('route_click', { destination: 'google_maps' })}
                className='rounded-lg bg-brand-blue px-4 py-2 font-semibold text-white'>
                Google Maps
              </a>
              <a
                href={business.wazeUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => track('route_click', { destination: 'waze' })}
                className='rounded-lg border border-brand-blue px-4 py-2 font-semibold text-brand-blue'>
                Waze
              </a>
            </div>
          </div>
          <iframe
            title='ChekCar map'
            src={mapSrc}
            className='h-72 w-full flex-1 rounded-2xl border-0 lg:h-auto'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  );
}
