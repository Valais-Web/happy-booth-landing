import { useEffect } from 'react';

const SITE_URL = 'https://lp.thehappybooth.ch';

interface SEOHeadProps {
  language: string;
  translations: unknown;
}

const SEOHead = ({ language, translations }: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    const title = language === 'en' 
      ? 'Photobooth Rental French Switzerland | Happy Booth'
      : 'Location Photobooth Suisse Romande | Happy Booth';
    document.title = title;
    document.documentElement.lang = language === 'en' ? 'en' : 'fr';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'en'
        ? 'Professional photobooth rental for weddings, corporate events and birthdays in French Switzerland. Turnkey service with unlimited prints and free delivery in Lausanne.'
        : 'Location de photobooth professionnel pour mariages, événements d\'entreprise et anniversaires en Suisse Romande. Service clé en main avec impressions illimitées et livraison gratuite sur Lausanne.';
      metaDescription.setAttribute('content', description);
    }

    // Canonical URL (one per language)
    const canonicalHref = `${SITE_URL}/${language === 'en' ? 'en' : 'fr'}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalHref);

    // Remove existing hreflang links
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(link => link.remove());

    // Add hreflang links
    const head = document.head;
    const alternates: [string, string][] = [
      ['fr', `${SITE_URL}/fr`],
      ['en', `${SITE_URL}/en`],
      ['x-default', `${SITE_URL}/fr`],
    ];
    alternates.forEach(([hreflang, href]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      head.appendChild(link);
    });

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    if (ogDescription) {
      const description = language === 'en'
        ? 'Professional photobooth rental for weddings, corporate events and birthdays in French Switzerland.'
        : 'Location de photobooth professionnel pour mariages, événements d\'entreprise et anniversaires en Suisse Romande.';
      ogDescription.setAttribute('content', description);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    if (twitterDescription) {
      const description = language === 'en'
        ? 'Professional photobooth rental for weddings, corporate events and birthdays in French Switzerland.'
        : 'Location de photobooth professionnel pour mariages, événements d\'entreprise et anniversaires en Suisse Romande.';
      twitterDescription.setAttribute('content', description);
    }

    return () => {
      // Cleanup function to remove hreflang links when component unmounts
      const hreflangs = document.querySelectorAll('link[hreflang]');
      hreflangs.forEach(link => link.remove());
    };
  }, [language, translations]);

  return null; // This component doesn't render anything
};

export default SEOHead;