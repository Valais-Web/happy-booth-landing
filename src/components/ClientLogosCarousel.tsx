import { useEffect, useState } from "react";

interface ClientLogo {
  src: string;
  alt: string;
  name: string;
}

const clientLogos: ClientLogo[] = [
  {
    src: "/lovable-uploads/a3acec25-ccf7-4795-bb39-56f6bf103b65.png",
    alt: "EPFL",
    name: "EPFL"
  },
  {
    src: "/lovable-uploads/c100f269-3b06-4b8c-9d45-a9e4c3ba4ed9.png",
    alt: "Philip Morris International",
    name: "Philip Morris International"
  },
  {
    src: "/lovable-uploads/572c82d5-70d2-4e44-9555-a0fffac05ff5.png",
    alt: "Mandarin Oriental Geneva",
    name: "Mandarin Oriental Geneva"
  },
  {
    src: "/lovable-uploads/b7e32822-34ea-4a5a-825e-4b66719f652c.png",
    alt: "Valmont",
    name: "Valmont"
  },
  {
    src: "/lovable-uploads/81ee893d-dd42-4da6-8ce0-354380a4307d.png",
    alt: "Ville de Lausanne",
    name: "Ville de Lausanne"
  },
  {
    src: "/lovable-uploads/6985b3cb-e8c8-4edf-ba39-49ad371ff4f5.png",
    alt: "Hyatt",
    name: "Hyatt"
  },
  {
    src: "/lovable-uploads/52454412-e06a-4df2-8365-e22132082afa.png",
    alt: "Julius Bär",
    name: "Julius Bär"
  },
  {
    src: "/lovable-uploads/f99bdb07-23e6-4be5-b761-f19050e40013.png",
    alt: "IMD",
    name: "IMD"
  },
  {
    src: "/lovable-uploads/75b2dc3b-794b-4ba3-bd8d-78242bfbe6a8.png",
    alt: "International School Lausanne",
    name: "International School Lausanne"
  },
  {
    src: "/lovable-uploads/24680dc5-86ff-40b1-8646-302d1be3fc63.png",
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