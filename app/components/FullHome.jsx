"use client"
import { useState } from 'react';
import Button from './Button';
import ImagCard from './ImagCard';
import FourumCard from './FourumCard';
import Link from 'next/link';


export default function FullHome() {
  const mainProfile = {
    image: "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/473134353_1797331867702105_3172409557775362407_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9F4x1-wiGlsQ7kNvwELPEF5&_nc_oc=AdnGD2pfLPbdvqm3AfI4c_venoSwpWTB958qT-z_SGvcgvsbRap2E8Spm1k4VEWajf8&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=IE3IqhWUMBEpgP86IewrWw&oh=00_AfqpFpcdEN9RThRyYyA1D08720pKLu8GrO18csHMTzjRZQ&oe=697E2066",
    title: "Developer",
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

  return (
    <main className="min-h-screen relative z-10 flex flex-col items-center justify-center p-6 lg:p-12">
      
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
     <div className="mt-12 flex flex-col items-center gap-4"> <Link href="/tech-stack" className='hover:text-blue-600'>Know My Techstack &rarr;</Link></div>
      
    </main>
  );
}