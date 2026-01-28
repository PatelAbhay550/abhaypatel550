'use client';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

export default function SpotlightGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Neighbor Logic: Calculate mouse position relative to EACH card
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update coordinates for the border glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Added 'img' paths for each card (using placeholder logos for demo)
  const cards = [
    { 
      title: "Next.js", 
      description: "The React Framework for the Web.",
      img: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" 
    },
    { 
      title: "Tailwind CSS", 
      description: "Rapidly build modern websites.",
      img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
    },
    { 
      title: "TypeScript", 
      description: "JavaScript with syntax for types.",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
    },
    { 
      title: "Vercel", 
      description: "Develop. Preview. Ship.",
      img: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
    },
    { 
      title: "Firebase", 
      description: "Database platform for web development.",
      img: "https://firebase.google.com/static/downloads/brand-guidelines/SVG/logo-logomark.svg"
    },
    { 
      title: "Framer Motion", 
      description: "The web deserves better motion.",
      img: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" 
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      
    
      <div
        ref={containerRef}
        className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="group relative h-48 overflow-hidden rounded-xl bg-slate-400 p-[1px]"
          >
            {/* 1. Spotlight Layer (The Neighbor Glow) 
               - Visible on neighbors because of the mask technique.
               - DO NOT use group-hover here if you want the neighbor effect.
            */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(
                  600px circle at var(--mouse-x) var(--mouse-y), 
                  rgba(34, 197, 94, 0.4), 
                  transparent 40%
                )`,
                // Mask ensures the light only shows near the mouse
                maskImage: `radial-gradient(
                  300px circle at var(--mouse-x) var(--mouse-y), 
                  black, 
                  transparent
                )`,
                WebkitMaskImage: `radial-gradient(
                  300px circle at var(--mouse-x) var(--mouse-y), 
                  black, 
                  transparent
                )`
              }}
            />

            {/* 2. Inner Content Layer */}
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-white p-6 flex flex-col justify-center text-black z-20">
              
              {/* IMAGE REVEAL LOGIC:
                  - Absolute position centered.
                  - Starts at opacity-0.
                  - becomes opacity-100 ONLY on group-hover (hovering THIS card).
              */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                {/* A glowing backdrop for the image */}
                <div className="absolute w-32 h-32 bg-green-500/20 blur-[50px] rounded-full" />
                
                {/* The Image Itself */}
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                />
              </div>

              {/* Text Content 
                  - Optional: Fade text out slightly when image appears 
              */}
              <div className="relative z-10 group-hover:opacity-10 transition-opacity duration-500">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.description}</p>
              </div>

            </div>
          </div>
        ))}
      </div><div className="mt-12 flex flex-col items-center gap-4"> <Link href="/" className='hover:text-green-600'>Go Back &rarr;</Link></div>
    </div>
  );
}