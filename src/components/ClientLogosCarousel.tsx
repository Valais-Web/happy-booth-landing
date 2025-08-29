import { useEffect, useState } from "react";

interface ClientLogo {
  src: string;
  alt: string;
  name: string;
}

const clientLogos: ClientLogo[] = [
  {
    src: "/lovable-uploads/b6b8b200-43f3-4a87-a177-891a85e8c478.png",
    alt: "EPFL",
    name: "EPFL"
  },
  {
    src: "/lovable-uploads/36231319-3fe7-405b-900f-f433ff19b21d.png",
    alt: "Philip Morris International",
    name: "Philip Morris International"
  },
  {
    src: "/lovable-uploads/95f89799-af0e-4415-b728-55a5ebbf4024.png",
    alt: "Mandarin Oriental Geneva",
    name: "Mandarin Oriental Geneva"
  },
  {
    src: "/lovable-uploads/d3f98e8d-de1b-4d23-800d-c3fed7c19a19.png",
    alt: "Valmont",
    name: "Valmont"
  },
  {
    src: "/lovable-uploads/b81d34da-8b03-4bfd-ace2-cf2d8da78706.png",
    alt: "Ville de Lausanne",
    name: "Ville de Lausanne"
  },
  {
    src: "/lovable-uploads/8c0dcfa0-d398-4bd4-97a9-b80fb093f5a0.png",
    alt: "Hyatt",
    name: "Hyatt"
  },
  {
    src: "/lovable-uploads/c87c5002-9b0c-4336-afdd-751215eec4b5.png",
    alt: "Julius Bär",
    name: "Julius Bär"
  },
  {
    src: "/lovable-uploads/2dee958b-61e0-4db9-b9c4-dceeaaca0089.png",
    alt: "IMD",
    name: "IMD"
  },
  {
    src: "/lovable-uploads/52f35edc-8e78-48bc-82f5-ac6173928869.png",
    alt: "International School Lausanne",
    name: "International School Lausanne"
  },
  {
    src: "/lovable-uploads/98d2c74c-d782-480f-886b-d057735a0e38.png",
    alt: "Facchinetti Automobiles",
    name: "Facchinetti Automobiles"
  }
];

export const ClientLogosCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clientLogos.length);
    }, 3000); // Change logo every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Create an extended array for seamless infinite scrolling
  const extendedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ils nous font confiance
          </h2>
          <p className="text-gray-600">
            Plus de 1000 clients satisfaits depuis 2018
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / 6}%)`,
              width: `${(extendedLogos.length * 100) / 6}%`
            }}
          >
            {extendedLogos.map((logo, index) => (
              <div 
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 px-4 flex items-center justify-center"
                style={{ width: `${100 / extendedLogos.length}%` }}
              >
                <div className="h-16 flex items-center justify-center group">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    style={{ height: '60px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};