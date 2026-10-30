import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { commonFaq, services, ui } from './content';
import { useLang } from './useLang';
import Layout from './Layout';
import Seo from './Seo';
import { ContactsAndBooking, FaqBlock, Gallery, Hero, SectionTitle, ServicesGrid, Steps, Why } from './Sections';

export function HomePage() {
  const { t, lang, bare } = useLang();
  const faq = useMemo(() => commonFaq.map((f) => ({ q: f.q[lang], a: f.a[lang] })), [lang]);
  return (
    <Layout>
      <Seo lang={lang} bare={bare} title={t(ui.homeMetaTitle)} description={t(ui.homeMetaDescription)} faq={faq} />
      <Hero title={t(ui.heroTitle)} text={t(ui.heroText)} />
      <ServicesGrid />
      <Steps />
      <Why />
      <Gallery />
      <FaqBlock items={commonFaq} />
      <ContactsAndBooking />
    </Layout>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const { t, lang, bare, prefix } = useLang();
  const service = services.find((s) => s.slug === slug);
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
      <Hero title={t(service.h1)} text={t(service.intro)}>
        <nav className='mt-4 text-sm text-white/70'>
          <Link to={prefix || '/'} className='hover:text-white'>
            ChekCar
          </Link>{' '}
          / {t(service.name)}
        </nav>
      </Hero>

      <section className='py-16'>
        <div className='mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2'>
          <div>
            <SectionTitle title={t(ui.works)} />
            <ul className='space-y-3'>
              {service.works.map((w) => (
                <li key={w.uk} className='flex gap-3 text-lg'>
                  <CheckCircle2 className='mt-1 h-5 w-5 shrink-0 text-brand-blue' />
                  {t(w)}
                </li>
              ))}
            </ul>
          </div>
          <div className='rounded-2xl bg-surface-light p-6 md:p-8'>
            <SectionTitle title={t(ui.symptoms)} />
            <ul className='space-y-3'>
              {service.symptoms.map((s) => (
                <li key={s.uk} className='flex gap-3 text-lg'>
                  <AlertTriangle className='mt-1 h-5 w-5 shrink-0 text-brand-orange' />
                  {t(s)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Steps />
      <Why />
      <ContactsAndBooking defaultService={t(service.name)} />
      <FaqBlock items={items} />
      <ServicesGrid exclude={service.slug} />
    </Layout>
  );
}
