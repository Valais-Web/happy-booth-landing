import { useEffect } from 'react';

interface SEOHeadProps {
  language: string;
  translations: any;
}

const SEOHead = ({ language, translations }: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    const title = language === 'en' 
      ? 'Photobooth Rental French Switzerland | Happy Booth'
      : 'Location Photobooth Suisse Romande | Happy Booth';
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'en'
        ? 'Professional photobooth rental for weddings, corporate events and birthdays in French Switzerland. Turnkey service with unlimited prints and free delivery in Lausanne.'
        : 'Location de photobooth professionnel pour mariages, événements d\'entreprise et anniversaires en Suisse Romande. Service clé en main avec impressions illimitées et livraison gratuite sur Lausanne.';
      metaDescription.setAttribute('content', description);
    }

    // Remove existing hreflang links
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(link => link.remove());

    // Add hreflang links
    const head = document.head;
    
    // French version
    const frLink = document.createElement('link');
    frLink.rel = 'alternate';
    frLink.hreflang = 'fr';
    frLink.href = window.location.origin + '/fr';
    head.appendChild(frLink);

    // English version
    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = window.location.origin + '/en';
    head.appendChild(enLink);

    // Default version
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = window.location.origin + '/fr';
    head.appendChild(defaultLink);

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