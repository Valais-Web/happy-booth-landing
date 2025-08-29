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
    src: "/lovable-uploads/4dc5051d-dec2-45c9-8f53-9e243fdbd2a5.png",
    alt: "Groupe de femmes élégantes s'amusant avec des accessoires photobooth lors d'une soirée glamour"
  }, {
    src: "/lovable-uploads/e36ddf1f-fd75-4dab-a03e-2a815107bbe8.png",
    alt: "Groupe d'invités s'amusant devant un photobooth"
  }, {
    src: "/lovable-uploads/8a60f497-5e43-4f4a-a84e-6de61a53a43d.png",
    alt: "Groupe d'amis célébrant avec champagne et confettis"
  }, {
    src: "/lovable-uploads/a3047dbb-6b51-423a-9b01-c35e795d02a9.png",
    alt: "Fête avec confettis colorés et champagne"
  }, {
    src: "/lovable-uploads/5ae0f66e-36db-4464-9363-ce2c1c4448ab.png",
    alt: "Groupe festif avec chapeaux de Noël"
  }, {
    src: "/lovable-uploads/de88bc30-9aeb-4d9a-a81b-276d197bb678.png",
    alt: "Deux femmes souriantes tenant des photos de photobooth"
  }, {
    src: "/lovable-uploads/443dbe34-0895-4b83-82e3-3346546c59d6.png",
    alt: "Couple posant avec un cadre personnalisé Happy Booth lors d'un événement TEDx"
  }, {
    src: "/lovable-uploads/590cb129-8f7c-430a-8788-c25932913542.png",
    alt: "Deux amies avec cadre photo doré"
  }, {
    src: "/lovable-uploads/48d8a7d4-1938-4e90-9052-3e214fa89408.png", 
    alt: "Photos imprimées du photobooth avec un cadre personnalisé pour un événement corporate"
  }, {
    src: "/lovable-uploads/4a177c3d-bd93-4d8c-a6f3-fe9434e4a4be.png",
    alt: "Photobooth LED moderne installé en extérieur avec éclairage professionnel"
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("Veuillez accepter les conditions pour continuer");
      return;
    }

    // Push to dataLayer for tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'lead_submit',
        form: 'quote',
        gclid: formData.gclid
      });
    }
    toast.success("Demande envoyée ! Nous vous contactons rapidement.");
    console.log('Form submitted:', formData);
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
    name: 'Mirror Booth',
    price: '1090 CHF',
    title: 'Le photobooth intelligent qui fait le show',
    description: 'Grand miroir tactile plein-pied, effets IA, signatures et emojis, cadres sur mesure, impressions illimitées. Le favori des mariages chic et des soirées corporate.',
    image: '/lovable-uploads/a076d98b-87cf-4d16-b6bc-4ba9399b6dfb.png',
    features: ['Animations thématiques & boomerangs', 'Filtres & changement de fond boostés par l\'IA', 'Écran d\'accueil & cadres brandés, choix du cadre par l\'invité', 'Envoi e-mail instantané + galerie', 'Impression photo pro illimitée', 'Langues : FR, EN, DE, ES, PT, IT'],
    note: 'Livraison & récupération gratuites sur Lausanne',
    included: ['Installation & récupération', 'Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'rainbow',
    name: 'Rainbow Booth',
    price: '790 CHF',
    title: 'Chic, moderne, super fun',
    description: 'Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards.',
    image: '/lovable-uploads/ebd7d9bc-48dd-4de8-9840-b3b8e35ff60e.png',
    features: ['Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards', 'Partage réseaux sociaux + impression sur place', 'Cadres personnalisables, chaque invité choisit son préféré', 'Impressions illimitées', '"Magic Screen" & fonds thématiques', 'Option backdrops', 'NOUVEAU : effets IA'],
    included: ['Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: '360',
    name: '360 Happy Booth',
    price: '890 CHF',
    title: 'Tournez, posez, brillez',
    description: 'Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop).',
    image: '/lovable-uploads/d2564ea4-aa85-43bf-887a-04fd3d343436.png',
    features: ['Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop)', 'Effets personnalisés + superpositions brandées, musique', 'Galerie en ligne. Plateforme 90 cm jusqu\'à 4 personnes, arrêt sécu', 'Livraison, installation et récupération incluses à Lausanne'],
    included: ['Vidéos illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'retro',
    name: 'Retro Booth',
    price: '790 CHF',
    title: 'L\'élégance vintage qui fait fondre tous les cœurs',
    description: 'Style rétro-chic, format compact, ultra simple à utiliser.',
    image: '/lovable-uploads/01038a35-68c2-4046-a7c9-d7bd12a8dd7f.png',
    features: ['Style rétro-chic, format compact, ultra simple à utiliser', 'Impressions illimitées', 'Effet miroir + écran tactile : signer, dessiner, emojis', 'Cadres perso, galerie en ligne, accessoires fournis'],
    included: ['Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'phone',
    name: 'Phone Booth',
    price: '290 CHF',
    title: 'Audio guestbook vintage',
    description: 'Décroche, laisse un message, souriez — utilisation ultra simple.',
    image: '/lovable-uploads/82b14e13-bb3a-4f24-8bd8-5f0342391319.png',
    features: ['Décroche, laisse un message, souriez — utilisation ultra simple', 'Qualité audio claire, souvenirs à revivre', 'Autonome sans Wi-Fi ni électricité, léger et facile à placer', 'Message d\'accueil personnalisable, option panneau LED 35 CHF', 'Logistique : avec photobooth on livre, sinon envoi postal très simple'],
    included: ['Livraison & récupération', 'Messages audio illimités', 'Message d\'accueil personnalisé', 'Support technique']
  }];
  const faqItems = [{
    question: "Combien d'espace faut-il et peut-on l'installer dehors ?",
    answer: "Il faut environ 3×3 mètres et une prise électrique. L'installation en extérieur est possible si l'espace est abrité."
  }, {
    question: "Est-ce vraiment illimité pour les impressions ?",
    answer: "OUI ! Contrairement à nos concurrents qui limitent à 150-400 tirages, chez Happy Booth c'est VRAIMENT illimité. Vos invités peuvent imprimer autant qu'ils veulent. Plus il y a de photos, plus on rigole !"
  }, {
    question: "Comment récupère-t-on les photos numériques ?",
    answer: "Toutes les photos sont disponibles immédiatement dans une galerie en ligne privée accessible à tous vos invités. Vous recevrez également l'ensemble des fichiers haute définition après l'événement."
  }, {
    question: "Et si internet est faible ou le photobooth tombe en panne ?",
    answer: "Internet faible : Pas de problème ! L'impression fonctionne hors ligne, les envois par e-mail se feront dès que le réseau sera disponible.\n\nPanne (très rare) : Nous avons toujours un matériel de secours prêt et un technicien joignable 24/7. En cas de panne, nous remplaçons l'équipement dans l'heure ou nous vous remboursons intégralement la prestation. Aucun événement n'a jamais été gâché par une panne chez nous."
  }, {
    question: "Mes invités âgés ou les enfants sauront-ils l'utiliser ?",
    answer: "Absolument ! L'interface est ultra-intuitive avec des icônes claires et peut être configurée dans 6 langues. Les enfants dès 5 ans l'utilisent sans problème, et nous pouvons fournir un tabouret pour les plus petits. Option hôte disponible pour accompagner vos invités (45 CHF/heure)."
  }, {
    question: "Pourquoi ne pas simplement mettre un iPhone avec une imprimante ?",
    answer: "Un photobooth professionnel offre : qualité studio (éclairage, objectif pro), animations interactives impossibles sur smartphone, impressions instantanées haute qualité, gestion automatique des files d'attente, personnalisation complète, et surtout une vraie animation qui crée l'événement. Le DIY demande quelqu'un dédié toute la soirée."
  }, {
    question: "800-1000 CHF pour quelques heures, n'est-ce pas excessif ?",
    answer: "Divisé par 100 invités = 8-10 CHF par personne pour un souvenir personnalisé qu'ils garderont. Comparons : un photographe coûte 2000-4000 CHF, un DJ 1500 CHF. Notre équipement professionnel coûte plus de 15'000 CHF et nécessite maintenance, transport, personnalisation (2h de préparation graphique), installation (2h), et présence technique."
  }, {
    question: "Et si peu de gens l'utilisent finalement ?",
    answer: "Jamais arrivé en 1000+ événements ! Statistiques moyennes : 80% des invités l'utilisent, 3-5 passages par personne, 300-600 photos par événement de 100 personnes. Le placement stratégique (près du bar/piste) et nos accessoires fun garantissent le succès. Garantie \"satisfait ou remboursé\" si moins de 50 photos prises."
  }, {
    question: "Quand réserver ?",
    answer: "Idéalement 2-4 mois à l'avance pour les grandes dates, mais nous acceptons aussi les réservations de dernière minute selon disponibilité."
  }, {
    question: "Pourquoi payer plus cher qu'une offre d'un prestataire low-cost ?",
    answer: "Les offres économiques demandent souvent que vous gériez vous-même : le retrait du matériel (aller-retour en voiture), l'installation (1-2h de montage avec notice), la résolution des problèmes techniques, et le retour par transporteur. Elles limitent aussi généralement les impressions (200-400 maximum) - imaginez devoir refuser des tirages à vos invités en fin de soirée !\nNotre service premium inclut : installation/désinstallation complète par nos soins, impressions VRAIMENT illimitées (souvent 500+ photos par événement), support technique immédiat en cas de souci, technologies exclusives (Mirror avec IA, plateforme 360°), et personnalisation graphique professionnelle.\nLe surcoût de 200-300 CHF représente généralement moins de 3 CHF par invité pour éliminer tout stress et garantir une expérience parfaite. C'est l'assurance qu'au moindre problème, c'est notre responsabilité, pas la vôtre. Le jour de votre événement, vous avez mieux à faire que de jouer au technicien !"
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHeaderSticky ? 'bg-primary/10 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={newLogo} alt="Happy Booth Logo" className="h-12 w-auto" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('models')} className="nav-link">Nos modèles</button>
            <button onClick={() => scrollToSection('why-us')} className="nav-link">Pourquoi nous</button>
            <button onClick={() => scrollToSection('use-cases')} className="nav-link">Evenements</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">Comment ça marche</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
          </nav>

          <Button variant="default" size="sm" onClick={() => scrollToSection('contact-form')}>
            Demander une offre
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
                <span className="block whitespace-nowrap">Location de photobooth</span>
                <span className="block text-accent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
                  en Suisse Romande
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed font-medium text-center lg:text-left">
                Transformez vos événements en souvenirs inoubliables avec nos photomatons dernière génération
              </p>

              {/* Benefit Badges - all on same line on desktop */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Camera className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">Impressions illimitées</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">Service clé en main</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">100% personnalisable</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 lg:pt-8 flex justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                  <ArrowRight className="ml-2 w-5 lg:w-6 h-5 lg:h-6" />
                </Button>
              </div>
            </div>

            {/* Right Content - 1/3 on desktop */}
            <div className="lg:col-span-1 relative flex justify-center mb-16 lg:mb-0">
              <div className="relative w-full max-w-sm lg:max-w-none">
                <img 
                  src="/lovable-uploads/f84fb375-7807-44f3-9cd3-34e6c4074c9a.png" 
                  alt="Des gens qui s'amusent devant un photobooth" 
                  className="w-64 sm:w-72 lg:w-full h-auto rounded-2xl shadow-2xl border border-white/20 mx-auto"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Google Reviews Badge - centered on mobile, slightly overflowing left on desktop and very large screens */}
                <div className="absolute -bottom-4 left-1/2 lg:left-auto lg:-bottom-6 lg:-left-8 xl:-left-12 2xl:-left-16 transform -translate-x-1/2 lg:transform-none bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <img 
                      src="/lovable-uploads/82416f11-c9f5-4e9a-b407-60bbea2da5a8.png" 
                      alt="Google Reviews" 
                      className="h-16 lg:h-20 w-auto mx-auto"
                    />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 whitespace-nowrap text-center">Basé sur 37 avis</p>
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
            <h2 className="text-3xl font-bold mb-4">Nos photobooths en action</h2>
            <p className="text-xl text-muted-foreground">Découvrez l'ambiance magique de nos événements</p>
          </div>
          
          {/* Video Section with Button */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="mb-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Découvrir en vidéo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-black">
                <div className="aspect-video w-full">
                  <iframe 
                    src="https://player.vimeo.com/video/731393641?badge=0&amp;autopause=0&amp;quality_selector=1&amp;progress_bar=1&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" 
                    className="w-full h-full rounded-lg" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                    title="Happy Booth - Teaser"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Photo Gallery - Carousel Layout */}
          <div className="max-w-6xl mx-auto">
            
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 2000,
                })
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryImages.map((image, index) => (
                  <CarouselItem 
                    key={index}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
            
            {/* Mobile carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2 md:hidden">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentGalleryIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentGalleryIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi 1000+ clients nous font confiance depuis 2018</h2>
            <p className="text-xl text-muted-foreground">Découvrez les chiffres qui parlent d'eux-mêmes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">5/5</div>
              </div>
              <h3 className="font-semibold mb-2">Note moyenne clients</h3>
              <p className="text-sm text-muted-foreground">Basé sur 37+ avis vérifiés Google</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">1000+</div>
              </div>
              <h3 className="font-semibold mb-2">Événements réussis</h3>
              <p className="text-sm text-muted-foreground">Mariages, anniversaires, entreprises</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <MapPin className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">100%</div>
              </div>
              <h3 className="font-semibold mb-2">Couverture Suisse Romande</h3>
              <p className="text-sm text-muted-foreground">Lausanne, Genève, Vaud, Valais, Fribourg</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">+8 ans</div>
              </div>
              <h3 className="font-semibold mb-2">Expérience de la fête</h3>
              <p className="text-sm text-muted-foreground">Technologies exclusives en Suisse</p>
            </Card>
          </div>

          {/* Client Logos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-4">Happy Clients</h3>
              <p className="text-muted-foreground">Voici quelques entreprises qui ont souri pour le Happy Booth</p>
            </div>
            <ClientLogosCarousel />
          </div>

        </div>
      </section>

      {/* Models Section with Integrated Pricing */}
      <section id="models" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Nos modèles — Tarifs transparents "all-inclusive"</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète de photobooths avec tous les services inclus
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
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className={`w-full h-full object-cover ${
                          model.id === '360' ? 'object-center scale-125' : ''
                        }`}
                        style={model.id === '360' ? { objectPosition: '50% 40%' } : {}}
                      />
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
                            <h5 className="font-semibold text-green-800 mb-2">Inclus dans le prix :</h5>
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
                          Demander une offre
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>)}
          </Tabs>
          
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Livraison & reprise</h3>
              <p className="text-blue-700">Gratuit sur Lausanne. Hors Lausanne : transport sur devis.</p>
              <p className="text-sm text-blue-600 mt-2">
                <strong>Option Hôte animateur :</strong> 45 CHF/heure
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Nos photobooths t'offrent une soirée extraordinaire</h2>
            <p className="text-xl text-muted-foreground">"Don't worry, be Happy Booth."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Local & fiable</h3>
              <p className="text-muted-foreground">Partout en Suisse Romande</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Livraison & installation</h3>
              <p className="text-muted-foreground">On s'occupe de tout</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Camera className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Imprimés illimités</h3>
              <p className="text-muted-foreground">De haute qualité</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Personnalisation totale</h3>
              <p className="text-muted-foreground">Cadres, animations HD, boomerangs</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Grand choix d'accessoires</h3>
              <p className="text-muted-foreground">Pour tous les styles</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-3">Expérience collective</h3>
              <p className="text-muted-foreground">Souvenirs partagés inoubliables</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Quand louer un photobooth ?</h2>
            <p className="text-xl text-muted-foreground">Parfait pour tous vos événements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/d771b9da-b8b2-4894-b82c-7b7f3039f314.png" alt="Mariage avec photobooth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Heart className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Mariages</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Livre d'or photo, cadres au thème du jour, service clé en main rassurant.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/9abc5a59-8f14-4549-9e70-851cd3908594.png" alt="Événement d'entreprise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Building className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Entreprises</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Photos brandées, collecte d'e-mails, 360° pour activations, galerie privée sécurisée.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img src="/lovable-uploads/b365149b-da81-4e81-8ed5-3bc6de0c9867.png" alt="Anniversaire" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Anniversaires & fêtes privées</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Simple, fun, budget maîtrisé pour tous vos événements privés.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
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
            <h2 className="text-4xl font-bold mb-6">Comment ça marche ? Simple comme bonjour !</h2>
            <p className="text-xl text-muted-foreground">Votre événement parfait en 4 étapes faciles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="mt-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Réservez votre date</h3>
                <p className="text-sm text-muted-foreground">
                  Contactez-nous pour vérifier la disponibilité et recevoir un devis personnalisé en 24h
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="mt-8">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Personnalisation</h3>
                <p className="text-sm text-muted-foreground">
                  Nous créons vos cadres, animations et écrans aux couleurs de votre événement
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="mt-8">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Livraison & installation</h3>
                <p className="text-sm text-muted-foreground">
                  Notre équipe s'occupe de tout : livraison, installation, test. Zéro stress pour vous !
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="mt-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Profitez de la magie</h3>
                <p className="text-sm text-muted-foreground">
                  Vos invités s'amusent, créent des souvenirs et repartent avec leurs photos imprimées
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
            <h2 className="text-4xl font-bold mb-6">Ce que disent nos clients</h2>
            <p className="text-xl text-muted-foreground">Des centaines d'événements réussis et des clients ravis</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel
              plugins={[Autoplay({ delay: 5000 })]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {/* Testimonial 1 */}
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/lovable-uploads/6d5ed64f-b982-42cf-94ab-6c4be5136a9a.png" alt="Google" className="w-8 h-8 mr-2" />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
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
            <h2 className="text-4xl font-bold mb-6">Questions fréquentes</h2>
            <p className="text-xl text-muted-foreground">Tout ce que vous devez savoir</p>
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
              <h2 className="text-4xl font-bold mb-6">Réservez votre photobooth</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Obtenez votre devis personnalisé en quelques clics
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-4 sm:px-0">
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Réponse en 24h
                </Badge>
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Sans engagement
                </Badge>
                <Badge variant="secondary" className="px-3 py-2 text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Conseils personnalisés
                </Badge>
              </div>
            </div>

            <Card className="p-4 sm:p-8 shadow-2xl mx-4 sm:mx-0">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    <h3 className="text-xl font-semibold text-center mb-6">Parlez-nous de vous</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom *</Label>
                        <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required placeholder="Votre nom" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+41 79 XXX XX XX" />
                    </div>

                    <Button type="button" onClick={nextStep} className="w-full cta-primary text-sm sm:text-base px-4 py-3" disabled={!formData.name || !formData.email}>
                      Continuer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>}

                {/* Step 2: Event Details */}
                {formStep === 2 && <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-6">Détails de votre événement</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date de l'événement</Label>
                        <Input id="date" type="date" value={formData.date} onChange={e => handleInputChange('date', e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Type d'événement</Label>
                        <Select onValueChange={value => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mariage">Mariage</SelectItem>
                            <SelectItem value="entreprise">Soirée d'entreprise</SelectItem>
                            <SelectItem value="anniversaire">Anniversaire</SelectItem>
                            <SelectItem value="baby-shower">Baby shower</SelectItem>
                            <SelectItem value="graduation">Graduation</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville/Lieu</Label>
                        <Input id="city" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} placeholder="Lausanne, Genève..." />
                      </div>
                      <div>
                        <Label htmlFor="guests">Nombre d'invités</Label>
                        <Select onValueChange={value => handleInputChange('guests', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<50">&lt; 50</SelectItem>
                            <SelectItem value="50-100">50-100</SelectItem>
                            <SelectItem value="100-200">100-200</SelectItem>
                            <SelectItem value=">200">&gt; 200</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 text-sm sm:text-base px-4 py-3">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1 cta-primary text-sm sm:text-base px-4 py-3">
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>}

                {/* Step 3: Model and Message */}
                {formStep === 3 && <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-6">Finalisez votre demande</h3>
                    
                    <div>
                      <Label htmlFor="model">Modèle souhaité</Label>
                      <Select value={formData.model} onValueChange={value => handleInputChange('model', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Conseillez-moi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mirror">Mirror Booth - 1090 CHF</SelectItem>
                          <SelectItem value="rainbow">Rainbow Booth - 790 CHF</SelectItem>
                          <SelectItem value="360">360 Happy Booth - 890 CHF</SelectItem>
                          <SelectItem value="retro">Retro Booth - 790 CHF</SelectItem>
                          <SelectItem value="phone">Phone Booth - 290 CHF</SelectItem>
                          <SelectItem value="conseil">Conseillez-moi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea id="message" value={formData.message} onChange={e => handleInputChange('message', e.target.value)} placeholder="Décrivez-nous votre événement, vos besoins spécifiques..." rows={4} />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="consent" checked={formData.consent} onCheckedChange={checked => handleInputChange('consent', checked as boolean)} className="mt-1" />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        J'accepte d'être contacté pour ce devis et la politique de confidentialité *
                      </Label>
                    </div>

                    {/* Hidden fields for tracking */}
                    <input type="hidden" value={formData.gclid} />
                    <input type="hidden" value={formData.wbraid} />
                    <input type="hidden" value={formData.gbraid} />

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 text-sm sm:text-base px-4 py-3">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button type="submit" className="flex-1 cta-primary text-sm sm:text-lg px-4 py-3" disabled={!formData.consent}>
                        Demander une offre
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lovable-uploads/ac502686-5897-4be4-bf80-2dfb03d33219.png" alt="Happy Booth Logo" className="h-12 w-auto" />
              </div>
              <p className="text-white/80">
                Transformez vos événements en souvenirs inoubliables avec nos photomatons dernière génération.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('models')} className="block text-white/80 hover:text-white">Nos modèles</button>
                <button onClick={() => scrollToSection('why-us')} className="block text-white/80 hover:text-white">Pourquoi nous</button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-white/80 hover:text-white">Témoignages</button>
                <button onClick={() => scrollToSection('faq')} className="block text-white/80 hover:text-white">FAQ</button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Couverture</h3>
              <p className="text-white/80">
                Nous couvrons Lausanne, Genève, Montreux, canton de Vaud & du Valais. 
                Installation professionnelle, tests et reprise garantis.
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Happy Booth. Entreprise familiale fondée en 2018 à Lausanne. 
              Nous apportons une touche magique à vos événements.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50">
        <div className="flex space-x-2">
          <Button className="flex-1 cta-primary" onClick={() => scrollToSection('contact-form')}>
            Demander une offre
          </Button>
        </div>
      </div>
    </div>;
};
export default Index;