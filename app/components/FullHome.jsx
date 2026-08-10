"use client"
import { useState } from 'react';
import Button from './Button';
import ImagCard from './ImagCard';
import FourumCard from './FourumCard';
import Reveal from './Reveal';
import Link from 'next/link';
import { playClick, playSparrow } from '@/utils/sounds';
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
      link: "https://examrankcheck.in/"
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
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-start px-6 pb-44 pt-10 md:pt-16">
      {/* Hero */}
      <Reveal className="flex w-full max-w-4xl flex-col items-center text-center">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
          👋 Hey there, I&apos;m
        </span>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-7xl">
          Abhay <span className="text-blue-600 dark:text-blue-400">Patel</span>
        </h1>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
          Full-Stack Developer · Next.js &amp; React · Lucknow, India
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
          {mainProfile.description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button name="View GitHub" />
          <a
            href="#explorer"
            onClick={() => { if (playClick) playClick.play(); }}
            className="flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-2.5 text-base font-bold tracking-widest text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-white/15 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            Explore Projects <FaArrowRight />
          </a>
        </div>
      </Reveal>

      {/* Profile + Projects explorer */}
      <Reveal delay={150} className="w-full max-w-4xl">
        <div id="explorer" className="mt-16 grid grid-cols-1 gap-8 scroll-mt-24 md:mt-20 md:grid-cols-2">
          <ImagCard data={activeData} />
          <FourumCard
            projects={projects}
            onHover={setActiveData}
            onLeave={() => setActiveData(mainProfile)}
          />
        </div>
      </Reveal>

      {/* Tech stack pill */}
      <Reveal delay={250}>
        <div className="mt-14 rounded-2xl bg-blue-500 px-2 py-2 text-white transition-all hover:border-2 hover:border-blue-500 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-900 dark:hover:text-blue-400">
          <Link
            href="/tech-stack"
            onClick={() => { if (playClick) playClick.play(); }}
            className="flex items-center gap-1 px-2"
          >
            Know My Techstack <FaArrowRight />
          </Link>
        </div>
      </Reveal>

      {/* Sparrow sitting on a log above the wave */}
      <div className="absolute bottom-36 right-12 z-30 flex flex-col items-center select-none md:bottom-24 md:right-8">
        <Image
          preload={true}
          width={800}
          height={800}
          src="https://png.pngtree.com/png-vector/20230104/ourmid/pngtree-wood-log-vector-clip-art-png-image_6551751.png"
          alt="Log"
          className="z-20 h-10 w-40 object-contain drop-shadow-2xl"
          style={{ marginBottom: '-18px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))' }}
        />
        <Image
          preload={true}
          width={800}
          height={800}
          src="https://pics.clipartpng.com/Sparrow_PNG_Clipart-672.png"
          alt="Sparrow"
          className={`z-30 -mt-[70px] h-20 w-20 cursor-pointer object-contain transition-transform duration-300 ${isSparrowRotated ? 'rotate-[20deg]' : ''}`}
          onClick={() => {
            playSparrow.play();
            setIsSparrowRotated(true);
            setTimeout(() => setIsSparrowRotated(false), 350);
          }}
        />
      </div>
    </main>
  );
}
