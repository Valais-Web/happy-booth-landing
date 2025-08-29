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
    },
    {
      src: "/lovable-uploads/65fa0e46-dff2-496f-8cd6-c60d0f37a442.png",
      alt: "Capgemini"
    },
    {
      src: "/lovable-uploads/145ef3c6-99df-45d1-8985-5184a7446e96.png",
      alt: "Nestlé"
    },
    {
      src: "/lovable-uploads/06db2bee-fa93-44cf-9f60-22affaf02318.png",
      alt: "Vacheron Constantin"
    },
    {
      src: "/lovable-uploads/ae726400-9c06-4613-8457-a2c4d91a3cf0.png",
      alt: "Red Bull"
    },
    {
      src: "/lovable-uploads/035c1973-0b33-4d5b-9c43-1f64ab4d1755.png",
      alt: "Bulgari"
    },
    {
      src: "/lovable-uploads/564024b2-dfd8-408f-8d05-1fa8129ad6dc.png",
      alt: "JTI"
    },
    {
      src: "/lovable-uploads/a59f7cf9-aa91-4899-ac5d-823eb25edb29.png",
      alt: "Philip Morris International"
    },
    {
      src: "/lovable-uploads/4ccac121-0ef3-41c3-ade8-4937f5c5e229.png",
      alt: "Mandarin Oriental Geneva"
    },
    {
      src: "/lovable-uploads/e9846a94-1732-464f-930d-c2ef8fa30c6f.png",
      alt: "Logitech"
    },
    {
      src: "/lovable-uploads/0b563ee7-2d62-4fd3-8626-177df7ce5604.png",
      alt: "Paléo"
    },
    {
      src: "/lovable-uploads/eaa403b0-ec54-4f5e-b243-81e87fbd9a22.png",
      alt: "UNIL | Université de Lausanne HEC Lausanne"
    },
    {
      src: "/lovable-uploads/d928f88c-31b1-45ef-ab59-b36430c93b6a.png",
      alt: "Uber"
    },
    {
      src: "/lovable-uploads/7eeffefb-225f-4587-9c81-dcc59ad4c5a9.png",
      alt: "Ville de Lausanne"
    },
    {
      src: "/lovable-uploads/952047b3-9cb8-4495-b0ab-e42b8350d809.png",
      alt: "AXA"
    },
    {
      src: "/lovable-uploads/62383115-fc09-4a79-a3f4-4fb8dd9dc07b.png",
      alt: "Julius Bär"
    },
    {
      src: "/lovable-uploads/e7d3b263-43b7-4e96-96d5-7d9f2daec987.png",
      alt: "Pictet 1805"
    },
    {
      src: "/lovable-uploads/d02e1326-6e66-4558-af7e-02265442730a.png",
      alt: "EPFL"
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