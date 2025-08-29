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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
    alt: "Couple posing with a custom Happy Booth frame at a TEDx event"
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
      toast.error("Please accept the terms to continue");
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

    toast.success("Request sent! We'll contact you quickly.");
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
    description: 'Large full-body touchscreen mirror, AI effects, signatures and emojis, custom frames, unlimited prints. The favorite of chic weddings and corporate events.',
    image: '/lovable-uploads/a076d98b-87cf-4d16-b6bc-4ba9399b6dfb.png',
    features: ['Themed animations & boomerangs', 'AI-powered filters & background change', 'Branded welcome screen & frames, guest chooses frame', 'Instant email sending + gallery', 'Unlimited professional photo printing', 'Languages: FR, EN, DE, ES, PT, IT'],
    note: 'Free delivery & pickup in Lausanne',
    included: ['Installation & pickup', 'Unlimited prints', 'Online gallery', 'Complete customization', 'Technical support']
  }, {
    id: 'rainbow',
    name: 'Rainbow Booth',
    price: '790 CHF',
    title: 'Chic, modern, super fun',
    description: 'Rainbow light ring, trendy look that attracts all eyes.',
    image: '/lovable-uploads/ebd7d9bc-48dd-4de8-9840-b3b8e35ff60e.png',
    features: ['Rainbow light ring, trendy look that attracts all eyes', 'Social media sharing + on-site printing', 'Customizable frames, each guest chooses their favorite', 'Unlimited prints', "\"Magic Screen\" & themed backgrounds", 'Backdrop options', 'NEW: AI effects'],
    included: ['Unlimited prints', 'Online gallery', 'Complete customization', 'Technical support']
  }, {
    id: '360',
    name: '360 Happy Booth',
    price: '890 CHF',
    title: 'Spin, pose, shine',
    description: 'Unlimited videos with instant sharing (WhatsApp, email, AirDrop).',
    image: '/lovable-uploads/d2564ea4-aa85-43bf-887a-04fd3d343436.png',
    features: ['Unlimited videos with instant sharing (WhatsApp, email, AirDrop)', 'Custom effects + branded overlays, music', 'Online gallery. 90cm platform up to 4 people, safety stop', 'Delivery, installation and pickup included in Lausanne'],
    included: ['Unlimited videos', 'Online gallery', 'Complete customization', 'Technical support']
  }, {
    id: 'retro',
    name: 'Retro Booth',
    price: '790 CHF',
    title: 'Vintage elegance that melts all hearts',
    description: 'Retro-chic style, compact format, ultra simple to use.',
    image: '/lovable-uploads/01038a35-68c2-4046-a7c9-d7bd12a8dd7f.png',
    features: ['Retro-chic style, compact format, ultra simple to use', 'Unlimited prints', 'Mirror effect + touchscreen: sign, draw, emojis', 'Custom frames, online gallery, accessories provided'],
    included: ['Unlimited prints', 'Online gallery', 'Complete customization', 'Technical support']
  }, {
    id: 'phone',
    name: 'Phone Booth',
    price: '290 CHF',
    title: 'Vintage audio guestbook',
    description: 'Pick up, leave a message, smile — ultra simple to use.',
    image: '/lovable-uploads/82b14e13-bb3a-4f24-8bd8-5f0342391319.png',
    features: ['Pick up, leave a message, smile — ultra simple to use', 'Clear audio quality, memories to relive', 'Autonomous without Wi-Fi or electricity, light and easy to place', 'Customizable welcome message, LED panel option 35 CHF', 'Logistics: with photobooth we deliver, otherwise very simple postal shipment'],
    included: ['Delivery & pickup', 'Unlimited audio messages', 'Custom welcome message', 'Technical support']
  }];

  const faqItems = [{
    question: "How much space is needed and can it be installed outdoors?",
    answer: "You need about 3×3 meters and an electrical outlet. Outdoor installation is possible if the space is sheltered."
  }, {
    question: "Are the prints really unlimited?",
    answer: "YES! Unlike our competitors who limit to 150-400 prints, at Happy Booth it's REALLY unlimited. Your guests can print as much as they want. The more photos, the more fun!"
  }, {
    question: "How do we get the digital photos?",
    answer: "All photos are immediately available in a private online gallery accessible to all your guests. You'll also receive all high-definition files after the event."
  }, {
    question: "What if internet is weak or the photobooth breaks down?",
    answer: "Weak internet: No problem! Printing works offline, email sending will happen as soon as the network is available.\n\nBreakdown (very rare): We always have backup equipment ready and a technician available 24/7. In case of breakdown, we replace the equipment within the hour or we fully refund the service. No event has ever been ruined by a breakdown with us."
  }, {
    question: "Will my elderly guests or children know how to use it?",
    answer: "Absolutely! The interface is ultra-intuitive with clear icons and can be configured in 6 languages. Children from 5 years old use it without problem, and we can provide a stool for the smaller ones. Host option available to accompany your guests (45 CHF/hour)."
  }, {
    question: "Why not just use an iPhone with a printer?",
    answer: "A professional photobooth offers: studio quality (lighting, professional lens), interactive animations impossible on smartphone, instant high-quality prints, automatic queue management, complete customization, and especially a real animation that creates the event. DIY requires someone dedicated all evening."
  }, {
    question: "800-1000 CHF for a few hours, isn't that excessive?",
    answer: "Divided by 100 guests = 8-10 CHF per person for a personalized souvenir they'll keep. Let's compare: a photographer costs 2000-4000 CHF, a DJ 1500 CHF. Our professional equipment costs over 15,000 CHF and requires maintenance, transport, customization (2h graphic preparation), installation (2h), and technical presence."
  }, {
    question: "What if few people use it in the end?",
    answer: "Never happened in 1000+ events! Average statistics: 80% of guests use it, 3-5 sessions per person, 300-600 photos per event of 100 people. Strategic placement (near bar/dance floor) and our fun accessories guarantee success. \"Satisfied or refunded\" guarantee if less than 50 photos taken."
  }, {
    question: "When to book?",
    answer: "Ideally 2-4 months in advance for big dates, but we also accept last-minute bookings depending on availability."
  }, {
    question: "Why pay more than a low-cost provider's offer?",
    answer: "Budget offers often require you to manage yourself: equipment pickup (round trip by car), installation (1-2h assembly with instructions), technical problem resolution, and return by carrier. They also generally limit prints (200-400 maximum) - imagine having to refuse prints to your guests at the end of the evening!\nOur premium service includes: complete installation/uninstallation by us, REALLY unlimited prints (often 500+ photos per event), immediate technical support in case of trouble, exclusive technologies (Mirror with AI, 360° platform), and professional graphic customization.\nThe 200-300 CHF surcharge represents generally less than 3 CHF per guest to eliminate all stress and guarantee a perfect experience. It's the assurance that at the slightest problem, it's our responsibility, not yours. On your event day, you have better things to do than play technician!"
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
          <img src={photoCollageBackground} alt="Photo memory collage" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Content - 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block whitespace-nowrap">Photobooth rental</span>
                <span className="block text-accent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
                  in French Switzerland
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed font-medium text-center lg:text-left">
                Transform your events into unforgettable memories with our latest generation photo booths
              </p>

              {/* Benefit Badges */}
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
              <Button size="lg" className="cta-primary text-lg px-8 py-6 mx-auto lg:mx-0" onClick={() => scrollToSection('contact-form')}>
                Request Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Right Content - Gallery 1/3 on desktop */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Gallery Image */}
                <img
                  src={galleryImages[currentGalleryIndex].src}
                  alt={galleryImages[currentGalleryIndex].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Navigation arrows */}
                <button 
                  onClick={prevGalleryImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={nextGalleryImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentGalleryIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Models</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map(model => (
              <Card key={model.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>{model.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={model.image} alt={model.name} className="w-full rounded-lg mb-4" />
                  <p className="mb-2 font-semibold">{model.title}</p>
                  <p className="mb-4">{model.description}</p>
                  <ul className="list-disc list-inside mb-4 text-sm text-gray-700">
                    {model.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <p className="italic text-sm mb-2">{model.note}</p>
                  <p className="font-semibold mb-1">Included:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {model.included.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 w-12 h-12 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Innovative Technology</h3>
              <p>Our photobooths feature the latest AI effects and interactive animations.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 w-12 h-12 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Turnkey Service</h3>
              <p>We handle delivery, installation, and pickup so you can enjoy your event stress-free.</p>
            </div>
            <div className="text-center">
              <Camera className="mx-auto mb-4 w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Unlimited Prints</h3>
              <p>Your guests can print as many photos as they want, no limits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <img src={weddingPhotobooth} alt="Wedding Photobooth" className="rounded-t-lg" />
              <CardContent>
                <CardTitle>Weddings</CardTitle>
                <CardDescription>Make your special day unforgettable with fun and elegant photobooth experiences.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <img src={corporateEvent} alt="Corporate Event" className="rounded-t-lg" />
              <CardContent>
                <CardTitle>Corporate Events</CardTitle>
                <CardDescription>Boost team spirit and brand visibility with customized photobooths.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <img src={birthdayParty} alt="Birthday Party" className="rounded-t-lg" />
              <CardContent>
                <CardTitle>Birthday Parties</CardTitle>
                <CardDescription>Capture joyful moments and create lasting memories with friends and family.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Calendar className="mx-auto mb-4 w-12 h-12 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Book Your Date</h3>
              <p>Reserve your photobooth well in advance to secure your event date.</p>
            </div>
            <div>
              <Building className="mx-auto mb-4 w-12 h-12 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">We Deliver & Setup</h3>
              <p>Our team handles delivery, installation, and setup at your venue.</p>
            </div>
            <div>
              <Users className="mx-auto mb-4 w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Enjoy & Share</h3>
              <p>Your guests enjoy unlimited prints, digital sharing, and fun animations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Request a Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 && (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </>
            )}
            {formStep === 2 && (
              <>
                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={e => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select
                    onValueChange={value => handleInputChange('eventType', value)}
                    value={formData.eventType}
                  >
                    <SelectTrigger id="eventType">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </>
            )}
            {formStep === 3 && (
              <>
                <div>
                  <Label>Choose Your Model</Label>
                  <Tabs value={selectedModel} onValueChange={selectModel} className="mb-4">
                    <TabsList>
                      {models.map(model => (
                        <TabsTrigger key={model.id} value={model.id}>{model.name}</TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min={1}
                    value={formData.guests}
                    onChange={e => handleInputChange('guests', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={checked => handleInputChange('consent', checked === true)}
                    required
                  />
                  <Label htmlFor="consent" className="text-sm">
                    I accept the terms and conditions
                  </Label>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                  <Button type="submit">Send Request</Button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src="/lovable-uploads/ac502686-5897-4be4-bf80-2dfb03d33219.png" alt="Happy Booth Logo" className="h-12 w-auto" />
            </div>
            
            <div className="border-t border-white/20 pt-6 flex flex-col items-center space-y-4">
              <LanguageSwitcher />
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
