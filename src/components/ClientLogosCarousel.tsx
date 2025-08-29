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
  },
  {
    src: "/lovable-uploads/5420e9c4-0077-4f60-adaa-00c30e134f07.png",
    alt: "AON",
    name: "AON"
  },
  {
    src: "/lovable-uploads/9be45baf-9663-4ad4-8e76-87b57842f59e.png",
    alt: "Ville de Genève",
    name: "Ville de Genève"
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
    src: "/lovable-uploads/b81d34da-8b03-4bfd-ace2-cf2d8da78706.png",
    alt: "BVLGARI",
    name: "BVLGARI"
  },
  {
    src: "/lovable-uploads/6985b3cb-e8c8-4edf-ba39-49ad371ff4f5.png",
    alt: "JTI",
    name: "JTI"
  },
  {
    src: "/lovable-uploads/f84fb375-7807-44f3-9cd3-34e6c4074c9a.png",
    alt: "Logitech",
    name: "Logitech"
  },
  {
    src: "/lovable-uploads/a394bdcc-7200-44ef-89d9-880e117c95ab.png",
    alt: "Paléo",
    name: "Paléo"
  },
  {
    src: "/lovable-uploads/c100f269-3b06-4b8c-9d45-a9e4c3ba4ed9.png",
    alt: "UNIL - Université de Lausanne",
    name: "UNIL"
  },
  {
    src: "/lovable-uploads/572c82d5-70d2-4e44-9555-a0fffac05ff5.png",
    alt: "Uber",
    name: "Uber"
  },
  {
    src: "/lovable-uploads/6107f84d-437b-414d-899e-c282a7bf7ee2.png",
    alt: "AXA",
    name: "AXA"
  },
  {
    src: "/lovable-uploads/b6b8b200-43f3-4a87-a177-891a85e8c478.png",
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
        className="flex animate-[scroll_60s_linear_infinite]"
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