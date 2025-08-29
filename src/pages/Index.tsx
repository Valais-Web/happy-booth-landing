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
import { Sparkles, Heart, Building, Calendar, Users, Camera, CheckCircle, ArrowRight, Star, Award, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

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
  const galleryImages = [{
    src: heroPhotobooth,
    alt: "Photobooth miroir élégant à un mariage"
  }, {
    src: corporateEvent,
    alt: "Événement corporatif avec photobooth"
  }, {
    src: weddingPhotobooth,
    alt: "Mariés s'amusant au photobooth"
  }, {
    src: booth360,
    alt: "Photobooth 360° en action"
  }, {
    src: birthdayParty,
    alt: "Anniversaire avec photobooth rétro"
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
    features: ['Animations thématiques & boomerangs', 'Filtres & changement de fond boostés par l\'IA', 'Écran d\'accueil & cadres brandés, choix du cadre par l\'invité', 'Envoi e-mail instantané + galerie', 'Impression photo pro illimitée', 'Langues : FR, EN, DE, ES, PT, IT'],
    note: 'Livraison & récupération gratuites sur Lausanne',
    included: ['Installation & récupération', 'Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'rainbow',
    name: 'Rainbow Booth',
    price: '790 CHF',
    title: 'Chic, moderne, super fun',
    description: 'Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards.',
    features: ['Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards', 'Partage réseaux sociaux + impression sur place', 'Cadres personnalisables, chaque invité choisit son préféré', 'Impressions illimitées', '"Magic Screen" & fonds thématiques', 'Option backdrops', 'NOUVEAU : effets IA'],
    included: ['Installation & récupération', 'Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: '360',
    name: '360 Happy Booth',
    price: '890 CHF',
    title: 'Tournez, posez, brillez',
    description: 'Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop).',
    features: ['Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop)', 'Effets personnalisés + superpositions brandées, musique', 'Galerie en ligne. Plateforme 90 cm jusqu\'à 4 personnes, arrêt sécu', 'Livraison, installation et récupération incluses à Lausanne', 'Hôte possible 45 CHF/heure'],
    included: ['Installation & récupération', 'Vidéos illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'retro',
    name: 'Retro Booth',
    price: '790 CHF',
    title: 'L\'élégance vintage qui fait fondre tous les cœurs',
    description: 'Style rétro-chic, format compact, ultra simple à utiliser.',
    features: ['Style rétro-chic, format compact, ultra simple à utiliser', 'Impressions illimitées', 'Effet miroir + écran tactile : signer, dessiner, emojis', 'Cadres perso, galerie en ligne, accessoires fournis', 'Option hôte 45 CHF/heure'],
    included: ['Installation & récupération', 'Impressions illimitées', 'Galerie en ligne', 'Personnalisation complète', 'Support technique']
  }, {
    id: 'phone',
    name: 'Phone Booth',
    price: '290 CHF',
    title: 'Audio guestbook vintage',
    description: 'Décroche, laisse un message, souriez — utilisation ultra simple.',
    features: ['Décroche, laisse un message, souriez — utilisation ultra simple', 'Qualité audio claire, souvenirs à revivre', 'Autonome sans Wi-Fi ni électricité, léger et facile à placer', 'Message d\'accueil personnalisable, option panneau LED 35 CHF', 'Logistique : avec photobooth on livre, sinon envoi postal très simple'],
    included: ['Livraison & récupération', 'Messages audio illimités', 'Message d\'accueil personnalisé', 'Support technique']
  }];
  const faqItems = [{
    question: "Combien d'espace faut-il et peut-on l'installer dehors ?",
    answer: "Il faut environ 3×3 mètres et une prise électrique. L'installation en extérieur est possible si l'espace est abrité."
  }, {
    question: "Y a-t-il une limite d'impressions ?",
    answer: "Non, les impressions sont illimitées pour tous nos modèles !"
  }, {
    question: "Et si internet est faible ?",
    answer: "Pas de problème ! L'impression fonctionne hors ligne, les envois par e-mail se feront dès que le réseau sera disponible."
  }, {
    question: "Quelle différence avec un smartphone ?",
    answer: "Nos photobooths offrent des cadres brandés, des accessoires, une impression immédiate, un grand angle, un éclairage studio professionnel et une expérience collective unique."
  }, {
    question: "Quand réserver ?",
    answer: "Idéalement 2-4 mois à l'avance pour les grandes dates, mais nous acceptons aussi les réservations de dernière minute selon disponibilité."
  }, {
    question: "Proposez-vous un opérateur ?",
    answer: "Oui, nous proposons un service d'hôte animateur à 45 CHF/heure pour accompagner vos invités."
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
            <button onClick={() => scrollToSection('use-cases')} className="nav-link">Mariage & Pro</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">Comment ça marche</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
          </nav>

          <Button variant="default" size="sm" onClick={() => scrollToSection('contact-form')}>
            Demander une offre
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image (Photo Collage) with Overlay */}
        <div className="absolute inset-0">
          <img src={photoCollageBackground} alt="Collage de photos souvenirs" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75"></div>
        </div>

        {/* Main Party Image */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <img 
              src={photoboothPartyImage} 
              alt="Des gens qui s'amusent devant un photobooth" 
              className="w-96 h-auto rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Google Reviews Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <img 
                  src="/lovable-uploads/82416f11-c9f5-4e9a-b407-60bbea2da5a8.png" 
                  alt="Google Reviews" 
                  className="h-6 w-auto"
                />
              </div>
              <p className="text-sm text-gray-600 whitespace-nowrap">basé sur 37 avis</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-12">
            {/* Main Content */}
            <div className="space-y-8 text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Location de Photobooth
                <span className="block text-accent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  en Suisse Romande
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 max-w-2xl leading-relaxed font-medium">
                Transformez vos événements en souvenirs inoubliables avec nos photomatons dernière génération
              </p>

              {/* Benefit Badges */}
              <div className="flex flex-wrap gap-4 mt-12">
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">Impressions illimitées</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">Service clé en main</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">100% personnalisable</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
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
          
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img src={galleryImages[currentGalleryIndex].src} alt={galleryImages[currentGalleryIndex].alt} className="w-full h-full object-cover transition-all duration-500" />
            </div>
            
            <button onClick={prevGalleryImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button onClick={nextGalleryImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300">
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => <button key={index} onClick={() => setCurrentGalleryIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentGalleryIndex ? 'bg-primary' : 'bg-gray-300'}`} />)}
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
                <div className="text-4xl font-bold text-primary">4.9/5</div>
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
              <p className="text-sm text-muted-foreground">Mariages, anniversaires, corporate</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <MapPin className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">100%</div>
              </div>
              <h3 className="font-semibold mb-2">Couverture Suisse Romande</h3>
              <p className="text-sm text-muted-foreground">Lausanne, Genève, Montreux, Valais</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-primary">2018</div>
              </div>
              <h3 className="font-semibold mb-2">Pionnier du photobooth moderne</h3>
              <p className="text-sm text-muted-foreground">Technologies exclusives en Suisse</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg mb-6">Happy Clients — Voici quelques entreprises qui ont souri pour le Happy Booth</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
              <Badge variant="outline" className="px-4 py-2 text-base">BCV</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Ville de Lausanne</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">EPFL</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Montreux Jazz</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">UNIL</Badge>
            </div>
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
            <TabsList className="grid w-full grid-cols-5 mb-12 p-2 h-auto">
              {models.map(model => <TabsTrigger key={model.id} value={model.id} className="data-[state=active]:bg-primary data-[state=active]:text-white p-4 text-sm font-medium">
                  <div className="text-center">
                    <div className="font-bold">{model.name}</div>
                    <div className="text-xs opacity-75">{model.price}</div>
                  </div>
                </TabsTrigger>)}
            </TabsList>

            {models.map(model => <TabsContent key={model.id} value={model.id}>
                <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-8">
                      <img src={photoboothCollection} alt={model.name} className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>
                    
                    <CardContent className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold text-primary">{model.name}</h3>
                          <Badge variant="default" className="text-xl px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                            {model.price}
                          </Badge>
                        </div>
                        
                        <h4 className="text-xl font-semibold mb-4">{model.title}</h4>
                        <p className="text-muted-foreground mb-6">{model.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          {model.features.map((feature, index) => <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>)}
                        </div>

                        {model.included && <div className="bg-green-50 p-4 rounded-lg mb-6">
                            <h5 className="font-semibold text-green-800 mb-2">Inclus dans le prix :</h5>
                            <div className="grid grid-cols-1 gap-2">
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
              <h3 className="font-semibold text-blue-900 mb-2">Livraison & reprise incluses</h3>
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
              <p className="text-muted-foreground">Lausanne, Genève, Vaud & Valais</p>
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
                <img src={weddingPhotobooth} alt="Mariage avec photobooth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Heart className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Mariages</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Brise-glace, livre d'or photo, cadres au thème du jour, service clé en main rassurant.
                </p>
                <Button variant="outline" className="w-full" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img src={corporateEvent} alt="Événement d'entreprise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Building className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Entreprises</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Photos brandées, collecte d'e-mails, 360° pour activations, galerie privée sécurisée.
                </p>
                <Button variant="outline" className="w-full" onClick={() => scrollToSection('contact-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img src={birthdayParty} alt="Anniversaire" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Calendar className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Anniversaires & fêtes privées</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Simple, fun, budget maîtrisé pour tous vos événements privés.
                </p>
                <Button variant="outline" className="w-full" onClick={() => scrollToSection('contact-form')}>
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
                  Contactez-nous pour vérifier la disponibilité et recevoir un devis personnalisé en 2h
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

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Questions fréquentes</h2>
            <p className="text-xl text-muted-foreground">Tout ce que vous devez savoir</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
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
              
              <div className="flex justify-center space-x-4 mb-8">
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Réponse en 24h
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Sans engagement
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Conseils personnalisés
                </Badge>
              </div>
            </div>

            <Card className="p-8 shadow-2xl">
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

                    <Button type="button" onClick={nextStep} className="w-full cta-primary" disabled={!formData.name || !formData.email}>
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

                    <div className="flex space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1 cta-primary">
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

                    <div className="flex space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button type="submit" className="flex-1 cta-primary text-lg py-3" disabled={!formData.consent}>
                        Demander une offre
                        <CheckCircle className="w-5 h-5 ml-2" />
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
                <Sparkles className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold">HAPPY BOOTH</span>
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
                <button onClick={() => scrollToSection('use-cases')} className="block text-white/80 hover:text-white">Cas d'usage</button>
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