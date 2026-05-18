"use client"
import { useState } from 'react';
import Button from './Button';
import ImagCard from './ImagCard';
import FourumCard from './FourumCard';
import Link from 'next/link';
import { playSparrow } from '@/utils/sounds';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';



export default function FullHome() {
  const mainProfile = {
    image: "https://i.ibb.co/XfyK7P50/img-1-1779077702203.jpg",
    title: "Hey there! I'm",
    name: "Abhay Patel",
    description: "I am a fullstack developer with 5 years of experience building web applications, specializing in Next.js and modern React ecosystems."
  };

  const projects = [
    {
      id: 1,
      name: "Exam Rank Check",
      title: "Full Stack",
      image: "https://i.ibb.co/Tqknfdmt/image.png",
      description: "A tool to check marks of SSC, RRB Exams.",
      link: "https://examrankcheck.vercel.app/"
    },
    {
      id: 2,
      name: "Cricketden",
      title: "Full Stack",
      image: "https://i.ibb.co/yF4mVmsV/image.png",
      description: "A web app to check live cricket scores.",
      link: "https://cricketden.vercel.app/"
    },
    {
      id: 3,
      name: "India Elects",
      title: "Full Stack",
      image: "https://i.ibb.co/1G8LnsYW/image.png",
      description: "A website that tracks and covers elections in India.",
      link: "https://indiaelects.vercel.app/"
    }
  ];

  const [activeData, setActiveData] = useState(mainProfile);
  const [isSparrowRotated, setIsSparrowRotated] = useState(false);

  return (
    <main className="min-h-screen relative  z-10 flex flex-col items-center justify-center p-6  ">
      
        <Button name="Abhay Raj Patel" />
        

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl items-start">
        {/* Pass the dynamic data to the Image Card */}
        <ImagCard data={activeData} />
        
        {/* Pass the setter to the Forum Card */}
        <FourumCard 
          projects={projects} 
          onHover={setActiveData} 
          onLeave={() => setActiveData(mainProfile)} 
        />
      {/* make a arrow */}
      </div>
     
      {/* Sparrow sitting on a log above the wave */}
          <div className="absolute md:right-8 right-12 bottom-36 md:bottom-24 flex flex-col items-center z-30 select-none">
            {/* Log image */}
              <Image 
              preload={true}
              width={800}
              height={800}  
              src="https://png.pngtree.com/png-vector/20230104/ourmid/pngtree-wood-log-vector-clip-art-png-image_6551751.png" 
              alt="Log" 
              className="w-40 h-10 object-contain z-20 drop-shadow-2xl" 
              style={{ marginBottom: '-18px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))' }} />
            {/* Sparrow image */}
            <Image
              preload={true}
              width={800}
              height={800}
              src="https://pics.clipartpng.com/Sparrow_PNG_Clipart-672.png"
              alt="Sparrow"
              className={`w-20 cursor-pointer h-20 object-contain z-30 -mt-[70px] transition-transform duration-300 ${isSparrowRotated ? 'rotate-[20deg]' : ''}`}
              onClick={() => {
                playSparrow.play();
                setIsSparrowRotated(true);
                setTimeout(() => setIsSparrowRotated(false), 350);
              }}
            />
          </div>
          <div className="md:mt-16 mt-28 m-20 bg-blue-400 border-0 hover:border-2 hover:bg-white rounded-2xl px-2 py-2 hover:text-blue-600 text-white flex flex-col items-center gap-4"> <Link href="/tech-stack" onClick={()=>{playClick.play();}} className=' flex items-center gap-1'>Know My Techstack <FaArrowRight/></Link></div>
    </main>
  );
}
