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

const IndexEn = () => {
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
    alt: "Group of elegant women having fun with photobooth accessories at a glamorous party"
  }, {
    src: "/lovable-uploads/e36ddf1f-fd75-4dab-a03e-2a815107bbe8.png",
    alt: "Group of guests having fun in front of a photobooth"
  }, {
    src: "/lovable-uploads/8a60f497-5e43-4f4a-a84e-6de61a53a43d.png",
    alt: "Group of friends celebrating with champagne and confetti"
  }, {
    src: "/lovable-uploads/a3047dbb-6b51-423a-9b01-c35e795d02a9.png",
    alt: "Party with colorful confetti and champagne"
  }, {
    src: "/lovable-uploads/5ae0f66e-36db-4464-9363-ce2c1c4448ab.png",
    alt: "Festive group with Christmas hats"
  }, {
    src: "/lovable-uploads/de88bc30-9aeb-4d9a-a81b-276d197bb678.png",
    alt: "Two smiling women holding photobooth photos"
  }, {
    src: "/lovable-uploads/443dbe34-0895-4b83-82e3-3346546c59d6.png",
    alt: "Couple posing with a customized Happy Booth frame at a TEDx event"
  }, {
    src: "/lovable-uploads/590cb129-8f7c-430a-8788-c25932913542.png",
    alt: "Two friends with golden photo frame"
  }, {
    src: "/lovable-uploads/48d8a7d4-1938-4e90-9052-3e214fa89408.png", 
    alt: "Printed photobooth photos with a custom frame for a corporate event"
  }, {
    src: "/lovable-uploads/4a177c3d-bd93-4d8c-a6f3-fe9434e4a4be.png",
    alt: "Modern LED photobooth installed outdoors with professional lighting"
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
      toast.error("Please accept the terms and conditions to continue");
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

    toast.success("Request sent! We'll contact you shortly.");
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
    title: 'The smart photobooth that steals the show',
    description: 'Large full-length tactile mirror, AI effects, signatures and emojis, custom frames, unlimited prints. The favorite of chic weddings and corporate events.',
    image: '/lovable-uploads/a076d98b-87cf-4d16-b6bc-4ba9399b6dfb.png',
    features: ['Thematic animations & boomerangs', 'Filters & AI-powered background change', 'Welcome screen & branded frames, guest choice of frame', 'Instant email delivery + gallery', 'Unlimited professional photo printing', 'Languages: FR, EN, DE, ES, PT, IT'],
    note: 'Free delivery & pickup in Lausanne',
    included: ['Installation & pickup', 'Unlimited prints', 'Online gallery', 'Full customization', 'Technical support']
  }, {
    id: 'rainbow',
    name: 'Rainbow Booth',
    price: '790 CHF',
    title: 'Chic, modern, super fun',
    description: 'Rainbow light ring, trendy look that catches everyone\'s attention.',
    image: '/lovable-uploads/ebd7d9bc-48dd-4de8-9840-b3b8e35ff60e.png',
    features: ['Rainbow light ring, trendy look that catches everyone\'s attention', 'Social media sharing + on-site printing', 'Customizable frames, each guest chooses their favorite', 'Unlimited prints', '"Magic Screen" & thematic backgrounds', 'Backdrop options', 'NEW: AI effects'],
    included: ['Unlimited prints', 'Online gallery', 'Full customization', 'Technical support']
  }, {
    id: '360',
    name: '360 Happy Booth',
    price: '890 CHF',
    title: 'Spin, pose, shine',
    description: 'Unlimited videos with instant delivery (WhatsApp, email, AirDrop).',
    image: '/lovable-uploads/d2564ea4-aa85-43bf-887a-04fd3d343436.png',
    features: ['Unlimited videos with instant delivery (WhatsApp, email, AirDrop)', 'Custom effects + branded overlays, music', 'Online gallery. 90cm platform for up to 4 people, safety stop', 'Delivery, installation and pickup included in Lausanne'],
    included: ['Unlimited videos', 'Online gallery', 'Full customization', 'Technical support']
  }, {
    id: 'retro',
    name: 'Retro Booth',
    price: '790 CHF',
    title: 'Vintage elegance that melts every heart',
    description: 'Retro-chic style, compact format, ultra simple to use.',
    image: '/lovable-uploads/01038a35-68c2-4046-a7c9-d7bd12a8dd7f.png',
    features: ['Retro-chic style, compact format, ultra simple to use', 'Unlimited prints', 'Mirror effect + touch screen: sign, draw, emojis', 'Custom frames, online gallery, accessories provided'],
    included: ['Unlimited prints', 'Online gallery', 'Full customization', 'Technical support']
  }, {
    id: 'phone',
    name: 'Phone Booth',
    price: '290 CHF',
    title: 'Vintage audio guestbook',
    description: 'Pick up, leave a message, smile — ultra simple to use.',
    image: '/lovable-uploads/82b14e13-bb3a-4f24-8bd8-5f0342391319.png',
    features: ['Pick up, leave a message, smile — ultra simple to use', 'Clear audio quality, memories to relive', 'Standalone without Wi-Fi or electricity, lightweight and easy to place', 'Customizable welcome message, LED panel option 35 CHF', 'Logistics: delivered with photobooth, otherwise very simple postal delivery'],
    included: ['Delivery & pickup', 'Unlimited audio messages', 'Custom welcome message', 'Technical support']
  }];

  const faqItems = [{
    question: "How much space is needed and can it be installed outdoors?",
    answer: "You need about 3×3 meters and an electrical outlet. Outdoor installation is possible if the space is sheltered."
  }, {
    question: "Are the prints really unlimited?",
    answer: "YES! Unlike our competitors who limit to 150-400 prints, at Happy Booth it's TRULY unlimited. Your guests can print as much as they want. The more photos, the more fun!"
  }, {
    question: "How do we get the digital photos?",
    answer: "All photos are immediately available in a private online gallery accessible to all your guests. You'll also receive all high-definition files after the event."
  }, {
    question: "What if the internet is weak or the photobooth breaks down?",
    answer: "Weak internet: No problem! Printing works offline, email sending will happen as soon as the network is available.\n\nBreakdown (very rare): We always have backup equipment ready and a technician available 24/7. In case of breakdown, we replace the equipment within an hour or we fully refund the service. No event has ever been ruined by a breakdown with us."
  }, {
    question: "Will my elderly guests or children know how to use it?",
    answer: "Absolutely! The interface is ultra-intuitive with clear icons and can be configured in 6 languages. Children from 5 years old use it without problems, and we can provide a stool for the smallest ones. Host option available to assist your guests (45 CHF/hour)."
  }, {
    question: "Why not simply use an iPhone with a printer?",
    answer: "A professional photobooth offers: studio quality (lighting, pro lens), interactive animations impossible on smartphones, instant high-quality prints, automatic queue management, full customization, and especially real animation that creates the event. DIY requires someone dedicated all evening."
  }, {
    question: "800-1000 CHF for a few hours, isn't that excessive?",
    answer: "Divided by 100 guests = 8-10 CHF per person for a personalized souvenir they'll keep. Let's compare: a photographer costs 2000-4000 CHF, a DJ 1500 CHF. Our professional equipment costs over 15,000 CHF and requires maintenance, transport, customization (2h graphic preparation), installation (2h), and technical presence."
  }, {
    question: "What if few people use it in the end?",
    answer: "Never happened in 1000+ events! Average statistics: 80% of guests use it, 3-5 passes per person, 300-600 photos per event of 100 people. Strategic placement (near bar/dance floor) and our fun accessories guarantee success. \"Satisfied or refunded\" guarantee if less than 50 photos taken."
  }, {
    question: "When to book?",
    answer: "Ideally 2-4 months in advance for major dates, but we also accept last-minute bookings subject to availability."
  }, {
    question: "Why pay more than a low-cost provider's offer?",
    answer: "Budget offers often require you to manage yourself: equipment pickup (round trip by car), installation (1-2h assembly with manual), resolving technical problems, and return by carrier. They also generally limit prints (200-400 maximum) - imagine having to refuse prints to your guests at the end of the evening!\nOur premium service includes: complete installation/removal by us, TRULY unlimited prints (often 500+ photos per event), immediate technical support in case of issues, exclusive technologies (Mirror with AI, 360° platform), and professional graphic customization.\nThe 200-300 CHF surcharge represents generally less than 3 CHF per guest to eliminate all stress and guarantee a perfect experience. It's the assurance that at the slightest problem, it's our responsibility, not yours. On your event day, you have better things to do than play technician!"
  }];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHeaderSticky ? 'bg-primary/10 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={newLogo} alt="Happy Booth Logo" className="h-12 w-auto" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('models')} className="nav-link">Our Models</button>
            <button onClick={() => scrollToSection('why-us')} className="nav-link">Why Us</button>
            <button onClick={() => scrollToSection('use-cases')} className="nav-link">Events</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
          </nav>

          <Button variant="default" size="sm" onClick={() => scrollToSection('contact-form')}>
            Request Quote
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
        {/* Background Image (Photo Collage) with Overlay */}
        <div className="absolute inset-0">
          <img src={photoCollageBackground} alt="Memory photo collage" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Content - 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block whitespace-nowrap">Photobooth Rental</span>
                <span className="block text-accent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
                  in French-speaking Switzerland
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed font-medium text-center lg:text-left">
                Transform your events into unforgettable memories with our latest generation photo booths
              </p>

              {/* Benefit Badges - all on same line on desktop */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Camera className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">Unlimited prints</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">Turnkey service</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 lg:px-6 py-3 flex items-center space-x-2 justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm lg:text-base">100% customizable</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="cta-primary text-lg px-8 py-4 h-auto"
                  onClick={() => scrollToSection('contact-form')}
                >
                  <span>Request Your Free Quote</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Content - Gallery - 1/3 on desktop */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-md">
                {/* Main Gallery Image */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src={galleryImages[currentGalleryIndex].src}
                    alt={galleryImages[currentGalleryIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gallery Navigation */}
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                      onClick={prevGalleryImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                      onClick={nextGalleryImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Gallery Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentGalleryIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentGalleryIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  ✨ Popular
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  🎉 Fun guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why choose <span className="text-accent">Happy Booth</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With over 1000 successful events, we are the trusted reference for photobooth rental in French-speaking Switzerland
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-green-500" />,
                title: "Truly unlimited prints",
                description: "Unlike our competitors who limit to 150-400 prints, with us it's REALLY unlimited. Your guests can print as much as they want!"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-purple-500" />,
                title: "Latest AI technology",
                description: "Background change, advanced filters, thematic animations... Our booths use the most advanced technologies for maximum fun."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Turnkey service",
                description: "We take care of everything: delivery, installation, customization, technical support and pickup. You just enjoy!"
              },
              {
                icon: <Award className="w-8 h-8 text-yellow-500" />,
                title: "Premium quality",
                description: "Professional equipment worth over 15,000 CHF, studio lighting, professional lens for perfect quality photos."
              },
              {
                icon: <Clock className="w-8 h-8 text-red-500" />,
                title: "24/7 technical support",
                description: "A problem? Our technician is reachable 24/7 and we have backup equipment. No stress, we handle everything."
              },
              {
                icon: <Heart className="w-8 h-8 text-pink-500" />,
                title: "100% personalized",
                description: "Your colors, your logo, your message... Each photobooth is unique and reflects your event perfectly."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose your <span className="text-accent">photobooth</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From the intelligent Mirror Booth to the trendy 360°, each model is designed to make your event unforgettable
            </p>
          </div>

          <Tabs value={selectedModel} onValueChange={setSelectedModel} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full mb-12">
              {models.map((model) => (
                <TabsTrigger 
                  key={model.id} 
                  value={model.id}
                  className="text-xs sm:text-sm py-3 px-2 sm:px-4"
                >
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map((model) => (
              <TabsContent key={model.id} value={model.id}>
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative">
                      <img 
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-accent text-black font-bold text-lg px-4 py-2">
                          {model.price}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-bold mb-2">{model.name}</h3>
                          <p className="text-xl text-accent font-semibold mb-4">{model.title}</p>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {model.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg">✨ What's included:</h4>
                          <ul className="space-y-2">
                            {model.features.map((feature, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {model.note && (
                          <div className="bg-accent/10 p-4 rounded-lg">
                            <p className="text-sm font-medium text-accent">💡 {model.note}</p>
                          </div>
                        )}

                        <Button 
                          className="w-full cta-primary text-lg py-6"
                          onClick={() => {
                            selectModel(model.id);
                            scrollToSection('contact-form');
                          }}
                        >
                          Choose {model.name}
                          <ArrowRight className="w-5 h-5 ml-2" />
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

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect for all your <span className="text-accent">events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Weddings, corporate parties, birthdays... Our photobooths adapt to all occasions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Weddings",
                description: "Create magical memories for you and your guests with elegant and personalized photobooths.",
                image: weddingPhotobooth,
                icon: <Heart className="w-6 h-6 text-pink-500" />,
                features: ["Custom wedding frames", "Guest book integration", "Romantic animations"]
              },
              {
                title: "Corporate Events",
                description: "Strengthen team spirit and your brand image with professional photobooths.",
                image: corporateEvent,
                icon: <Building className="w-6 h-6 text-blue-500" />,
                features: ["Company branding", "Professional quality", "Team building"]
              },
              {
                title: "Birthdays & Parties",
                description: "Add a fun touch to your celebrations with colorful and interactive photobooths.",
                image: birthdayParty,
                icon: <Users className="w-6 h-6 text-purple-500" />,
                features: ["Themed animations", "Fun accessories", "Instant sharing"]
              }
            ].map((useCase, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    {useCase.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How does it <span className="text-accent">work</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A simple and turnkey process for maximum satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Contact & Quote",
                description: "Tell us about your event and receive a personalized quote within 24h",
                icon: <Calendar className="w-8 h-8 text-accent" />
              },
              {
                step: "02", 
                title: "Customization",
                description: "We create your custom frames and configure the photobooth according to your wishes",
                icon: <Sparkles className="w-8 h-8 text-accent" />
              },
              {
                step: "03",
                title: "Installation",
                description: "Our team delivers and installs everything. The photobooth is ready to use in 30 minutes",
                icon: <CheckCircle className="w-8 h-8 text-accent" />
              },
              {
                step: "04",
                title: "Fun & Memories",
                description: "Your guests have fun and leave with printed photos and digital access",
                icon: <Camera className="w-8 h-8 text-accent" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-accent text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              They trust us
            </h2>
            <p className="text-lg text-muted-foreground">
              Over 1000 successful events with prestigious clients
            </p>
          </div>
          <ClientLogosCarousel />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See our photobooths <span className="text-accent">in action</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our photobooths create unforgettable moments at every event
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={photoboothPartyImage}
                alt="Photobooth in action at a party"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30 h-20 w-20 rounded-full p-0">
                      <Play className="w-8 h-8 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0">
                    <div className="aspect-video">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Happy Booth Demo Video"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Successful Events" },
              { number: "50000+", label: "Happy Guests" },
              { number: "500000+", label: "Photos Printed" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">{stat.number}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">Happy</span> memories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover some of the magical moments created with our photobooths
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What our <span className="text-accent">clients</span> say
            </h2>
            <p className="text-xl text-muted-foreground">
              Authentic testimonials from satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The Mirror Booth was a huge hit at our wedding! The AI effects are incredible and the photo quality is professional. All our guests loved it!",
                author: "Sarah & Marc",
                event: "Wedding in Lausanne",
                rating: 5
              },
              {
                text: "Perfect for our company event. The customization with our logo was spot on and the turnkey service allowed us to focus on our guests.",
                author: "Thomas Mueller",
                event: "Corporate Event",
                rating: 5
              },
              {
                text: "The 360 Booth was incredible for our birthday party! The videos are so much fun and the instant sharing worked perfectly.",
                author: "Julie",
                event: "30th Birthday",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.event}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to the most common questions about our photobooth services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left py-6 hover:no-underline">
                    <span className="font-semibold pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                  Get your <span className="text-accent">free quote</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Tell us about your event and receive a personalized quote within 24 hours
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit} className="p-6 pt-0">
                {/* Step 1 */}
                {formStep === 1 && 
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full name *</Label>
                        <Input 
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
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
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+41 XX XXX XX XX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Event date</Label>
                        <Input 
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventType">Event type</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="party">Private Party</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Event city"
                        />
                      </div>
                    </div>

                    <Button type="button" onClick={nextStep} className="w-full cta-primary text-lg py-6">
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                }

                {/* Step 2 */}
                {formStep === 2 &&
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">Choose your photobooth</h3>
                      <p className="text-muted-foreground">Select the model that best suits your event</p>
                    </div>

                    <div className="grid gap-4">
                      {models.map((model) => (
                        <div 
                          key={model.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                            selectedModel === model.id ? 'border-accent bg-accent/5' : 'border-gray-200'
                          }`}
                          onClick={() => selectModel(model.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedModel === model.id ? 'border-accent bg-accent' : 'border-gray-300'
                              }`}>
                                {selectedModel === model.id && 
                                  <CheckCircle className="w-4 h-4 text-white" />
                                }
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg">{model.name}</h4>
                                <Badge variant="secondary" className="bg-accent text-black">
                                  {model.price}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{model.description}</p>
                              <div className="text-xs text-accent font-medium">
                                Click for more details
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 py-6">
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1 cta-primary py-6">
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                }

                {/* Step 3 */}
                {formStep === 3 &&
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">Final details</h3>
                      <p className="text-muted-foreground">A few more details to personalize your quote</p>
                    </div>

                    <div>
                      <Label htmlFor="guests">Expected number of guests</Label>
                      <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-50">0-50 guests</SelectItem>
                          <SelectItem value="50-100">50-100 guests</SelectItem>
                          <SelectItem value="100-200">100-200 guests</SelectItem>
                          <SelectItem value="200+">200+ guests</SelectItem>
                          <SelectItem value="advise">Advise me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea 
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Describe your event, your specific needs..."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        I agree to be contacted for this quote and the privacy policy *
                      </Label>
                    </div>

                    {/* Hidden fields for tracking */}
                    <input type="hidden" value={formData.gclid} />
                    <input type="hidden" value={formData.wbraid} />
                    <input type="hidden" value={formData.gbraid} />

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button type="button" onClick={prevStep} variant="outline" className="flex-1 text-sm sm:text-base px-4 py-3">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 cta-primary text-sm sm:text-lg px-4 py-3" disabled={!formData.consent}>
                        Request Quote
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                }
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
            
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/60">
                © 2024 Happy Booth. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50">
        <div className="flex space-x-2">
          <Button className="flex-1 cta-primary" onClick={() => scrollToSection('contact-form')}>
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndexEn;
