import React from "react";

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
  },
  {
    src: "/lovable-uploads/5420e9c4-0077-4f60-adaa-00c30e134f07.png",
    alt: "AON",
    name: "AON"
  },
  {
    src: "/lovable-uploads/ad968bbf-ba53-43a3-b234-bec36b226fb6.png",
    alt: "Crans Montana Absolutely",
    name: "Crans Montana Absolutely"
  },
  {
    src: "/lovable-uploads/97c7442d-9318-4f0a-bd96-40138fcb0614.png",
    alt: "Fédération Équestre Internationale",
    name: "FEI"
  },
  {
    src: "/lovable-uploads/59699c16-b1c3-426d-96ba-69a2b36100a5.png",
    alt: "Clarins",
    name: "Clarins"
  },
  {
    src: "/lovable-uploads/f1011b7b-c967-4d87-883e-b577cb8ebf67.png",
    alt: "World Health Organization",
    name: "WHO"
  },
  {
    src: "/lovable-uploads/a5dfd7d4-c5d2-44ca-88d6-e5dcbb0ae50a.png",
    alt: "Capgemini",
    name: "Capgemini"
  },
  {
    src: "/lovable-uploads/d4708cae-1d22-4eb0-aa97-dc641c9b0a66.png",
    alt: "Nestlé",
    name: "Nestlé"
  },
  {
    src: "/lovable-uploads/55960e1d-bdf4-49ed-9482-c71ee6b7204d.png",
    alt: "Vacheron Constantin",
    name: "Vacheron Constantin"
  },
  {
    src: "/lovable-uploads/c7b9a5f4-7cbc-4dc6-98b5-302cbbd5cf99.png",
    alt: "Red Bull",
    name: "Red Bull"
  },
  {
    src: "/lovable-uploads/5216f186-5040-4785-a39c-3002e161fff9.png",
    alt: "BVLGARI",
    name: "BVLGARI"
  },
  {
    src: "/lovable-uploads/846ce8c0-7b16-406b-8c3d-9a57d8b0024e.png",
    alt: "JTI",
    name: "JTI"
  },
  {
    src: "/lovable-uploads/ed7aaa5c-447c-4550-b495-748b96ac5e0d.png",
    alt: "Logitech",
    name: "Logitech"
  },
  {
    src: "/lovable-uploads/62e4e618-77b9-438f-bb87-1a72ec539e0a.png",
    alt: "Paléo",
    name: "Paléo"
  },
  {
    src: "/lovable-uploads/81d58fdd-3806-47ea-9596-29fa47408c81.png",
    alt: "UNIL HEC Lausanne",
    name: "UNIL HEC Lausanne"
  },
  {
    src: "/lovable-uploads/b9878d38-8f77-46b5-bfbc-4451a427e32d.png",
    alt: "Uber",
    name: "Uber"
  },
  {
    src: "/lovable-uploads/d00c663c-8f4b-43a3-b9de-255a5cbdebd6.png",
    alt: "AXA",
    name: "AXA"
  },
  {
    src: "/lovable-uploads/ad31ee0a-3bd3-49d0-a0c8-79693e624f1d.png",
    alt: "Pictet",
    name: "Pictet"
  }
];

export const ClientLogosCarousel = () => {
  // Create multiple copies for truly seamless infinite scrolling
  const extendedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex animate-[scroll_40s_linear_infinite]"
        style={{
          width: `${extendedLogos.length * (100/6)}%`
        }}
      >
        {extendedLogos.map((logo, index) => (
          <div 
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 px-6 flex items-center justify-center"
            style={{ width: `${100 / extendedLogos.length}%` }}
          >
            <div className="h-16 flex items-center justify-center group">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                style={{ height: '50px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};