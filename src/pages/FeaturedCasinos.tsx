
import React from 'react';

export const FeaturedCasinos = () => {
  const casinoNames = [
    "DUEL", "STAKE", "GAMDOM", "SHUFFLE", "ROOBET", "ROLLBIT"
  ];
 
  // Duplicate the list enough times to ensure smooth infinite scrolling without gaps on wide screens
  const marqueeContent = [...casinoNames, ...casinoNames, ...casinoNames, ...casinoNames];

  return (
    <section className="w-full bg-[#000000] py-12 border-y border-[#14131c]">
      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <h2 className="font-heading text-center text-xl md:text-2xl font-bold text-white uppercase tracking-widest opacity-80">
          Top Rated Operators
        </h2>
      </div>
      <div className="relative w-full overflow-hidden mask-image-lr">
        <style>{`
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-content {
            animation: slide 40s linear infinite;
          }
           .mask-image-lr {
            -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
            mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
          }
        `}</style>
        <div className="flex w-max marquee-content items-center">
          {marqueeContent.map((name, index) => (
            <div
              key={index}
              className="mx-6 md:mx-10 flex items-center justify-center select-none"
            >
              <span className="font-heading text-2xl md:text-3xl font-bold text-white tracking-wider hover:text-[#00FFC0] transition-colors duration-300 cursor-default">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
