import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const ClientLogosCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  // Logo images using the uploaded paths
  const logos = [
    {
      src: "/lovable-uploads/7e4f2b98-c032-40aa-b0ff-5dd8e4db3b44.png",
      alt: "AON"
    },
    {
      src: "/lovable-uploads/b62d2929-9902-4a0d-9efe-271634fed047.png", 
      alt: "Ville de Genève"
    },
    {
      src: "/lovable-uploads/d1cbfcc6-e3f7-4375-b97f-235eea6141ed.png",
      alt: "Crans Montana"
    },
    {
      src: "/lovable-uploads/9f65c37a-bbe3-4d37-b676-25f5867ff3f9.png",
      alt: "Facchinetti Automobiles"
    },
    {
      src: "/lovable-uploads/89dba7e9-e993-4850-a3cd-80ef5dcbb8b2.png",
      alt: "International School Lausanne"
    },
    {
      src: "/lovable-uploads/83380396-dd22-4279-9323-5c8562cb72c1.png",
      alt: "IMD Business School"
    },
    {
      src: "/lovable-uploads/d14ebc99-0c98-4170-97a5-9ded7434a16d.png",
      alt: "Fédération Équestre Internationale"
    },
    {
      src: "/lovable-uploads/5c63c123-5a72-4ae4-8830-ee6c90278ff4.png",
      alt: "Hyatt"
    },
    {
      src: "/lovable-uploads/143250ad-9e35-4249-b0f3-ea23cc581478.png",
      alt: "Clarins"
    },
    {
      src: "/lovable-uploads/193b9afe-32ef-4a3b-b287-345b39282ad5.png",
      alt: "World Health Organization"
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-scroll every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {/* Duplicate logos to ensure seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <CarouselItem 
              key={index} 
              className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
            >
              <div className="flex items-center justify-center p-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ClientLogosCarousel;