'use client';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

export default function SpotlightGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // 1. Add state to track which card has been clicked
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
            // 2. Add click handler: Toggle the active state
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="group relative h-48 overflow-hidden rounded-xl bg-slate-400 p-[1px] cursor-pointer"
          >
            {/* Spotlight Layer (Neighbor Glow) */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.4), transparent 40%)`,
                maskImage: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)`,
                WebkitMaskImage: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)`
              }}
            />

            {/* Inner Content Layer */}
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-white p-6 flex flex-col justify-center text-black z-20">
              
              {/* IMAGE: Show if Hovered OR Active */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-0 
                  ${activeIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}
              >
                <div className="absolute w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]" 
                />
              </div>

              {/* TEXT: Hide if Hovered OR Active (to reveal image clearly) */}
              <div 
                className={`relative z-10 transition-opacity duration-500 
                  ${activeIndex === i ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                `}
              >
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm">{card.description}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4"> 
        <Link href="/" className='hover:text-blue-600'>Go Back &rarr;</Link>
      </div>
    </div>
  );
}