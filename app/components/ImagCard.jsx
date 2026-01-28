import Image from 'next/image';
import React from 'react';

const ImagCard = ({ data }) => {
  return (
    <div className="w-full">
      <div
        className="group relative block h-[450px] w-full bg-gray-900 rounded-3xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl"
      >
        {/* Using a key ensures the animation triggers when the image changes */}
        <Image
        height={2000}
        width={1000}
        preload={true}
          key={data.image}
          alt={data.name}
          src={data.image}
          className="absolute inset-0 h-full w-full object-cover object-left animate-in fade-in zoom-in-105 duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

        <div className="relative p-8 h-full flex flex-col justify-end">
          <div className="transform transition-all duration-300">
             <p className="text-[10px] font-bold tracking-[0.2em] text-pink-500 uppercase mb-2">
              {data.title}
            </p>
            <h3 className="text-3xl font-bold text-white uppercase tracking-tight leading-none mb-4">
              {data.name}
            </h3>
            
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagCard;