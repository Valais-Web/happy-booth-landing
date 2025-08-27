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
import { Phone, Mail, Instagram, MapPin, Users, Camera, Sparkles, Heart, Building, Calendar } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
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
    return () => window.removeEventListener('scroll', handleScroll);
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

  const selectModel = (model: string) => {
    setSelectedModel(model);
    handleInputChange('model', model);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const models = [
    {
      id: 'mirror',
      name: 'Mirror Booth',
      price: '1090 CHF',
      title: 'Le photobooth intelligent qui fait le show',
      description: 'Grand miroir tactile plein-pied, effets IA, signatures et emojis, cadres sur mesure, impressions illimitées. Le favori des mariages chic et des soirées corporate.',
      features: [
        'Animations thématiques & boomerangs',
        'Filtres & changement de fond boostés par l\'IA',
        'Écran d\'accueil & cadres brandés, choix du cadre par l\'invité',
        'Envoi e-mail instantané + galerie',
        'Impression photo pro illimitée',
        'Langues : FR, EN, DE, ES, PT, IT'
      ],
      note: 'Livraison & récupération gratuites sur Lausanne'
    },
    {
      id: 'rainbow',
      name: 'Rainbow Booth',
      price: '790 CHF',
      title: 'Chic, moderne, super fun',
      description: 'Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards.',
      features: [
        'Anneau lumineux arc-en-ciel, look tendance qui attire tous les regards',
        'Partage réseaux sociaux + impression sur place',
        'Cadres personnalisables, chaque invité choisit son préféré',
        'Impressions illimitées',
        '"Magic Screen" & fonds thématiques',
        'Option backdrops',
        'NOUVEAU : effets IA'
      ]
    },
    {
      id: '360',
      name: '360 Happy Booth',
      price: '890 CHF',
      title: 'Tournez, posez, brillez',
      description: 'Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop).',
      features: [
        'Vidéos illimitées avec envoi instantané (WhatsApp, e-mail, AirDrop)',
        'Effets personnalisés + superpositions brandées, musique',
        'Galerie en ligne. Plateforme 90 cm jusqu\'à 4 personnes, arrêt sécu',
        'Livraison, installation et récupération incluses à Lausanne',
        'Hôte possible 45 CHF/heure'
      ]
    },
    {
      id: 'retro',
      name: 'Retro Booth',
      price: '790 CHF',
      title: 'L\'élégance vintage qui fait fondre tous les cœurs',
      description: 'Style rétro-chic, format compact, ultra simple à utiliser.',
      features: [
        'Style rétro-chic, format compact, ultra simple à utiliser',
        'Impressions illimitées',
        'Effet miroir + écran tactile : signer, dessiner, emojis',
        'Cadres perso, galerie en ligne, accessoires fournis',
        'Option hôte 45 CHF/heure'
      ]
    },
    {
      id: 'phone',
      name: 'Phone Booth',
      price: '290 CHF',
      title: 'Audio guestbook vintage',
      description: 'Décroche, laisse un message, souriez — utilisation ultra simple.',
      features: [
        'Décroche, laisse un message, souriez — utilisation ultra simple',
        'Qualité audio claire, souvenirs à revivre',
        'Autonome sans Wi-Fi ni électricité, léger et facile à placer',
        'Message d\'accueil personnalisable, option panneau LED 35 CHF',
        'Logistique : avec photobooth on livre, sinon envoi postal très simple'
      ]
    }
  ];

  const faqItems = [
    {
      question: "Combien d'espace faut-il et peut-on l'installer dehors ?",
      answer: "Il faut environ 3×3 mètres et une prise électrique. L'installation en extérieur est possible si l'espace est abrité."
    },
    {
      question: "Y a-t-il une limite d'impressions ?",
      answer: "Non, les impressions sont illimitées pour tous nos modèles !"
    },
    {
      question: "Et si internet est faible ?",
      answer: "Pas de problème ! L'impression fonctionne hors ligne, les envois par e-mail se feront dès que le réseau sera disponible."
    },
    {
      question: "Quelle différence avec un smartphone ?",
      answer: "Nos photobooths offrent des cadres brandés, des accessoires, une impression immédiate, un grand angle, un éclairage studio professionnel et une expérience collective unique."
    },
    {
      question: "Quand réserver ?",
      answer: "Idéalement 2-4 mois à l'avance pour les grandes dates, mais nous acceptons aussi les réservations de dernière minute selon disponibilité."
    },
    {
      question: "Proposez-vous un opérateur ?",
      answer: "Oui, nous proposons un service d'hôte animateur à 45 CHF/heure pour accompagner vos invités."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHeaderSticky ? 'bg-primary/10 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">HAPPY BOOTH</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('models')} className="nav-link">Nos modèles</button>
            <button onClick={() => scrollToSection('why-us')} className="nav-link">Pourquoi nous</button>
            <button onClick={() => scrollToSection('use-cases')} className="nav-link">Mariage & Pro</button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">Tarifs</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </nav>

          <Button variant="default" size="sm" onClick={() => scrollToSection('hero-form')}>
            Devis rapide
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="hero-title">
                  Location de Photobooth en Suisse romande.<br />
                  <span className="text-accent">On est magique !</span>
                </h1>
                
                <p className="hero-subtitle">
                  Impressions illimitées, visuels 100 % personnalisés, livraison & installation incluses. 
                  Lausanne, Genève, Vaud & Valais.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="badge-feature">
                    <Camera className="w-4 h-4 mr-2" />
                    Impressions illimitées
                  </Badge>
                  <Badge variant="secondary" className="badge-feature">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Animations & boomerangs
                  </Badge>
                  <Badge variant="secondary" className="badge-feature">
                    <Heart className="w-4 h-4 mr-2" />
                    Parfait mariages & entreprises
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="cta-primary" onClick={() => scrollToSection('hero-form')}>
                    Obtenir un devis
                  </Button>
                  <Button variant="outline" size="lg" className="cta-phone">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler +41 79 244 72 17
                  </Button>
                  <Button variant="ghost" size="lg" onClick={() => scrollToSection('pricing')}>
                    Voir les tarifs
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Quote Form */}
            <Card className="form-card" id="hero-form">
              <CardHeader>
                <CardTitle className="text-center">Devis rapide (60 s)</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date de l'événement</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventType">Type d'événement</Label>
                      <Select onValueChange={(value) => handleInputChange('eventType', value)}>
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
                    <div>
                      <Label htmlFor="city">Ville/Lieu</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="model">Modèle souhaité</Label>
                      <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Conseillez-moi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mirror">Mirror Booth</SelectItem>
                          <SelectItem value="rainbow">Rainbow Booth</SelectItem>
                          <SelectItem value="360">360 Happy Booth</SelectItem>
                          <SelectItem value="retro">Retro Booth</SelectItem>
                          <SelectItem value="phone">Phone Booth</SelectItem>
                          <SelectItem value="conseil">Conseillez-moi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guests">Nombre d'invités</Label>
                      <Select onValueChange={(value) => handleInputChange('guests', value)}>
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

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Décrivez-nous votre événement..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                    />
                    <Label htmlFor="consent" className="text-sm">
                      J'accepte d'être contacté pour ce devis et la politique de confidentialité *
                    </Label>
                  </div>

                  {/* Hidden fields for tracking */}
                  <input type="hidden" value={formData.gclid} />
                  <input type="hidden" value={formData.wbraid} />
                  <input type="hidden" value={formData.gbraid} />

                  <Button type="submit" className="w-full cta-primary">
                    Obtenir mon devis gratuit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-8">
            Happy Clients — Voici quelques entreprises qui ont souri pour le Happy Booth
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <Badge variant="outline" className="px-4 py-2">BCV</Badge>
            <Badge variant="outline" className="px-4 py-2">Ville de Lausanne</Badge>
            <Badge variant="outline" className="px-4 py-2">EPFL</Badge>
            <Badge variant="outline" className="px-4 py-2">Montreux</Badge>
            <Badge variant="outline" className="px-4 py-2">UNIL</Badge>
          </div>
          <p className="mt-6 text-muted-foreground">
            Suivez-nous sur <a href="https://instagram.com/thehappybooth_ch" className="text-accent hover:underline">@thehappybooth_ch</a>
          </p>
        </div>
      </section>

      {/* Our Models */}
      <section id="models" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos modèles</h2>
            <p className="section-subtitle">
              Choisissez le photobooth parfait pour votre événement
            </p>
          </div>

          <Tabs value={selectedModel} onValueChange={setSelectedModel} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {models.map((model) => (
                <TabsTrigger key={model.id} value={model.id}>
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map((model) => (
              <TabsContent key={model.id} value={model.id}>
                <Card className="model-card">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="model-image">
                      <div className="h-64 lg:h-80 rounded-lg model-gradient flex items-center justify-center">
                        <Camera className="w-16 h-16 text-white/70" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="default" className="text-lg px-3 py-1 bg-accent text-white">{model.price}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{model.title}</h3>
                        <p className="text-muted-foreground mb-4">{model.description}</p>
                      </div>

                      <ul className="space-y-2">
                        {model.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {model.note && (
                        <p className="text-sm text-accent font-medium">{model.note}</p>
                      )}

                      <div className="flex gap-4">
                        <Button 
                          className="cta-primary"
                          onClick={() => {
                            selectModel(model.id);
                            scrollToSection('hero-form');
                          }}
                        >
                          Vérifier la disponibilité
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => scrollToSection('pricing')}
                        >
                          Voir tarifs détaillés
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why Happy Booth */}
      <section id="why-us" className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos photobooths t'offrent une soirée extraordinaire</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardHeader>
                <MapPin className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Local & fiable</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lausanne, Genève, Vaud & Valais</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Building className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Livraison & installation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>On s'occupe de tout</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Camera className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Imprimés illimités</CardTitle>
              </CardHeader>
              <CardContent>
                <p>De haute qualité</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Personnalisation totale</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cadres, animations HD, boomerangs</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Users className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Grand choix d'accessoires</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pour tous les styles d'événements</p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <Heart className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Don't worry</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Be Happy Booth</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="use-case-card use-case-wedding">
              <CardHeader>
                <Heart className="w-8 h-8 text-white mb-2" />
                <CardTitle className="text-white">Mariages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">
                  Brise-glace, livre d'or photo, cadres au thème du jour, service clé en main rassurant.
                </p>
                <Button variant="secondary" onClick={() => scrollToSection('hero-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="use-case-card use-case-business">
              <CardHeader>
                <Building className="w-8 h-8 text-white mb-2" />
                <CardTitle className="text-white">Entreprises</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">
                  Photos brandées, collecte d'e-mails, 360° pour activations, galerie privée sécurisée.
                </p>
                <Button variant="secondary" onClick={() => scrollToSection('hero-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>

            <Card className="use-case-card use-case-party">
              <CardHeader>
                <Calendar className="w-8 h-8 text-white mb-2" />
                <CardTitle className="text-white">Anniversaires & fêtes privées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">
                  Simple, fun, budget maîtrisé.
                </p>
                <Button variant="secondary" onClick={() => scrollToSection('hero-form')}>
                  Demander une offre
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Joue, imprime et partage !</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Pose devant le miroir</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Laisse libre cours à ta créativité</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Imprime sans compter</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Impressions illimitées, qualité pro</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Partage instantanément</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Par e-mail, galerie en ligne</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Tarifs transparents "all-inclusive"</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <Card key={model.id} className="pricing-card">
                <CardHeader>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                    <div className="text-3xl font-bold text-accent mb-2">{model.price}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {model.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full cta-primary"
                    onClick={() => {
                      selectModel(model.id);
                      scrollToSection('hero-form');
                    }}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-muted-foreground">
              Livraison & reprise incluses. Gratuit sur Lausanne.<br />
              Hors Lausanne : transport sur devis.
            </p>
            <Badge variant="default" className="text-lg px-4 py-2 bg-accent text-white">
              Option Hôte animateur : 45 CHF/heure
            </Badge>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-8">Zone de couverture</h2>
          <p className="text-xl mb-8">
            Nous couvrons Lausanne, Genève, Montreux, canton de Vaud & du Valais. 
            Installation pro, tests et reprise.
          </p>
          <Button 
            variant="default" 
            size="lg"
            className="cta-primary"
            onClick={() => scrollToSection('hero-form')}
          >
            Vérifier ma ville
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Contacte-nous. Nous voulons venir à ta fête !</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardHeader>
                <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
                <CardTitle>Téléphone</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+41792447217" className="text-accent hover:underline text-lg">
                  +41 79 244 72 17
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:hello@thehappybooth.net" className="text-accent hover:underline">
                  hello@thehappybooth.net
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Instagram className="w-8 h-8 text-accent mx-auto mb-4" />
                <CardTitle>Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="https://instagram.com/thehappybooth_ch" className="text-accent hover:underline">
                  @thehappybooth_ch
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold">HAPPY BOOTH</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Entreprise familiale fondée en 2018 à Lausanne. 
                Nous apportons une touche magique à vos événements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><button onClick={() => scrollToSection('models')}>Nos modèles</button></li>
                <li><button onClick={() => scrollToSection('pricing')}>Tarifs</button></li>
                <li><button onClick={() => scrollToSection('faq')}>FAQ</button></li>
                <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>+41 79 244 72 17</p>
                <p>hello@thehappybooth.net</p>
                <p>@thehappybooth_ch</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Happy Booth. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:hidden">
        <div className="flex gap-2">
          <Button 
            className="flex-1 cta-primary"
            onClick={() => scrollToSection('hero-form')}
          >
            Devis rapide
          </Button>
          <Button 
            variant="outline" 
            className="cta-phone"
            onClick={() => window.location.href = 'tel:+41792447217'}
          >
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;