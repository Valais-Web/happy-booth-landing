import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Heart, Building, Calendar, Users, Camera, CheckCircle, ArrowRight, Star, Award, MapPin, Clock, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { toast } from "sonner";
import { ClientLogosCarousel } from "@/components/ClientLogosCarousel";
import Autoplay from "embla-carousel-autoplay";
import useTranslation from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SEOHead from "@/components/SEOHead";

// Import images
import heroPhotobooth from "@/assets/hero-photobooth.jpg";
import photoboothCollection from "@/assets/photobooth-collection.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import weddingPhotobooth from "@/assets/wedding-photobooth.jpg";
import booth360 from "@/assets/360-booth.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";
import happyBoothLogo from "@/assets/happy-booth-logo.png";

// Import new images
const photoCollageBackground = "/lovable-uploads/6107f84d-437b-414d-899e-c282a7bf7ee2.png";
const photoboothPartyImage = "/lovable-uploads/a394bdcc-7200-44ef-89d9-880e117c95ab.png";
const newLogo = "/lovable-uploads/34b0e686-0ec5-4fb5-872c-39a4aa3d802c.png";
const Index = () => {
  const { t, tArray, language, isLoading } = useTranslation();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: '',
    city: '',
    model: '',
    guests: '',
    message: '',
    gclid: '',
    wbraid: '',
    gbraid: '',
    consent: false
  });
  const [selectedModel, setSelectedModel] = useState('mirror');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const galleryImages = [{
    src: "/lovable-uploads/86178317-da56-41e0-b0f0-29d6cbdb7e97.png",
    alt: "Groupe de femmes élégantes utilisant un photobooth en extérieur avec éclairage LED"
  }, {
    src: "/lovable-uploads/fc36c40b-ffdc-4035-b37a-5fcefb803b06.png",
    alt: "Trois amies s'amusant devant un photobooth miroir interactif"
  }, {
    src: "/lovable-uploads/04ace80f-35cc-45fc-9ee6-6abbb701fa67.png",
    alt: "Femme utilisant un photobooth tactile avec éclairage rouge LED"
  }, {
    src: "/lovable-uploads/5242a589-be2e-4df7-9969-e2d450b7df31.png",
    alt: "Deux amies avec lunettes de soleil roses posant pour un photobooth"
  }, {
    src: "/lovable-uploads/eb2cf670-4ade-4fb9-a4a3-e642a3e6966e.png",
    alt: "Groupe d'amies s'amusant avec accessoires photobooth colorés"
  }, {
    src: "/lovable-uploads/44dd8e6f-6d7d-4f28-93a9-ae97970c3087.png",
    alt: "Mur de photos imprimées du photobooth lors d'un événement"
  }, {
    src: "/lovable-uploads/42eadc60-f6f6-462e-9289-07b0649ad377.png",
    alt: "Couple élégant utilisant un photobooth 360 lors d'un événement formel"
  }, {
    src: "/lovable-uploads/3c4a797f-fefc-427b-9c8b-2f4ab5b9d29d.png",
    alt: "Amis posant devant un photobooth avec cadre personnalisé Mamma Mia"
  }, {
    src: "/lovable-uploads/efb782e4-48e6-4981-9ffd-c76d68e64b80.png",
    alt: "Photobooth moderne blanc dans un environnement moderne avec éclairage rouge"
  }, {
    src: "/lovable-uploads/f6d5733b-59ac-48cf-bebc-0372beec0d05.png",
    alt: "Couple utilisant un photobooth miroir LED avec éclairage vert coloré"
  }, {
    src: "/lovable-uploads/c7da75f9-3b3b-4755-bc47-92e9592fc7a1.png",
    alt: "Deux amies souriantes montrant leurs photos imprimées du photobooth"
  }, {
    src: "/lovable-uploads/2dd145c3-1fcc-4e8a-88b7-723a516d0ab9.png",
    alt: "Groupe d'amies utilisant un photobooth avec décoration argentée lors d'un événement"
  }, {
    src: "/lovable-uploads/e633d2a4-96c9-4680-89df-10441ae6271c.png",
    alt: "Groupe de femmes glamour s'amusant devant un photobooth lors d'une soirée élégante"
  }, {
    src: "/lovable-uploads/65254db7-af84-45ff-9e3e-04b394c9a4ca.png",
    alt: "Photo imprimée du photobooth avec cadre personnalisé pour événement corporatif"
  }, {
    src: "/lovable-uploads/fe600cdd-0c6d-4b2a-8da0-2d9c52e346d6.png",
    alt: "Femme utilisant un photobooth miroir avec effets spéciaux et éclairage coloré"
  }, {
    src: "/lovable-uploads/e6c8f3d5-9fd4-4f32-926f-93141334cefb.png",
    alt: "Photo imprimée du photobooth lors d'un événement TEDx avec branding personnalisé"
  }, {
    src: "/lovable-uploads/4f2cb588-fb28-4a67-863d-65b17ce7fc37.png",
    alt: "Photobooth miroir LED élégant installé lors d'un événement avec décoration florale"
  }, {
    src: "/lovable-uploads/b4e96505-76df-4e9a-b601-9de7e37e57c0.png",
    alt: "Invités s'amusant avec un photobooth miroir interactif lors d'une soirée privée"
  }, {
    src: "/lovable-uploads/487a833c-415d-45e4-b63b-917dc7c1e5a8.png",
    alt: "Photobooth moderne installé en extérieur sous un parasol avec éclairage LED"
  }, {
    src: "/lovable-uploads/4874f8c7-d042-479f-be4a-e683f3465b83.png",
    alt: "Groupe d'amis déguisés s'amusant devant un photobooth lors d'une fête costumée"
  }];
  useEffect(() => {
    // Capture URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      gclid: urlParams.get('gclid') || '',
      wbraid: urlParams.get('wbraid') || '',
      gbraid: urlParams.get('gbraid') || ''
    }));

    // Header sticky behavior
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Gallery auto-rotate
    const galleryInterval = setInterval(() => {
      setCurrentGalleryIndex(prev => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(galleryInterval);
    };
  }, []);
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  function encode(data: Record<string, string>) {
    return Object.keys(data)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
      )
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error(t('contact.errorConsent'));
      return;
    }

    try {
      // Submit to Netlify (must include "form-name" field)
      const netlifyFormData = {
        "form-name": "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        eventType: formData.eventType,
        city: formData.city,
        guests: formData.guests,
        model: formData.model,
        message: formData.message,
        gclid: formData.gclid,
        wbraid: formData.wbraid,
        gbraid: formData.gbraid,
        consent: formData.consent.toString()
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(netlifyFormData)
      });

      // Push to dataLayer for tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit',
          form: 'quote',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          eventType: formData.eventType,
          city: formData.city,
          guests: formData.guests,
          model: formData.model,
          message: formData.message,
          gclid: formData.gclid,
          wbraid: formData.wbraid,
          gbraid: formData.gbraid,
          timestamp: new Date().toISOString()
        });
      }

      toast.success(t('contact.successMessage'));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        eventType: '',
        city: '',
        guests: '',
        model: '',
        message: '',
        consent: false,
        gclid: '',
        wbraid: '',
        gbraid: ''
      });
      setFormStep(1);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };
  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };
  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };
  const selectModel = (model: string) => {
    setSelectedModel(model);
    handleInputChange('model', model);
  };
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const nextGalleryImage = () => {
    setCurrentGalleryIndex(prev => (prev + 1) % galleryImages.length);
  };
  const prevGalleryImage = () => {
    setCurrentGalleryIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  const models = [{
    id: 'mirror',
    name: t('models.mirrorBooth.name'),
    price: t('models.mirrorBooth.price'),
    title: t('models.mirrorBooth.title'),
    description: t('models.mirrorBooth.description'),
    image: '/lovable-uploads/a076d98b-87cf-4d16-b6bc-4ba9399b6dfb.png',
    features: tArray('models.mirrorBooth.features'),
    note: t('models.mirrorBooth.note'),
    included: tArray('models.mirrorBooth.included')
  }, {
    id: 'rainbow',
    name: t('models.rainbowBooth.name'),
    price: t('models.rainbowBooth.price'),
    title: t('models.rainbowBooth.title'),
    description: t('models.rainbowBooth.description'),
    image: '/lovable-uploads/7bbfe067-8199-4ede-8ab0-046d22fc465e.png',
    features: tArray('models.rainbowBooth.features'),
    included: tArray('models.rainbowBooth.included')
  }, {
    id: '360',
    name: t('models.booth360.name'),
    price: t('models.booth360.price'),
    title: t('models.booth360.title'),
    description: t('models.booth360.description'),
    image: '/lovable-uploads/d2564ea4-aa85-43bf-887a-04fd3d343436.png',
    features: tArray('models.booth360.features'),
    included: tArray('models.booth360.included')
  }, {
    id: 'retro',
    name: t('models.retroBooth.name'),
    price: t('models.retroBooth.price'),
    title: t('models.retroBooth.title'),
    description: t('models.retroBooth.description'),
    image: '/lovable-uploads/82b14e13-bb3a-4f24-8bd8-5f0342391319.png',
    features: tArray('models.retroBooth.features'),
    included: tArray('models.retroBooth.included')
  }, {
    id: 'phone',
    name: t('models.phoneBooth.name'),
    price: t('models.phoneBooth.price'),
    title: t('models.phoneBooth.title'),
    description: t('models.phoneBooth.description'),
    image: '/lovable-uploads/01038a35-68c2-4046-a7c9-d7bd12a8dd7f.png',
    features: tArray('models.phoneBooth.features'),
    included: tArray('models.phoneBooth.included')
  }];
  const faqItems = tArray('faq.items');
  return <div className="min-h-screen bg-background">
      {/* SEO Head component for hreflang tags */}
      <SEOHead language={language} translations={{ t }} />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHeaderSticky ? 'bg-primary/10 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={newLogo} alt="Happy Booth Logo" className="h-12 w-auto" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('models')} className="nav-link">{t('nav.models')}</button>
            <button onClick={() => scrollToSection('why-us')} className="nav-link">{t('nav.whyUs')}</button>
            <button onClick={() => scrollToSection('use-cases')} className="nav-link">{t('nav.events')}</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">{t('nav.howItWorks')}</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">{t('nav.faq')}</button>
          </nav>

          <Button variant="default" size="sm" onClick={() => scrollToSection('contact-form')}>
            {t('nav.getQuote')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
        {/* Background Image (Photo Collage) with Overlay */}
        <div className="absolute inset-0">
          <img src={photoCollageBackground} alt="Collage de photos souvenirs" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Content - 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block whitespace-nowrap">{t('hero.title1')}</span>
                <span className="block text-accent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
                  {t('hero.title2')}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed font-medium text-center lg:text-left">
                {t('hero.subtitle')}
              </p>

              {/* Benefit Badges - all on same line on desktop */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Camera className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">{t('hero.badge1')}</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">{t('hero.badge2')}</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">{t('hero.badge3')}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 lg:pt-8 flex justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300" onClick={() => scrollToSection('contact-form')}>
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 lg:w-6 h-5 lg:h-6" />
                </Button>
              </div>
            </div>

            {/* Right Content - 1/3 on desktop */}
            <div className="lg:col-span-1 relative flex justify-center mb-16 lg:mb-0">
              <div className="relative w-full max-w-sm lg:max-w-none">
                <img src="/lovable-uploads/ff5d47ab-254b-4e8b-bd44-ac626bf44c71.png" alt="Des gens qui s'amusent devant un photobooth" className="w-64 sm:w-72 lg:w-full h-auto rounded-2xl shadow-2xl border border-white/20 mx-auto" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Google Reviews Badge - centered on mobile, slightly overflowing left on desktop and very large screens */}
                <div className="absolute -bottom-4 left-1/2 lg:left-auto lg:-bottom-6 lg:-left-8 xl:-left-12 2xl:-left-16 transform -translate-x-1/2 lg:transform-none bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/lovable-uploads/82416f11-c9f5-4e9a-b407-60bbea2da5a8.png" alt="Google Reviews" className="h-16 lg:h-20 w-auto mx-auto" />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 whitespace-nowrap text-center">{t('hero.basedOnReviews')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('gallery.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('gallery.subtitle')}</p>
          </div>
          
          {/* Video Section with Button */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="mb-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  {t('gallery.videoButton')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-black">
                <div className="aspect-video w-full">
                  <iframe src="https://player.vimeo.com/video/731393641?badge=0&amp;autopause=0&amp;quality_selector=1&amp;progress_bar=1&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" className="w-full h-full rounded-lg" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="Happy Booth - Teaser" />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Photo Gallery - Carousel Layout */}
          <div className="max-w-6xl mx-auto">
            
            <Carousel className="w-full" plugins={[Autoplay({
            delay: 2000
          })]} opts={{
            align: "start",
            loop: true
          }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryImages.map((image, index) => <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
            
            {/* Mobile carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2 md:hidden">
              {galleryImages.map((_, index) => <button key={index} className={`w-2 h-2 rounded-full transition-colors ${index === currentGalleryIndex ? 'bg-primary' : 'bg-gray-300'}`} onClick={() => setCurrentGalleryIndex(index)} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('socialProof.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('socialProof.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">5/5</div>
              </div>
              <h3 className="font-semibold mb-2">{t('socialProof.rating')}</h3>
              <p className="text-sm text-muted-foreground">{t('socialProof.ratingDesc')}</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">1000+</div>
              </div>
              <h3 className="font-semibold mb-2">{t('socialProof.events')}</h3>
              <p className="text-sm text-muted-foreground">{t('socialProof.eventsDesc')}</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <MapPin className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">100%</div>
              </div>
              <h3 className="font-semibold mb-2">{t('socialProof.coverage')}</h3>
              <p className="text-sm text-muted-foreground">{t('socialProof.coverageDesc')}</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">+8 ans</div>
              </div>
              <h3 className="font-semibold mb-2">{t('socialProof.experience')}</h3>
              <p className="text-sm text-muted-foreground">{t('socialProof.experienceDesc')}</p>
            </Card>
          </div>

          {/* Client Logos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-4">{t('socialProof.clientsTitle')}</h3>
              <p className="text-muted-foreground">{t('socialProof.clientsDesc')}</p>
            </div>
            <ClientLogosCarousel />
          </div>

        </div>
      </section>

      {/* Models Section with Integrated Pricing */}
      <section id="models" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('models.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('models.subtitle')}
            </p>
          </div>

          <Tabs value={selectedModel} onValueChange={setSelectedModel} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 p-1 h-auto gap-1">
              {models.map(model => <TabsTrigger key={model.id} value={model.id} className="data-[state=active]:bg-primary data-[state=active]:text-white p-2 sm:p-3 lg:p-4 text-xs sm:text-sm font-medium flex items-center justify-center">
                  <div className="text-center w-full">
                    <div className="font-bold text-xs sm:text-sm">{model.name}</div>
                    <div className="text-xs opacity-75 text-center">{model.price}</div>
                  </div>
                </TabsTrigger>)}
            </TabsList>

            {models.map(model => <TabsContent key={model.id} value={model.id}>
                <Card className="max-w-6xl mx-auto overflow-hidden shadow-2xl">
                  <div className="grid lg:grid-cols-5">
                    <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden h-48 sm:h-64 lg:h-auto">
                      <img src={model.image} alt={model.name} className={`w-full h-full object-cover ${model.id === '360' ? 'object-center scale-125' : ''}`} style={model.id === '360' ? {
                    objectPosition: '50% 40%'
                  } : {}} />
                    </div>
                    
                    <CardContent className="lg:col-span-3 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold text-primary">{model.name}</h3>
                           <Badge variant="default" className="text-xl px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-center">
                             {model.price}
                           </Badge>
                        </div>
                        
                        <h4 className="text-xl font-semibold mb-4">{model.title}</h4>
                        <p className="text-muted-foreground mb-6">{model.description}</p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                          {model.features.map((feature, index) => <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>)}
                        </div>

                        {model.included && <div className="bg-green-50 p-4 rounded-lg mb-6">
                            <h5 className="font-semibold text-green-800 mb-2">{t('models.includedTitle')}</h5>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                              {model.included.map((item, index) => <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-700">{item}</span>
                                </div>)}
                            </div>
                          </div>}
                        
                        {model.note && <p className="text-sm text-primary font-medium mb-6">{model.note}</p>}
                      </div>
                      
                      <div className="space-y-3">
                        <Button className="w-full cta-primary text-lg py-3" onClick={() => {
                      selectModel(model.id);
                      scrollToSection('contact-form');
                    }}>
                          {t('models.cta')}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>)}
          </Tabs>
          
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">{t('models.delivery')}</h3>
              <p className="text-blue-700">{t('models.deliveryDesc')}</p>
              <p className="text-sm text-blue-600 mt-2">
                <strong>{t('models.hostOption')}</strong>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('whyUs.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('whyUs.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.local')}</h3>
              <p className="text-muted-foreground">{t('whyUs.localDesc')}</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.delivery')}</h3>
              <p className="text-muted-foreground">{t('whyUs.deliveryDesc')}</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Camera className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.unlimited')}</h3>
              <p className="text-muted-foreground">{t('whyUs.unlimitedDesc')}</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.customization')}</h3>
              <p className="text-muted-foreground">{t('whyUs.customizationDesc')}</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.accessories')}</h3>
              <p className="text-muted-foreground">{t('whyUs.accessoriesDesc')}</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">{t('whyUs.experience')}</h3>
              <p className="text-muted-foreground">{t('whyUs.experienceDesc')}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('useCases.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('useCases.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/d771b9da-b8b2-4894-b82c-7b7f3039f314.png" alt="Mariage avec photobooth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/35 backdrop-blur-[1px]" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Heart className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{t('useCases.weddings')}</h3>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground mb-4 flex-grow">
                  {t('useCases.weddingsDesc')}
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  {t('useCases.cta')}
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/9abc5a59-8f14-4549-9e70-851cd3908594.png" alt="Événement d'entreprise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/35 backdrop-blur-[1px]" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Building className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{t('useCases.corporate')}</h3>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground mb-4 flex-grow">
                  {t('useCases.corporateDesc')}
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  {t('useCases.cta')}
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/b365149b-da81-4e81-8ed5-3bc6de0c9867.png" alt="Anniversaire" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/35 backdrop-blur-[1px]" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{t('useCases.birthdays')}</h3>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground mb-4 flex-grow">
                  {t('useCases.birthdaysDesc')}
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  {t('useCases.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('howItWorks.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="mt-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">{t('howItWorks.step1Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('howItWorks.step1Desc')}
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="mt-8">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">{t('howItWorks.step2Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('howItWorks.step2Desc')}
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="mt-8">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">{t('howItWorks.step3Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('howItWorks.step3Desc')}
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="mt-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">{t('howItWorks.step4Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('howItWorks.step4Desc')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('testimonials.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('testimonials.subtitle')}</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel plugins={[Autoplay({
            delay: 5000
          })]} className="w-full" opts={{
            align: "start",
            loop: true
          }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* Testimonial 1 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Le photobooth Mirror est exceptionnel!! Vraiment parfait pour créer une ambiance festive auprès de nos invités. La qualité des photos est top 👍🏼 tactile, il a beaucoup de fonctionnalité. Je recommande à 100%"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 2 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Everything was perfect, we absolutely loved it and recommend their service! Good quality price :)"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 3 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Le photobooth rainbow était un succès total à ma fête d'anniversaire! Les photos sont d'excellente qualité et l'expérience digitale est très amusante. Je recommande vivement happybooth."
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 4 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "We had the best experience for my son's 1st birthday! From start to finish, the service was perfect. The photo quality was incredible, and the attendant was so friendly and professional."
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 5 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Super expérience que nous recommandons vivement ! Tous nos invités adoré le photobooth miroir. Un tout grand MERCI !"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 6 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Best service ever. Have had them at my wedding, at birthdays and special events of my family. They are 'The Photobooth', what else?"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 7 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Nous avons fait appel à Happy Booth pour notre mariage, et c'était juste parfait du début à la fin. Le design des cadres photo, créé sur mesure, était sublime. Service impeccable !"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 8 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Un grand merci ! Le photobooth a été un véritable succès. Service impeccable, produit au top, facile à utiliser. Tout le monde a adoré l'expérience."
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 9 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Nous avons fait appel à HappyBooth pour notre soirée de lancement, et nous en sommes ravis ! Communication fluide, service impeccable. Équipe professionnelle et sympathique."
                    </p>
                  </Card>
                </CarouselItem>

                {/* Testimonial 10 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Super contact avec Jessica dès la demande. L'équipe qui est venue monter le Photo Booth était adorable et hyper patiente ! Je recommande !"
                    </p>
                  </Card>
                </CarouselItem>

                {/* Additional testimonials continue with same pattern... */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Service et qualité au top! J'ai fait appel à Happy Booth pour mes 30 ans. Jessica et son mari sont super disponibles et à l'écoute."
                    </p>
                  </Card>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Deuxième magnifique expérience avec le miroir. Le succès a été époustouflant. Merci pour votre écoute et votre disponibilité."
                    </p>
                  </Card>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Exceptional Experience! The technology was incredibly cool. Professional service from start to finish. Highly recommended!"
                    </p>
                  </Card>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Une expérience extraordinaire !!! La mascotte de la soirée!!!"
                    </p>
                  </Card>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "We used the 360 video booth and it was amazing! Communication with Jessica was very responsive! Everyone loved it!"
                    </p>
                  </Card>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "Superbe expérience ! j'ai loué le Happy Rainbow pour les 30 ans de mon conjoint, c'était l'élément parfait pour des souvenirs mémorables !"
                    </p>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" />
              <CarouselNext className="hidden md:flex -right-12 lg:-right-16" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('faq.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-primary py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form - Multistep */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">{t('contact.title')}</h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('contact.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-4 sm:px-0">
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {t('contact.badges.response')}
                </Badge>
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {t('contact.badges.noCommitment')}
                </Badge>
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {t('contact.badges.personalizedAdvice')}
                </Badge>
              </div>
            </div>

            <Card className="p-4 sm:p-8 shadow-2xl mx-4 sm:mx-0">
              <form onSubmit={handleSubmit} className="space-y-6" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                {/* Step Indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3].map(step => <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step <= formStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                          {step}
                        </div>
                        {step < 3 && <ArrowRight className={`w-6 h-6 mx-2 ${step < formStep ? 'text-primary' : 'text-gray-300'}`} />}
                      </div>)}
                  </div>
                </div>

                {/* Step 1: Basic Info */}
                {formStep === 1 && <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-6">{t('contact.formStep1Title')}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('contact.name')} *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required placeholder={t('contact.namePlaceholder')} />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contact.email')} *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required placeholder={t('contact.emailPlaceholder')} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">{t('contact.phone')}</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder={t('contact.phonePlaceholder')} />
                    </div>

                    <Button type="button" onClick={nextStep} className="w-full cta-primary text-sm sm:text-base px-4 py-3" disabled={!formData.name || !formData.email}>
                      {t('contact.continueButton')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>}

                {/* Step 2: Event Details */}
                {formStep === 2 && <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-6">{t('contact.formStep2Title')}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">{t('contact.date')}</Label>
                        <Input id="date" name="date" type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="eventType">{t('contact.eventType')}</Label>
                        <Select name="eventType" onValueChange={value => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contact.eventTypePlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mariage">{t('contact.eventTypeOptions.mariage')}</SelectItem>
                            <SelectItem value="entreprise">{t('contact.eventTypeOptions.entreprise')}</SelectItem>
                            <SelectItem value="anniversaire">{t('contact.eventTypeOptions.anniversaire')}</SelectItem>
                            <SelectItem value="baby-shower">{t('contact.eventTypeOptions.baby-shower')}</SelectItem>
                            <SelectItem value="graduation">{t('contact.eventTypeOptions.graduation')}</SelectItem>
                            <SelectItem value="autre">{t('contact.eventTypeOptions.autre')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">{t('contact.city')}</Label>
                        <Input id="city" name="city" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} placeholder={t('contact.cityPlaceholder')} />
                      </div>
                      <div>
                        <Label htmlFor="guests">{t('contact.guests')}</Label>
                        <Select name="guests" onValueChange={value => handleInputChange('guests', value)}>
                          <SelectTrigger>
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
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 text-sm sm:text-base px-4 py-3">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        {t('contact.backButton')}
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1 cta-primary text-sm sm:text-base px-4 py-3">
                        {t('contact.continueButton')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>}

                {/* Step 3: Model and Message */}
                {formStep === 3 && <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-6">{t('contact.formStep3Title')}</h3>
                    
                    <div>
                      <Label htmlFor="model">{t('contact.modelLabel')}</Label>
                      <Select name="model" value={formData.model} onValueChange={value => handleInputChange('model', value)}>
                        <SelectTrigger>
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
                      <Label htmlFor="message">{t('contact.message')}</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={e => handleInputChange('message', e.target.value)} placeholder={t('contact.messagePlaceholder')} rows={4} />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="consent" name="consent" checked={formData.consent} onCheckedChange={checked => handleInputChange('consent', checked as boolean)} className="mt-1" />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        {t('contact.contactConsent')}
                      </Label>
                    </div>

                    {/* Hidden fields for tracking */}
                    <input type="hidden" name="gclid" value={formData.gclid} />
                    <input type="hidden" name="wbraid" value={formData.wbraid} />
                    <input type="hidden" name="gbraid" value={formData.gbraid} />

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 text-sm sm:text-base px-4 py-3">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        {t('contact.backButton')}
                      </Button>
                      <Button type="submit" className="flex-1 cta-primary text-sm sm:text-lg px-4 py-3" disabled={!formData.consent}>
                        {t('contact.submit')}
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>}
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src="/lovable-uploads/ac502686-5897-4be4-bf80-2dfb03d33219.png" alt="Happy Booth Logo" className="h-12 w-auto" />
            </div>
            
            <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/60">
                {t('footer.copyright')}
              </p>
              <LanguageSwitcher currentLanguage={language} />
            </div>
          </div>
        </div>
      </footer>

    </div>;
};
export default Index;