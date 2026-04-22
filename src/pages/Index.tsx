import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Heart, Building, Calendar, Users, Camera, CheckCircle, ArrowRight, Star, Award, MapPin, Clock, ChevronLeft, Play } from "lucide-react";
import { toast } from "sonner";
import { ClientLogosCarousel } from "@/components/ClientLogosCarousel";
import Autoplay from "embla-carousel-autoplay";
import useTranslation from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SEOHead from "@/components/SEOHead";

const newLogo = "/lovable-uploads/34b0e686-0ec5-4fb5-872c-39a4aa3d802c.png";

const Index = () => {
  const { t, tArray, language, isLoading } = useTranslation();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', eventType: '', city: '',
    model: '', guests: '', message: '',
    gclid: '', wbraid: '', gbraid: '', consent: false
  });
  const [selectedModel, setSelectedModel] = useState('mirror');
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  const galleryImages = [
    { src: "/lovable-uploads/86178317-da56-41e0-b0f0-29d6cbdb7e97.png", alt: "Groupe de femmes élégantes utilisant un photobooth en extérieur avec éclairage LED" },
    { src: "/lovable-uploads/fc36c40b-ffdc-4035-b37a-5fcefb803b06.png", alt: "Trois amies s'amusant devant un photobooth miroir interactif" },
    { src: "/lovable-uploads/04ace80f-35cc-45fc-9ee6-6abbb701fa67.png", alt: "Femme utilisant un photobooth tactile avec éclairage rouge LED" },
    { src: "/lovable-uploads/5242a589-be2e-4df7-9969-e2d450b7df31.png", alt: "Deux amies avec lunettes de soleil roses posant pour un photobooth" },
    { src: "/lovable-uploads/eb2cf670-4ade-4fb9-a4a3-e642a3e6966e.png", alt: "Groupe d'amies s'amusant avec accessoires photobooth colorés" },
    { src: "/lovable-uploads/44dd8e6f-6d7d-4f28-93a9-ae97970c3087.png", alt: "Mur de photos imprimées du photobooth lors d'un événement" },
    { src: "/lovable-uploads/42eadc60-f6f6-462e-9289-07b0649ad377.png", alt: "Couple élégant utilisant un photobooth 360 lors d'un événement formel" },
    { src: "/lovable-uploads/3c4a797f-fefc-427b-9c8b-2f4ab5b9d29d.png", alt: "Amis posant devant un photobooth avec cadre personnalisé Mamma Mia" },
    { src: "/lovable-uploads/efb782e4-48e6-4981-9ffd-c76d68e64b80.png", alt: "Photobooth moderne blanc dans un environnement moderne avec éclairage rouge" },
    { src: "/lovable-uploads/f6d5733b-59ac-48cf-bebc-0372beec0d05.png", alt: "Couple utilisant un photobooth miroir LED avec éclairage vert coloré" },
    { src: "/lovable-uploads/c7da75f9-3b3b-4755-bc47-92e9592fc7a1.png", alt: "Deux amies souriantes montrant leurs photos imprimées du photobooth" },
    { src: "/lovable-uploads/2dd145c3-1fcc-4e8a-88b7-723a516d0ab9.png", alt: "Groupe d'amies utilisant un photobooth avec décoration argentée lors d'un événement" },
    { src: "/lovable-uploads/e633d2a4-96c9-4680-89df-10441ae6271c.png", alt: "Groupe de femmes glamour s'amusant devant un photobooth lors d'une soirée élégante" },
    { src: "/lovable-uploads/65254db7-af84-45ff-9e3e-04b394c9a4ca.png", alt: "Photo imprimée du photobooth avec cadre personnalisé pour événement corporatif" },
    { src: "/lovable-uploads/fe600cdd-0c6d-4b2a-8da0-2d9c52e346d6.png", alt: "Femme utilisant un photobooth miroir avec effets spéciaux et éclairage coloré" },
    { src: "/lovable-uploads/e6c8f3d5-9fd4-4f32-926f-93141334cefb.png", alt: "Photo imprimée du photobooth lors d'un événement TEDx avec branding personnalisé" },
    { src: "/lovable-uploads/4f2cb588-fb28-4a67-863d-65b17ce7fc37.png", alt: "Photobooth miroir LED élégant installé lors d'un événement avec décoration florale" },
    { src: "/lovable-uploads/b4e96505-76df-4e9a-b601-9de7e37e57c0.png", alt: "Invités s'amusant avec un photobooth miroir interactif lors d'une soirée privée" },
    { src: "/lovable-uploads/487a833c-415d-45e4-b63b-917dc7c1e5a8.png", alt: "Photobooth moderne installé en extérieur sous un parasol avec éclairage LED" },
    { src: "/lovable-uploads/4874f8c7-d042-479f-be4a-e683f3465b83.png", alt: "Groupe d'amis déguisés s'amusant devant un photobooth lors d'une fête costumée" },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      gclid: urlParams.get('gclid') || '',
      wbraid: urlParams.get('wbraid') || '',
      gbraid: urlParams.get('gbraid') || ''
    }));
    const galleryInterval = setInterval(() => {
      setCurrentGalleryIndex(prev => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(galleryInterval);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  function encode(data: Record<string, string>) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? ""))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error(t('contact.errorConsent'));
      return;
    }
    try {
      const netlifyFormData = {
        "form-name": "contact",
        name: formData.name, email: formData.email, phone: formData.phone,
        date: formData.date, eventType: formData.eventType, city: formData.city,
        guests: formData.guests, model: formData.model, message: formData.message,
        gclid: formData.gclid, wbraid: formData.wbraid, gbraid: formData.gbraid,
        consent: formData.consent.toString()
      };
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(netlifyFormData)
      });
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit', form: 'quote',
          name: formData.name, email: formData.email, phone: formData.phone,
          date: formData.date, eventType: formData.eventType, city: formData.city,
          guests: formData.guests, model: formData.model, message: formData.message,
          gclid: formData.gclid, wbraid: formData.wbraid, gbraid: formData.gbraid,
          timestamp: new Date().toISOString()
        });
      }
      toast.success(t('contact.successMessage'));
      setFormData({
        name: '', email: '', phone: '', date: '', eventType: '', city: '',
        guests: '', model: '', message: '', consent: false,
        gclid: '', wbraid: '', gbraid: ''
      });
      setFormStep(1);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const nextStep = () => { if (formStep < 3) setFormStep(formStep + 1); };
  const prevStep = () => { if (formStep > 1) setFormStep(formStep - 1); };
  const selectModel = (model: string) => { setSelectedModel(model); handleInputChange('model', model); };
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const models = [
    { id: 'mirror', name: t('models.mirrorBooth.name'), price: t('models.mirrorBooth.price'), title: t('models.mirrorBooth.title'), description: t('models.mirrorBooth.description'), image: '/lovable-uploads/a076d98b-87cf-4d16-b6bc-4ba9399b6dfb.png', features: tArray('models.mirrorBooth.features'), note: t('models.mirrorBooth.note'), included: tArray('models.mirrorBooth.included') },
    { id: 'rainbow', name: t('models.rainbowBooth.name'), price: t('models.rainbowBooth.price'), title: t('models.rainbowBooth.title'), description: t('models.rainbowBooth.description'), image: '/lovable-uploads/7bbfe067-8199-4ede-8ab0-046d22fc465e.png', features: tArray('models.rainbowBooth.features'), included: tArray('models.rainbowBooth.included') },
    { id: '360', name: t('models.booth360.name'), price: t('models.booth360.price'), title: t('models.booth360.title'), description: t('models.booth360.description'), image: '/lovable-uploads/d2564ea4-aa85-43bf-887a-04fd3d343436.png', features: tArray('models.booth360.features'), included: tArray('models.booth360.included') },
    { id: 'retro', name: t('models.retroBooth.name'), price: t('models.retroBooth.price'), title: t('models.retroBooth.title'), description: t('models.retroBooth.description'), image: '/lovable-uploads/82b14e13-bb3a-4f24-8bd8-5f0342391319.png', features: tArray('models.retroBooth.features'), included: tArray('models.retroBooth.included') },
    { id: 'phone', name: t('models.phoneBooth.name'), price: t('models.phoneBooth.price'), title: t('models.phoneBooth.title'), description: t('models.phoneBooth.description'), image: '/lovable-uploads/01038a35-68c2-4046-a7c9-d7bd12a8dd7f.png', features: tArray('models.phoneBooth.features'), included: tArray('models.phoneBooth.included') },
  ];
  const faqItems = tArray('faq.items') as Array<{ question: string; answer: string }>;

  // Testimonials data (Google reviews)
  const testimonials = [
    { quote: "Le photobooth Mirror est exceptionnel!! Vraiment parfait pour créer une ambiance festive auprès de nos invités. La qualité des photos est top 👍🏼 tactile, il a beaucoup de fonctionnalité. Je recommande à 100%", initials: "SM", color: "bg-pink", meta: "Mariage" },
    { quote: "Everything was perfect, we absolutely loved it and recommend their service! Good quality price :)", initials: "JK", color: "bg-blue", meta: "Private event" },
    { quote: "Le photobooth rainbow était un succès total à ma fête d'anniversaire! Les photos sont d'excellente qualité et l'expérience digitale est très amusante. Je recommande vivement happybooth.", initials: "CL", color: "bg-coral", meta: "Anniversaire" },
    { quote: "We had the best experience for my son's 1st birthday! From start to finish, the service was perfect. The photo quality was incredible, and the attendant was so friendly and professional.", initials: "AB", color: "bg-mint", meta: "Birthday" },
    { quote: "Super expérience que nous recommandons vivement ! Tous nos invités adoré le photobooth miroir. Un tout grand MERCI !", initials: "MR", color: "bg-pink", meta: "Mariage" },
    { quote: "Best service ever. Have had them at my wedding, at birthdays and special events of my family. They are 'The Photobooth', what else?", initials: "DP", color: "bg-blue", meta: "Plusieurs événements" },
    { quote: "Nous avons fait appel à Happy Booth pour notre mariage, et c'était juste parfait du début à la fin. Le design des cadres photo, créé sur mesure, était sublime. Service impeccable !", initials: "NV", color: "bg-coral", meta: "Mariage" },
    { quote: "Un grand merci ! Le photobooth a été un véritable succès. Service impeccable, produit au top, facile à utiliser. Tout le monde a adoré l'expérience.", initials: "EL", color: "bg-mint", meta: "Événement privé" },
    { quote: "Nous avons fait appel à HappyBooth pour notre soirée de lancement, et nous en sommes ravis ! Communication fluide, service impeccable. Équipe professionnelle et sympathique.", initials: "TF", color: "bg-pink", meta: "Lancement produit" },
    { quote: "Super contact avec Jessica dès la demande. L'équipe qui est venue monter le Photo Booth était adorable et hyper patiente ! Je recommande !", initials: "JC", color: "bg-blue", meta: "Événement" },
    { quote: "Service et qualité au top! J'ai fait appel à Happy Booth pour mes 30 ans. Jessica et son mari sont super disponibles et à l'écoute.", initials: "GD", color: "bg-coral", meta: "30 ans" },
    { quote: "Deuxième magnifique expérience avec le miroir. Le succès a été époustouflant. Merci pour votre écoute et votre disponibilité.", initials: "VP", color: "bg-mint", meta: "Mariage" },
    { quote: "Exceptional Experience! The technology was incredibly cool. Professional service from start to finish. Highly recommended!", initials: "LH", color: "bg-pink", meta: "Corporate" },
    { quote: "Une expérience extraordinaire !!! La mascotte de la soirée!!!", initials: "AM", color: "bg-blue", meta: "Soirée" },
    { quote: "We used the 360 video booth and it was amazing! Communication with Jessica was very responsive! Everyone loved it!", initials: "RK", color: "bg-coral", meta: "Anniversaire" },
    { quote: "Superbe expérience ! j'ai loué le Happy Rainbow pour les 30 ans de mon conjoint, c'était l'élément parfait pour des souvenirs mémorables !", initials: "PB", color: "bg-mint", meta: "30 ans" },
  ];

  const useCases = [
    { tag: 'mariage', title: t('useCases.weddings'), desc: t('useCases.weddingsDesc'), bg: 'bg-pink-soft', emoji: '💍' },
    { tag: 'corporate', title: t('useCases.corporate'), desc: t('useCases.corporateDesc'), bg: 'bg-blue-soft', emoji: '🎯' },
    { tag: 'birthday', title: t('useCases.birthdays'), desc: t('useCases.birthdaysDesc'), bg: 'bg-yellow-soft', emoji: '🎂' },
  ];

  const whyFeatures = [
    { icon: MapPin, title: t('whyUs.local'), desc: t('whyUs.localDesc'), bg: 'bg-pink-soft' },
    { icon: CheckCircle, title: t('whyUs.delivery'), desc: t('whyUs.deliveryDesc'), bg: 'bg-yellow-soft' },
    { icon: Camera, title: t('whyUs.unlimited'), desc: t('whyUs.unlimitedDesc'), bg: 'bg-blue-soft' },
    { icon: Sparkles, title: t('whyUs.customization'), desc: t('whyUs.customizationDesc'), bg: 'bg-mint' },
    { icon: Heart, title: t('whyUs.accessories'), desc: t('whyUs.accessoriesDesc'), bg: 'bg-lilac' },
    { icon: Users, title: t('whyUs.experience'), desc: t('whyUs.experienceDesc'), bg: 'bg-pink-soft' },
  ];

  const howSteps = [
    { num: '01', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc'), color: 'text-pink' },
    { num: '02', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc'), color: 'text-blue' },
    { num: '03', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc'), color: 'text-coral' },
    { num: '04', title: t('howItWorks.step4Title'), desc: t('howItWorks.step4Desc'), color: 'text-mint' },
  ];

  const eventChips: Array<{ value: string; label: string }> = [
    { value: 'mariage', label: t('contact.eventTypeOptions.mariage') },
    { value: 'entreprise', label: t('contact.eventTypeOptions.entreprise') },
    { value: 'anniversaire', label: t('contact.eventTypeOptions.anniversaire') },
    { value: 'baby-shower', label: t('contact.eventTypeOptions.baby-shower') },
    { value: 'graduation', label: t('contact.eventTypeOptions.graduation') },
    { value: 'autre', label: t('contact.eventTypeOptions.autre') },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <SEOHead language={language} translations={{ t }} />

      {isLoading && (
        <div className="fixed inset-0 bg-cream/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto mb-4"></div>
            <p className="text-ink-soft">Loading...</p>
          </div>
        </div>
      )}

      {/* NAV */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <nav className="max-w-[1320px] mx-auto bg-cream/85 backdrop-blur-xl border border-ink/10 rounded-full pl-6 pr-3 py-2.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-ink no-underline">
            <img src={newLogo} alt="Happy Booth" className="h-8 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button onClick={() => scrollToSection('models')} className="text-ink-soft hover:text-pink transition-colors">{t('nav.models')}</button>
            <button onClick={() => scrollToSection('why-us')} className="text-ink-soft hover:text-pink transition-colors">{t('nav.whyUs')}</button>
            <button onClick={() => scrollToSection('use-cases')} className="text-ink-soft hover:text-pink transition-colors">{t('nav.events')}</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-ink-soft hover:text-pink transition-colors">{t('nav.howItWorks')}</button>
            <button onClick={() => scrollToSection('faq')} className="text-ink-soft hover:text-pink transition-colors">{t('nav.faq')}</button>
          </div>
          <button
            onClick={() => scrollToSection('contact-form')}
            className="bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink hover:text-white transition-all"
          >
            {t('nav.getQuote')}
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        {/* Sparkle decorations */}
        <span className="absolute top-[6%] left-[6%] text-pink text-3xl pointer-events-none animate-sparkle-float">✦</span>
        <span className="absolute top-[14%] right-[8%] text-blue text-2xl pointer-events-none animate-sparkle-float" style={{ animationDelay: '1.5s' }}>✦</span>
        <span className="absolute bottom-[20%] left-[12%] text-yellow text-4xl pointer-events-none animate-sparkle-float" style={{ animationDelay: '3s' }}>✦</span>
        <span className="absolute bottom-[12%] right-[10%] text-mint text-2xl pointer-events-none animate-sparkle-float" style={{ animationDelay: '4.5s' }}>✦</span>

        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="max-w-5xl mx-auto text-center">
            {/* Google reviews badge — top */}
            <a
              href="https://www.google.com/search?q=happy+booth+lausanne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white border border-ink/10 pl-3 pr-4 py-1.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all mb-8 no-underline"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-semibold text-ink">5.0</span>
              <span className="text-yellow text-sm tracking-wider leading-none">★★★★★</span>
              <span className="text-xs text-ink-soft hidden sm:inline border-l border-ink/10 pl-2.5">{t('hero.basedOnReviews')}</span>
            </a>

            <h1 className="font-display font-bold text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight mb-8">
              {language === 'en' ? (
                <>
                  <span className="block">
                    Photobooth <span className="h1-highlight">rental</span>
                  </span>
                  <span className="block accent-italic">in French-speaking</span>
                  <span className="block accent-italic">Switzerland</span>
                </>
              ) : (
                <>
                  <span className="block">Location de</span>
                  <span className="block">
                    <span className="h1-highlight">photobooth</span>{' '}
                    <span className="accent-italic">en</span>
                  </span>
                  <span className="block accent-italic">Suisse Romande</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-ink-soft max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-7">
              <button
                onClick={() => scrollToSection('contact-form')}
                className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[15px] hover:bg-pink hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_20px_hsl(var(--pink)/0.3)] transition-all"
              >
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('models')}
                className="inline-flex items-center gap-2 bg-transparent text-ink px-7 py-4 rounded-full font-semibold text-[15px] border-[1.5px] border-ink/25 hover:bg-ink hover:text-cream hover:border-ink transition-all"
              >
                {t('nav.models')}
              </button>
            </div>

            {/* Feature points — discreet inline list under CTAs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm">
              {[t('hero.badge1'), t('hero.badge2'), t('hero.badge3')].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-ink">
                  <CheckCircle className="w-4 h-4 text-pink" />
                  <span className="font-medium">{b}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Scattered polaroids */}
          <div className="relative mt-16 md:mt-20 h-[340px] md:h-[440px]">
            {[
              { src: galleryImages[0].src, cls: 'left-[2%] md:left-[5%] top-10 w-[120px] h-[150px] md:w-[180px] md:h-[220px] -rotate-[8deg] z-[2]', cap: 'mariage' },
              { src: galleryImages[3].src, cls: 'left-[18%] md:left-[22%] top-24 md:top-[100px] w-[130px] h-[160px] md:w-[200px] md:h-[250px] rotate-[4deg] z-[3]', cap: 'fun' },
              { src: galleryImages[7].src, cls: 'left-[38%] md:left-[42%] top-5 w-[140px] h-[170px] md:w-[210px] md:h-[260px] -rotate-[3deg] z-[4]', cap: 'souvenirs' },
              { src: galleryImages[10].src, cls: 'right-[18%] md:right-[22%] top-24 md:top-[90px] w-[130px] h-[160px] md:w-[190px] md:h-[240px] rotate-[6deg] z-[3]', cap: 'rires' },
              { src: galleryImages[12].src, cls: 'right-[2%] md:right-[4%] top-10 md:top-[30px] w-[120px] h-[150px] md:w-[180px] md:h-[230px] -rotate-[5deg] z-[2]', cap: 'magie' },
            ].map((p, i) => (
              <div key={i} className={`polaroid absolute ${p.cls}`}>
                <div className="w-full h-full overflow-hidden">
                  <img src={p.src} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="polaroid-caption absolute bottom-2.5 left-0 right-0 text-center">{p.cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY (logos marquee) */}
      <section className="py-10 border-t border-ink/10 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <p className="text-center text-xs tracking-[0.1em] uppercase text-ink-soft/70 font-medium mb-6">
            {t('socialProof.clientsTitle')} — {t('socialProof.clientsDesc')}
          </p>
          <ClientLogosCarousel />
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow mb-5">{t('headings.galleryEyebrow')}</span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
              {t('headings.galleryTitle')} <span className="accent-italic">{t('headings.galleryTitleItalic')}</span>
            </h2>
            <p className="text-lg text-ink-soft">{t('gallery.subtitle')}</p>

            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <DialogTrigger asChild>
                <button className="mt-8 inline-flex items-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[15px] hover:bg-pink hover:text-white transition-all">
                  <Play className="w-4 h-4" />
                  {t('gallery.videoButton')}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-black">
                <div className="aspect-video w-full">
                  <iframe src="https://player.vimeo.com/video/731393641?badge=0&amp;autopause=0&amp;quality_selector=1&amp;progress_bar=1&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" className="w-full h-full rounded-lg" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="Happy Booth - Teaser" />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Carousel className="w-full" plugins={[Autoplay({ delay: 2000 })]} opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>

      {/* SOCIAL PROOF stats */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow mb-5">Confiance</span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
              1000+ clients <span className="accent-italic">depuis 2018.</span>
            </h2>
            <p className="text-lg text-ink-soft">{t('socialProof.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Star, value: '5/5', title: t('socialProof.rating'), desc: t('socialProof.ratingDesc'), bg: 'bg-yellow-soft' },
              { Icon: Heart, value: '1000+', title: t('socialProof.events'), desc: t('socialProof.eventsDesc'), bg: 'bg-pink-soft' },
              { Icon: MapPin, value: '100%', title: t('socialProof.coverage'), desc: t('socialProof.coverageDesc'), bg: 'bg-blue-soft' },
              { Icon: Award, value: '+8 ans', title: t('socialProof.experience'), desc: t('socialProof.experienceDesc'), bg: 'bg-mint' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-ink/10 rounded-3xl p-7 text-center hover:-translate-y-1 transition-transform">
                <div className={`w-14 h-14 ${s.bg} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <s.Icon className="w-6 h-6 text-ink" />
                </div>
                <div className="font-display font-bold text-4xl text-ink mb-2">{s.value}</div>
                <h3 className="font-display font-semibold text-base mb-1.5">{s.title}</h3>
                <p className="text-sm text-ink-soft/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="py-24 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow mb-5">{t('headings.useCasesEyebrow')}</span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
              {t('headings.useCasesTitle')} <span className="accent-italic">{t('headings.useCasesTitleItalic')}</span>
            </h2>
            <p className="text-lg text-ink-soft">{t('useCases.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.map((u, i) => (
              <div key={i} className={`${u.bg} rounded-3xl p-10 relative overflow-hidden min-h-[420px] flex flex-col justify-between hover:-translate-y-1.5 transition-transform`}>
                <div>
                  <div className="text-xs tracking-[0.1em] uppercase font-semibold text-ink/60 mb-4">{u.tag}</div>
                  <h3 className="font-display font-bold text-3xl leading-[1.05] mb-4 tracking-tight">{u.title}</h3>
                  <p className="text-[15px] text-ink-soft leading-relaxed mb-6">{u.desc}</p>
                </div>
                <button
                  onClick={() => scrollToSection('contact-form')}
                  className="self-start text-ink text-sm font-semibold inline-flex items-center gap-1.5 border-b-[1.5px] border-ink pb-0.5 hover:gap-2.5 transition-all"
                >
                  {t('useCases.cta')} <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -bottom-8 -right-5 text-[140px] opacity-25 leading-none -rotate-[8deg] pointer-events-none">{u.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS — black section */}
      <section id="models" className="py-24 bg-ink text-cream overflow-hidden">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow mb-5" style={{ color: 'hsl(var(--yellow))' }}>
              <style>{`#models .eyebrow::before{background:hsl(var(--yellow))}`}</style>
              {t('headings.modelsEyebrow')}
            </span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-cream mb-5">
              {t('headings.modelsTitle')} <span className="accent-italic">{t('headings.modelsTitleItalic')}</span>
            </h2>
            <p className="text-lg text-cream/70">{t('models.subtitle')}</p>
          </div>

          <Tabs value={selectedModel} onValueChange={setSelectedModel} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 p-1 h-auto gap-1 bg-white/5 border border-white/10 rounded-2xl">
              {models.map(model => (
                <TabsTrigger
                  key={model.id}
                  value={model.id}
                  className="data-[state=active]:bg-pink data-[state=active]:text-white text-cream/80 p-3 rounded-xl"
                >
                  <div className="text-center w-full">
                    <div className="font-display font-bold text-sm">{model.name}</div>
                    <div className="text-xs opacity-75">{model.price}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map(model => (
              <TabsContent key={model.id} value={model.id}>
                <div className="bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden grid lg:grid-cols-5">
                  <div className="lg:col-span-2 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={model.image}
                      alt={model.name}
                      className={`w-full h-full object-cover ${model.id === '360' ? 'scale-125' : ''}`}
                      style={model.id === '360' ? { objectPosition: '50% 40%' } : {}}
                    />
                  </div>
                  <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <h3 className="font-display font-bold text-3xl text-cream">{model.name}</h3>
                        <span className="font-display font-bold text-lg px-4 py-1.5 bg-yellow text-ink rounded-full">{model.price}</span>
                      </div>
                      <h4 className="font-display font-semibold text-xl mb-3 text-cream">{model.title}</h4>
                      <p className="text-cream/70 mb-6 leading-relaxed">{model.description}</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                        {model.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-mint mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-cream/85">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {model.included && (
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6">
                          <h5 className="font-display font-semibold text-mint mb-2">{t('models.includedTitle')}</h5>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {model.included.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-mint" />
                                <span className="text-sm text-cream/80">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {model.note && <p className="text-sm text-yellow font-medium mb-6">{model.note}</p>}
                    </div>
                    <button
                      onClick={() => { selectModel(model.id); scrollToSection('contact-form'); }}
                      className="w-full bg-pink text-white py-4 rounded-full font-semibold hover:bg-pink/90 transition-all"
                    >
                      {t('models.cta')}
                    </button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-10 max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="font-display font-semibold text-cream mb-2">{t('models.delivery')}</h3>
            <p className="text-cream/70 text-sm">{t('models.deliveryDesc')}</p>
            <p className="text-sm text-yellow mt-2 font-medium">{t('models.hostOption')}</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="eyebrow mb-5">Pourquoi nous</span>
              <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
                Le service qu'on aurait voulu <span className="accent-italic">trouver ailleurs.</span>
              </h2>
              <p className="text-lg text-ink-soft accent-italic">{t('whyUs.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {whyFeatures.map((f, i) => (
                <div key={i} className="pt-6 border-t-2 border-ink">
                  <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <f.icon className="w-5 h-5 text-ink" />
                  </div>
                  <h3 className="font-display font-bold text-[17px] mb-1.5">{f.title}</h3>
                  <p className="text-sm text-ink-soft/80 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-cream-warm">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow mb-5">{t('headings.howEyebrow')}</span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
              {t('headings.howTitle')} <span className="accent-italic">{t('headings.howTitleItalic')}</span>
            </h2>
            <p className="text-lg text-ink-soft">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howSteps.map((s, i) => (
              <div key={i} className="bg-cream rounded-3xl p-8 hover:-translate-y-1 transition-transform">
                <div className={`font-display font-extrabold text-6xl leading-none mb-5 ${s.color}`}>{s.num}</div>
                <h3 className="font-display font-bold text-xl mb-2.5">{s.title}</h3>
                <p className="text-sm text-ink-soft/80 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-cream overflow-hidden">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow mb-5">{t('headings.testimonialsEyebrow')}</span>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
              {t('headings.testimonialsTitle')} <span className="accent-italic">{t('headings.testimonialsTitleItalic')}</span>
            </h2>
            <p className="text-lg text-ink-soft">{t('testimonials.subtitle')}</p>
          </div>

          <Carousel plugins={[Autoplay({ delay: 5000 })]} className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((tm, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white border border-ink/10 rounded-3xl p-8 h-full hover:-translate-y-1 hover:shadow-xl transition-all">
                    <div className="text-yellow tracking-[2px] mb-4 text-base">★★★★★</div>
                    <p className="font-serif italic text-[22px] leading-[1.35] text-ink mb-7 tracking-tight">
                      "{tm.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${tm.color} text-white font-display font-bold flex items-center justify-center text-base`}>
                        {tm.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink">Google Review</div>
                        <div className="text-[13px] text-ink-soft/70 accent-italic">{tm.meta}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>

      {/* PRICING strip */}
      <section className="py-24 bg-cream-warm">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-ink/10 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-soft rounded-full z-0" />
            <div className="relative z-10">
              <span className="eyebrow mb-5">{t('headings.pricingEyebrow')}</span>
              <h3 className="font-display font-bold text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05] mb-4">
                {t('headings.pricingTitle')} <span className="accent-italic">{t('headings.pricingTitleItalic')}</span>
              </h3>
              <p className="text-[15px] text-ink-soft/80 mb-5">{t('models.subtitle')}</p>
              <span className="inline-block font-display font-bold text-lg px-4 py-1.5 bg-yellow text-ink rounded-full">
                290 — 1090 CHF
              </span>
            </div>
            <ul className="relative z-10 list-none">
              {tArray('headings.pricingItems').map((item: string, i: number) => (
                <li key={i} className="py-2.5 pl-8 text-[15px] text-ink relative border-b border-ink/10 last:border-b-0">
                  <span className="absolute left-0 top-3 w-5 h-5 bg-ink text-cream rounded-full text-[11px] font-bold flex items-center justify-center">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-cream">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <span className="eyebrow mb-5">{t('headings.faqEyebrow')}</span>
              <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1] mb-5">
                {t('headings.faqTitle')} <span className="accent-italic">{t('headings.faqTitleItalic')}</span>
              </h2>
              <p className="text-lg text-ink-soft">{t('faq.subtitle')}</p>
            </div>
            <Accordion type="single" collapsible className="w-full border-t border-ink/10">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-ink/10">
                  <AccordionTrigger className="text-left font-display font-semibold text-lg text-ink hover:text-pink py-6 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-soft leading-relaxed pb-6 text-[15px] whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CONTACT FORM — pink section */}
      <section id="contact-form" className="py-24 bg-pink relative overflow-hidden">
        <div className="absolute -top-40 -left-24 w-[400px] h-[400px] bg-yellow rounded-full opacity-35 pointer-events-none" />
        <div className="absolute -bottom-44 -right-28 w-[450px] h-[450px] bg-blue rounded-full opacity-25 pointer-events-none" />

        <div className="container mx-auto px-5 max-w-[1320px] relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <div>
              <span className="eyebrow mb-5" style={{ color: 'hsl(var(--ink))' }}>
                <style>{`#contact-form .eyebrow::before{background:hsl(var(--ink))}`}</style>
                {t('headings.contactEyebrow')}
              </span>
              <h2 className="font-display font-bold text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight text-ink mb-6">
                {t('headings.contactTitle')} <span className="accent-italic">{t('headings.contactTitleItalic')}</span>
              </h2>
              <p className="text-[17px] text-ink/80 mb-8 max-w-md">{t('contact.subtitle')}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { Icon: Clock, label: t('contact.badges.response') },
                  { Icon: CheckCircle, label: t('contact.badges.noCommitment') },
                  { Icon: Users, label: t('contact.badges.personalizedAdvice') },
                ].map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-cream/90 text-ink px-3 py-2 rounded-full text-xs font-semibold">
                    <b.Icon className="w-3.5 h-3.5" />
                    {b.label}
                  </span>
                ))}
              </div>

            </div>

            <div className="bg-cream rounded-3xl p-7 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]">
              <form onSubmit={handleSubmit} className="space-y-4" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                {/* Step indicator */}
                <div className="flex justify-center mb-6 gap-3">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm ${step <= formStep ? 'bg-ink text-cream' : 'bg-ink/10 text-ink/40'}`}>
                      {step}
                    </div>
                  ))}
                </div>

                {/* Step 1 */}
                {formStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-center mb-4">{t('contact.formStep1Title')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-xs font-semibold text-ink mb-2 block">{t('contact.name')} <span className="text-pink">*</span></Label>
                        <Input id="name" name="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required placeholder={t('contact.namePlaceholder')} className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6 focus-visible:ring-ink" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold text-ink mb-2 block">{t('contact.email')} <span className="text-pink">*</span></Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required placeholder={t('contact.emailPlaceholder')} className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6 focus-visible:ring-ink" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs font-semibold text-ink mb-2 block">{t('contact.phone')}</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder={t('contact.phonePlaceholder')} className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6 focus-visible:ring-ink" />
                    </div>
                    <button type="button" onClick={nextStep} disabled={!formData.name || !formData.email}
                      className="w-full bg-ink text-cream py-4 rounded-xl font-semibold hover:bg-pink hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                      {t('contact.continueButton')} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {formStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-center mb-4">{t('contact.formStep2Title')}</h3>

                    <div>
                      <Label className="text-xs font-semibold text-ink mb-2 block">{t('contact.eventType')}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {eventChips.map(chip => (
                          <button
                            type="button"
                            key={chip.value}
                            onClick={() => handleInputChange('eventType', chip.value)}
                            className={`px-3 py-2.5 text-center border-[1.5px] rounded-xl text-[13px] font-medium transition-all ${
                              formData.eventType === chip.value
                                ? 'bg-ink text-cream border-ink'
                                : 'bg-white text-ink border-ink/10 hover:border-ink'
                            }`}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-xs font-semibold text-ink mb-2 block">{t('contact.date')}</Label>
                        <Input id="date" name="date" type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6 focus-visible:ring-ink" />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-xs font-semibold text-ink mb-2 block">{t('contact.city')}</Label>
                        <Input id="city" name="city" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} placeholder={t('contact.cityPlaceholder')} className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6 focus-visible:ring-ink" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="guests" className="text-xs font-semibold text-ink mb-2 block">{t('contact.guests')}</Label>
                      <Select name="guests" value={formData.guests} onValueChange={value => handleInputChange('guests', value)}>
                        <SelectTrigger className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6">
                          <SelectValue placeholder={t('contact.guestsPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<50">{t('contact.guestOptions.<50')}</SelectItem>
                          <SelectItem value="50-100">{t('contact.guestOptions.50-100')}</SelectItem>
                          <SelectItem value="100-200">{t('contact.guestOptions.100-200')}</SelectItem>
                          <SelectItem value=">200">{t('contact.guestOptions.>200')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3">
                      <button type="button" onClick={prevStep} className="flex-1 bg-white border-[1.5px] border-ink/20 text-ink py-4 rounded-xl font-semibold hover:bg-ink hover:text-cream transition-all inline-flex items-center justify-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> {t('contact.backButton')}
                      </button>
                      <button type="button" onClick={nextStep} className="flex-1 bg-ink text-cream py-4 rounded-xl font-semibold hover:bg-pink hover:text-white transition-all inline-flex items-center justify-center gap-2">
                        {t('contact.continueButton')} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {formStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-center mb-4">{t('contact.formStep3Title')}</h3>

                    <div>
                      <Label htmlFor="model" className="text-xs font-semibold text-ink mb-2 block">{t('contact.modelLabel')}</Label>
                      <Select name="model" value={formData.model} onValueChange={value => handleInputChange('model', value)}>
                        <SelectTrigger className="bg-white border-[1.5px] border-ink/10 rounded-xl py-6">
                          <SelectValue placeholder={t('contact.modelOptions.conseil')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mirror">{t('contact.modelOptions.mirror')}</SelectItem>
                          <SelectItem value="rainbow">{t('contact.modelOptions.rainbow')}</SelectItem>
                          <SelectItem value="360">{t('contact.modelOptions.360')}</SelectItem>
                          <SelectItem value="retro">{t('contact.modelOptions.retro')}</SelectItem>
                          <SelectItem value="phone">{t('contact.modelOptions.phone')}</SelectItem>
                          <SelectItem value="conseil">{t('contact.modelOptions.conseil')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-xs font-semibold text-ink mb-2 block">{t('contact.message')}</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={e => handleInputChange('message', e.target.value)} placeholder={t('contact.messagePlaceholder')} rows={4} className="bg-white border-[1.5px] border-ink/10 rounded-xl focus-visible:ring-ink" />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox id="consent" name="consent" checked={formData.consent} onCheckedChange={checked => handleInputChange('consent', checked as boolean)} className="mt-1" />
                      <Label htmlFor="consent" className="text-sm leading-relaxed text-ink-soft">
                        {t('contact.contactConsent')}
                      </Label>
                    </div>

                    <input type="hidden" name="eventType" value={formData.eventType} />
                    <input type="hidden" name="gclid" value={formData.gclid} />
                    <input type="hidden" name="wbraid" value={formData.wbraid} />
                    <input type="hidden" name="gbraid" value={formData.gbraid} />

                    <div className="flex gap-3">
                      <button type="button" onClick={prevStep} className="flex-1 bg-white border-[1.5px] border-ink/20 text-ink py-4 rounded-xl font-semibold hover:bg-ink hover:text-cream transition-all inline-flex items-center justify-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> {t('contact.backButton')}
                      </button>
                      <button type="submit" disabled={!formData.consent} className="flex-1 bg-ink text-cream py-4 rounded-xl font-semibold hover:bg-pink hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                        {t('contact.submit')} <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-center text-xs text-ink-soft/70 mt-4">
                  {t('contact.thankYouDesc')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream/70 py-12">
        <div className="container mx-auto px-5 max-w-[1320px]">
          <div className="flex flex-col items-center text-center gap-5">
            <img src={newLogo} alt="Happy Booth" className="h-9 w-auto" />
            <p className="font-serif italic text-base text-cream/70 max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
            <LanguageSwitcher currentLanguage={language} />
          </div>
          <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-cream/60">
            <p>{t('footer.copyright')}</p>
            <p>
              {t('footer.builtBy')}{' '}
              <a
                href="https://valaisweb.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-cream underline underline-offset-2"
              >
                Valais Web
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
