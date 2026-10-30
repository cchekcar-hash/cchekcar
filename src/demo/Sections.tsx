import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle2, ChevronRight, Phone, PlayCircle, Star } from 'lucide-react';
import { advantages, brands, business, google, priceUi, reviewUi, reviews, serviceGroups, services, startPrice, steps, ui, ui2, type Faq } from './content';
import { useLang, track } from './useLang';
import { CallButton, OpenStatus, RouteButton } from './Layout';
import BookingForm from './BookingForm';

export function Hero({
  title,
  text,
  kicker,
  price,
  image = '/assets/opt/photo7.webp',
  children,
}: {
  title: string;
  text: string;
  kicker?: string;
  price?: string;
  image?: string;
  children?: ReactNode;
}) {
  const { t } = useLang();
  return (
    <section className='hero relative overflow-hidden bg-ink-950'>
      <img src={image} alt='' className='hero-photo absolute inset-0 h-full w-full object-cover' loading='eager' fetchPriority='high' />
      <div className='hero-photo absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/75 to-ink-900 md:bg-gradient-to-r md:from-ink-950/95 md:via-ink-950/70 md:to-ink-950/30' />
      <div className='relative mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-28 md:pt-24'>
        {children}
        <OpenStatus />
        {kicker && <p className='mt-5 text-sm font-bold uppercase tracking-[0.18em] text-fire'>{kicker}</p>}
        <h1 className='mt-3 max-w-3xl font-display text-[1.9rem] font-extrabold leading-[1.1] text-fg md:text-6xl'>
          {title}
        </h1>
        <p className='mt-5 max-w-xl text-lg text-ink-200 md:text-xl'>{text}</p>
        {price && (
          <p className='mt-5 inline-flex rounded-xl border border-fire/40 bg-fire/10 px-4 py-2 text-lg font-extrabold text-fire'>
            {price}
          </p>
        )}
        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <CallButton pulse />
          <RouteButton />
        </div>
        <p className='mt-4 max-w-md text-sm text-ink-400'>
          <a href={`tel:${business.phone}`} className='font-bold text-fg'>
            {business.phoneDisplay}
          </a>{' '}
          · {t(ui2.callHint)}
        </p>
        <p className='mt-6 flex items-start gap-2 text-sm text-ink-200'>
          <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-fire' />
          {t(business.address)}, {t(business.addressNote)}
        </p>
      </div>
    </section>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className='mb-8 max-w-3xl md:mb-10'>
      <h2 className='font-display text-2xl font-bold text-fg md:text-4xl'>{title}</h2>
      {sub && <p className='mt-3 text-lg text-ink-400'>{sub}</p>}
    </div>
  );
}

// Interactive "what's wrong with your car" picker: gives the visitor something to do and leads to a call
export function SymptomPicker() {
  const { t, prefix } = useLang();
  const options = services.slice(0, 7).map((s) => ({ symptom: s.symptoms[0], service: s }));
  const [picked, setPicked] = useState<number | null>(null);
  const price = usePrice();
  const match = picked === null ? null : options[picked];

  return (
    <section className='border-y border-fg/5 bg-ink-800 py-14'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={t(ui2.pickTitle)} sub={t(ui2.pickText)} />
        <div className='flex flex-wrap gap-2'>
          {options.map((o, i) => (
            <button
              key={o.symptom.uk}
              type='button'
              onClick={() => {
                setPicked(i);
                track('symptom_pick', { service: o.service.slug });
              }}
              className={`rounded-full border px-4 py-2 text-left text-sm font-semibold transition ${
                picked === i
                  ? 'border-fire bg-fire text-white'
                  : 'border-fg/10 bg-ink-700 text-ink-200 hover:border-fire/60 hover:text-fg'
              }`}>
              {t(o.symptom)}
            </button>
          ))}
        </div>
        {match && (
          <div className='mt-6 rounded-3xl border border-fire/40 bg-ink-900 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8'>
            <div>
              <p className='text-sm font-bold uppercase tracking-wider text-fire'>{t(ui2.pickResult)}</p>
              <p className='mt-1 font-display text-2xl font-bold text-fg'>{t(match.service.name)}</p>
              <p className='mt-1 font-bold text-fire'>{price(match.service.slug)}</p>
              <p className='mt-2 max-w-xl text-ink-400'>{t(match.service.intro)}</p>
            </div>
            <div className='mt-5 flex shrink-0 flex-col gap-2 md:mt-0'>
              <CallButton label={t(ui2.pickCall)} />
              <Link
                to={`${prefix}/${match.service.slug}`}
                className='inline-flex items-center justify-center gap-1 py-2 font-semibold text-ink-200 hover:text-fg'>
                {t(ui.more)} <ChevronRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function usePrice() {
  const { t } = useLang();
  return (slug: string) => {
    const p = startPrice[slug];
    return p ? `${t(priceUi.from)} ${p} ${t(priceUi.uah)}` : t(priceUi.byPhone);
  };
}

export function ServicesGrid({ exclude }: { exclude?: string }) {
  const { t, prefix } = useLang();
  const price = usePrice();
  return (
    <section id='services' className='py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={exclude ? t(ui.allServices) : t(ui.services)} />
        <div className='grid gap-8 lg:grid-cols-3'>
          {serviceGroups.map((g) => (
            <div key={g.title.uk}>
              <h3 className='mb-3 text-sm font-bold uppercase tracking-wider text-fire'>{t(g.title)}</h3>
              <div className='space-y-2'>
                {g.slugs
                  .filter((slug) => slug !== exclude)
                  .map((slug) => services.find((s) => s.slug === slug)!)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      to={`${prefix}/${s.slug}`}
                      className='group flex items-center justify-between gap-3 rounded-2xl border border-fg/5 bg-ink-800 px-5 py-4 transition hover:border-fire/50'>
                      <span>
                        <span className='block text-lg font-bold leading-tight text-fg'>{t(s.name)}</span>
                        <span className={`mt-1 block text-sm ${startPrice[s.slug] ? 'font-bold text-fire' : 'text-ink-400'}`}>
                          {price(s.slug)}
                        </span>
                      </span>
                      <ChevronRight className='h-5 w-5 shrink-0 text-ink-400 transition group-hover:translate-x-1 group-hover:text-fire' />
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p className='mt-6 text-sm text-ink-400'>{t(priceUi.note)}</p>
        <p className='mt-2 text-sm text-ink-400'>{t(ui.notDo)}</p>
      </div>
    </section>
  );
}

const photos = [7, 1, 3, 5, 9, 11, 2, 13, 4, 8].map((n) => `/assets/opt/photo${n}.webp`);

export function Gallery() {
  const { t } = useLang();
  return (
    <section className='py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={t(ui2.photosTitle)} />
      </div>
      <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-auto md:max-w-6xl'>
        {photos.map((src) => (
          <img
            key={src}
            src={src}
            alt='СТО ChekCar'
            loading='lazy'
            className='aspect-[4/5] w-[78%] shrink-0 snap-center rounded-2xl object-cover sm:w-[45%] lg:w-[31%]'
          />
        ))}
      </div>
    </section>
  );
}

function Stars({ n, className = 'h-4 w-4' }: { n: number; className?: string }) {
  return (
    <span className='flex gap-0.5 text-amber-400'>
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

export function Reviews() {
  const { t } = useLang();
  return (
    <section id='reviews' className='py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
          <h2 className='font-display text-2xl font-bold text-fg md:text-4xl'>{t(reviewUi.title)}</h2>
          <a
            href={google.mapsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 font-semibold text-ink-200 hover:text-fire'>
            {t(reviewUi.all)} <ChevronRight className='h-4 w-4' />
          </a>
        </div>
      </div>
      <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-auto md:max-w-6xl'>
        {reviews.map((r) => (
          <figure
            key={r.name}
            className='flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-fg/5 bg-ink-800 p-5 sm:w-[46%] lg:w-[32%]'>
            <div className='flex items-center justify-between'>
              <Stars n={r.stars} />
              <span className='text-xs text-ink-400'>Google · {r.date}</span>
            </div>
            <blockquote className='mt-3 flex-1 text-ink-200'>{r.text}</blockquote>
            <figcaption className='mt-4 font-bold text-fg'>{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className='mx-auto mt-6 max-w-6xl px-4'>
        <div className='flex flex-col gap-4 rounded-2xl border border-fg/10 p-5 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='font-bold text-fg'>{t(reviewUi.leaveTitle)}</p>
            <p className='mt-1 text-sm text-ink-400'>{t(reviewUi.leaveText)}</p>
          </div>
          <a
            href={google.writeReviewUrl}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => track('review_click')}
            className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-fg/15 px-5 py-3 font-bold text-fg hover:bg-fg/5'>
            <Stars n={5} className='h-4 w-4' /> {t(reviewUi.leaveButton)}
          </a>
        </div>
      </div>
    </section>
  );
}

// Monochrome brand logos (Simple Icons) tinted with the theme colour; scrolls as a marquee
export function Brands() {
  const { t } = useLang();
  const row = brands.map((b) => (
    <span key={b.slug} className='flex shrink-0 flex-col items-center gap-2 px-5' title={b.name}>
      <span
        aria-hidden
        className='block h-9 w-9 bg-ink-200 md:h-10 md:w-10'
        style={{
          WebkitMask: `url(/assets/brands/${b.slug}.svg) center / contain no-repeat`,
          mask: `url(/assets/brands/${b.slug}.svg) center / contain no-repeat`,
        }}
      />
      <span className='text-xs font-semibold text-ink-400'>{b.name}</span>
    </span>
  ));
  return (
    <section className='border-b border-fg/5 py-8'>
      <p className='mb-5 px-4 text-center text-sm font-bold uppercase tracking-wider text-ink-400'>{t(ui2.brandsTitle)}</p>
      <div className='overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]'>
        <div className='brand-marquee flex w-max'>
          {row}
          <span aria-hidden className='flex'>
            {row}
          </span>
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  const { t } = useLang();
  return (
    <section id='how' className='bg-ink-800 py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <SectionTitle title={t(ui.howWeWork)} />
        <ol className='grid gap-4 md:grid-cols-5'>
          {steps.map((s, i) => (
            <li key={s.title.uk} className='flex gap-4 md:block'>
              <div className='font-display text-3xl font-extrabold text-fire'>{i + 1}</div>
              <div>
                <div className='font-bold text-fg md:mt-2'>{t(s.title)}</div>
                <p className='mt-1 text-sm text-ink-400'>{t(s.text)}</p>
              </div>
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
    <section id='why' className='py-16'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.2fr] lg:items-center'>
        <img
          src='/assets/opt/photo5.webp'
          alt='СТО ChekCar'
          loading='lazy'
          className='hidden aspect-[4/5] w-full rounded-3xl object-cover lg:block'
        />
        <div>
          <SectionTitle title={t(ui.whyUs)} />
          <div className='grid gap-6 sm:grid-cols-2'>
            {advantages.map((a) => (
              <div key={a.title.uk} className='flex gap-3'>
                <CheckCircle2 className='mt-1 h-6 w-6 shrink-0 text-fire' />
                <div>
                  <div className='text-lg font-bold text-fg'>{t(a.title)}</div>
                  <p className='mt-1 text-ink-400'>{t(a.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Route video: the most common lost-client reason was going to the wrong address
export function FindUs() {
  const { t } = useLang();
  return (
    <section id='find' className='border-y border-fg/5 bg-ink-800 py-16'>
      <div className='mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:items-center'>
        <div>
          <SectionTitle title={t(ui2.findTitle)} sub={t(ui2.findText)} />
          <div className='space-y-3 text-ink-200'>
            <p className='flex gap-2'>
              <MapPin className='h-5 w-5 shrink-0 text-fire' /> {t(business.address)}, {t(business.addressNote)}
            </p>
            <p className='flex gap-2'>
              <Clock className='h-5 w-5 shrink-0 text-fire' /> {t(business.hours)}, {t(business.weekend)}
            </p>
          </div>
          <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
            <RouteButton />
            <a
              href={business.wazeUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => track('route_click', { destination: 'waze' })}
              className='inline-flex items-center justify-center rounded-2xl border border-fg/15 px-6 py-4 font-bold text-fg hover:bg-fg/5'>
              Waze
            </a>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-3xl border border-fg/10 bg-ink-950'>
          <video
            className='aspect-video w-full'
            src='/assets/opt/route.mp4'
            poster='/assets/opt/route-poster.jpg'
            preload='none'
            controls
            playsInline
            onPlay={() => track('route_video_play')}
          />
          <span className='pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-bold text-fg'>
            <PlayCircle className='h-4 w-4 text-fire' /> 1:30
          </span>
        </div>
      </div>
    </section>
  );
}

export function FaqBlock({ items }: { items: Faq[] }) {
  const { t } = useLang();
  return (
    <section className='py-16'>
      <div className='mx-auto max-w-3xl px-4'>
        <SectionTitle title={t(ui.faq)} />
        <div className='space-y-3'>
          {items.map((f) => (
            <details key={f.q.uk} className='group rounded-2xl border border-fg/5 bg-ink-800 p-5'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-fg'>
                {t(f.q)}
                <ChevronRight className='h-5 w-5 shrink-0 text-fire transition group-open:rotate-90' />
              </summary>
              <p className='mt-3 text-ink-400'>{t(f.a)}</p>
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
    <section id='contacts' className='bg-ink-950 py-16'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='mb-10 rounded-3xl bg-gradient-to-br from-fire to-fire-dark p-7 text-white md:flex md:items-center md:justify-between md:p-10'>
          <div>
            <h2 className='font-display text-2xl font-bold md:text-4xl'>{t(ui2.ctaTitle)}</h2>
            <p className='mt-3 max-w-xl text-fg/90'>{t(ui2.ctaText)}</p>
          </div>
          <a
            href={`tel:${business.phone}`}
            className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-lg font-extrabold text-[#111418] md:mt-0 md:w-auto'>
            <Phone className='h-5 w-5' /> {business.phoneDisplay}
          </a>
        </div>

        <div id='booking' className='grid gap-6 lg:grid-cols-2'>
          <div className='rounded-3xl border border-fg/5 bg-ink-800 p-6 md:p-8'>
            <h2 className='font-display text-xl font-bold text-fg md:text-2xl'>{t(ui.formTitle)}</h2>
            <p className='mb-6 mt-2 text-ink-400'>{t(ui.formText)}</p>
            <BookingForm defaultService={defaultService} />
          </div>
          <iframe
            title='ChekCar map'
            src={mapSrc}
            className='h-80 w-full rounded-3xl border-0 grayscale-[40%] lg:h-full'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  );
}
