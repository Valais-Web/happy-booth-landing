import { useEffect, useState } from "react";

interface ClientLogo {
  src: string;
  alt: string;
  name: string;
}

const clientLogos: ClientLogo[] = [
  {
    src: "/lovable-uploads/f8e72874-69c3-4d78-a945-35607417cc89.png",
    alt: "EPFL",
    name: "EPFL"
  },
  {
    src: "/lovable-uploads/d776e4c3-4269-43cb-bdbc-91869552bfdf.png",
    alt: "Philip Morris International",
    name: "Philip Morris International"
  },
  {
    src: "/lovable-uploads/1929a707-825a-4da2-876a-d350c9099c7a.png",
    alt: "Mandarin Oriental Geneva",
    name: "Mandarin Oriental Geneva"
  },
  {
    src: "/lovable-uploads/3b5e4467-f251-4f48-a13d-d108b80cb2bf.png",
    alt: "Valmont",
    name: "Valmont"
  },
  {
    src: "/lovable-uploads/843b3ed9-bbcf-4838-91e8-af59de0bfdb6.png",
    alt: "Ville de Lausanne",
    name: "Ville de Lausanne"
  },
  {
    src: "/lovable-uploads/1f49336f-ab7b-431a-a494-036ed5b2ef80.png",
    alt: "Hyatt",
    name: "Hyatt"
  },
  {
    src: "/lovable-uploads/5e7a381d-fb0f-4018-95dc-394052d9a67e.png",
    alt: "Julius Bär",
    name: "Julius Bär"
  },
  {
    src: "/lovable-uploads/24a9a7c9-582a-4381-9116-c89b0b8b60a8.png",
    alt: "IMD",
    name: "IMD"
  },
  {
    src: "/lovable-uploads/358f41db-1555-4b5a-a1a7-72970547db92.png",
    alt: "International School Lausanne",
    name: "International School Lausanne"
  },
  {
    src: "/lovable-uploads/805870f1-81da-4b24-aaf5-2b91df6890ba.png",
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