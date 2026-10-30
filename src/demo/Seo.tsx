import { useEffect } from 'react';
import { business, services, type Lang } from './content';

const SITE = 'https://chekcar-sto.com.ua';

function setMeta(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function localBusiness(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'СТО ChekCar',
    url: SITE,
    telephone: business.phone,
    image: `${SITE}/assets/сто.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address[lang],
      addressLocality: lang === 'ru' ? 'Киев' : 'Київ',
      addressCountry: 'UA',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: lang === 'ru' ? 'Киев' : 'Київ',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'ru' ? 'Услуги СТО' : 'Послуги СТО',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name[lang] },
      })),
    },
  };
}

export type Props = {
  lang: Lang;
  bare: string;
  title: string;
  description: string;
  faq?: { q: string; a: string }[];
};

// Filled during build-time prerendering so the static HTML gets the same head tags
export const ssrHead: { current: Props | null } = { current: null };

export default function Seo({ lang, bare, title, description, faq }: Props) {
  if (typeof window === 'undefined') ssrHead.current = { lang, bare, title, description, faq };
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'uk';
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);

    const ukUrl = `${SITE}${bare === '/' ? '/' : bare}`;
    const ruUrl = `${SITE}${bare === '/' ? '/ru' : `/ru${bare}`}`;
    setLink('canonical', lang === 'ru' ? ruUrl : ukUrl);
    setLink('alternate', ukUrl, 'uk');
    setLink('alternate', ruUrl, 'ru');
    setLink('alternate', ukUrl, 'x-default');

    setJsonLd('ld-business', localBusiness(lang));
    if (faq && faq.length) {
      setJsonLd('ld-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    } else {
      document.getElementById('ld-faq')?.remove();
    }
  }, [lang, bare, title, description, faq]);

  return null;
}
