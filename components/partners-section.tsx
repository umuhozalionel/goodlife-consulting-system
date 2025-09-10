'use client';

import React from 'react';

const partners = [
  '/logos/gov.png',
  '/logos/ngo.png',
  '/logos/partner1.png',
  '/logos/partner2.png',
  '/logos/partner3.png',
  '/logos/partner4.png',
  // Add more logos as needed
];

export default function PartnersSection() {
  const loop = [...partners, ...partners]; // seamless scroll

  return (
    <section id="partners" className="py-15 overflow-hidden bg-[#0a1932]">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative w-full h-16 overflow-hidden">
          <div className="absolute flex animate-marquee whitespace-nowrap space-x-8">
            {loop.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Partner ${i + 1}`}
                className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}