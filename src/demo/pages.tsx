import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { commonFaq, privacy, services, startPrice, ui, ui2 } from './content';
import { useLang } from './useLang';
import Layout from './Layout';
import Seo from './Seo';
import {
  Brands,
  ContactsAndBooking,
  FaqBlock,
  FindUs,
  Gallery,
  Hero,
  Reviews,
  SectionTitle,
  ServicesGrid,
  usePrice,
  Steps,
  SymptomPicker,
  Why,
} from './Sections';

export function HomePage() {
  const { t, lang, bare } = useLang();
  const faq = useMemo(() => commonFaq.map((f) => ({ q: f.q[lang], a: f.a[lang] })), [lang]);
  return (
    <Layout>
      <Seo lang={lang} bare={bare} title={t(ui.homeMetaTitle)} description={t(ui.homeMetaDescription)} faq={faq} />
      <Hero kicker={t(ui2.heroKicker)} title={t(ui2.heroTitle)} text={t(ui2.heroText)} />
      <Brands />
      <SymptomPicker />
      <ServicesGrid />
      <Reviews />
      <Why />
      <Gallery />
      <Steps />
      <FindUs />
      <FaqBlock items={commonFaq} />
      <ContactsAndBooking />
    </Layout>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const { t, lang, bare, prefix } = useLang();
  const service = services.find((s) => s.slug === slug);
  const price = usePrice();
  const items = useMemo(() => (service ? [...service.faq, ...commonFaq] : []), [service]);
  const faq = useMemo(() => items.map((f) => ({ q: f.q[lang], a: f.a[lang] })), [items, lang]);

  if (!service) return <Navigate to={prefix || '/'} replace />;

  return (
    <Layout>
      <Seo
        lang={lang}
        bare={bare}
        title={t(service.metaTitle)}
        description={t(service.metaDescription)}
        faq={faq}
      />
      <Hero kicker={t(ui2.heroKicker)} title={t(service.h1)} text={t(service.intro)} price={startPrice[service.slug] ? price(service.slug) : undefined}>
        <nav className='mb-4 text-sm text-ink-400'>
          <Link to={prefix || '/'} className='hover:text-fg'>
            ChekCar
          </Link>{' '}
          / {t(service.name)}
        </nav>
      </Hero>

      <section className='py-16'>
        <div className='mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2'>
          <div>
            <SectionTitle title={t(ui.works)} />
            <ul className='space-y-3 text-ink-200'>
              {service.works.map((w) => (
                <li key={w.uk} className='flex gap-3 text-lg'>
                  <CheckCircle2 className='mt-1 h-5 w-5 shrink-0 text-fire' />
                  {t(w)}
                </li>
              ))}
            </ul>
          </div>
          <div className='rounded-3xl border border-fg/5 bg-ink-800 p-6 md:p-8'>
            <SectionTitle title={t(ui.symptoms)} />
            <ul className='space-y-3'>
              {service.symptoms.map((s) => (
                <li key={s.uk} className='flex gap-3 text-lg text-ink-200'>
                  <AlertTriangle className='mt-1 h-5 w-5 shrink-0 text-fire' />
                  {t(s)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Reviews />
      <Steps />
      <FindUs />
      <FaqBlock items={items} />
      <ContactsAndBooking defaultService={t(service.name)} />
      <ServicesGrid exclude={service.slug} />
    </Layout>
  );
}

export function PrivacyPage() {
  const { t, lang, bare } = useLang();
  return (
    <Layout>
      <Seo lang={lang} bare={bare} title={`${t(privacy.title)} | СТО ChekCar`} description={t(privacy.sections[0].p)} />
      <section className='py-14'>
        <div className='mx-auto max-w-3xl px-4'>
          <h1 className='font-display text-3xl font-bold text-fg md:text-4xl'>{t(privacy.title)}</h1>
          {privacy.sections.map((sec) => (
            <div key={sec.h.uk} className='mt-8'>
              <h2 className='text-xl font-bold text-fg'>{t(sec.h)}</h2>
              <p className='mt-2 leading-relaxed text-ink-200'>{t(sec.p)}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
