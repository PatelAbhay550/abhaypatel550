import React, { useState } from 'react';
import Link from 'next/link';
import ProjectModal from './ProjectModal';
import FaqModal from './FaqModal';
import Image from 'next/image';
import { playClick } from '../../utils/sounds';
import { FaArrowRight } from 'react-icons/fa';


const FourumCard = ({ projects, onHover, onLeave }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(false);

  const handleProjectClick = (project) => {
    if (playClick) playClick.play();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    if (playClick) playClick.play();
    setSelectedProject(null);
  };

  const handleFaqClick = () => {
    if (playClick) playClick.play();
    setFaqOpen(true);
  };

  return (
    <>
      <article className="flex flex-col h-[450px] bg-white/60 backdrop-blur-md  w-full rounded-3xl border border-gray-100  shadow-sm transition-all duration-300 dark:bg-white/[0.06] dark:border-white/10">
        
        {/* Top Section / Header */}
        <div className="flex items-start justify-between p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                height={40}
                width={40}
                alt="User"
                src="https://i.ibb.co/C3SMJcvN/img-1-1779077831821.jpg"
                className="size-10 rounded-xl object-cover ring-2 ring-gray-50"
              />
              <span className="absolute -bottom-1 -right-1 block size-3 rounded-full border-2 border-white bg-blue-500 shadow-sm animate-pulse"></span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Available for work</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-700 ring-1 ring-inset ring-blue-600/10 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/20">
            <span className="text-[10px] font-black uppercase tracking-tight">Active Explorer</span>
          </span>
        </div>

        {/* --- DESKTOP ICON GRID SECTION --- */}
        <div className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
          <h2 className="px-2 text-sm font-bold text-gray-900 mb-4 dark:text-gray-100">Projects &amp; Works</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            
            {/* Project Folders */}
            {projects.map((project) => (
              <button
                key={project.id}
                onMouseEnter={() => onHover(project)}
                onMouseLeave={onLeave}
                onClick={() => handleProjectClick(project)}
                className="group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all hover:bg-blue-50/50 outline-none dark:hover:bg-blue-500/10"
              >
                {/* Folder Icon Wrapper */}
                <div className="relative flex items-center justify-center transition-transform group-active:scale-90 group-hover:-translate-y-1">
                  {/* Modern SVG Folder Icon */}
                  <svg className="size-12 drop-shadow-sm group-hover:drop-shadow-md transition-all" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10C4 8.89543 4.89543 8 6 8H18.1716C18.702 8 19.2107 8.21071 19.5858 8.58579L24.4142 13.4142C24.7893 13.7893 25.298 14 25.8284 14H42C43.1046 14 44 14.8954 44 16V38C44 39.1046 43.1046 40 42 40H6C4.89543 40 4 39.1046 4 38V10Z" fill="#3B82F6" className="group-hover:fill-blue-600 transition-colors" />
                    <path d="M4 18H44V38C44 39.1046 43.1046 40 42 40H6C4.89543 40 4 39.1046 4 38V18Z" fill="#60A5FA" className="group-hover:fill-blue-500 transition-colors" />
                    <rect x="14" y="24" width="20" height="2" rx="1" fill="white" fillOpacity="0.4" />
                    <rect x="14" y="29" width="12" height="2" rx="1" fill="white" fillOpacity="0.4" />
                  </svg>
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-0 bg-blue-400 opacity-0 blur-xl group-hover:opacity-20 transition-opacity" />
                </div>
                {/* Project Name Label */}
                <span className="text-[10px] font-bold text-gray-700 text-center leading-tight truncate w-full px-1 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                  {project.name}
                </span>
              </button>
            ))}
            {/* FAQ Folder */}
            <button
              onClick={handleFaqClick}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all hover:bg-blue-50/50 outline-none dark:hover:bg-blue-500/10"
            >
              <div className="relative flex items-center justify-center transition-transform group-active:scale-90 group-hover:-translate-y-1">
                {/* FAQ Folder Icon */}
                <svg className="size-12 drop-shadow-sm group-hover:drop-shadow-md transition-all" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10C4 8.89543 4.89543 8 6 8H18.1716C18.702 8 19.2107 8.21071 19.5858 8.58579L24.4142 13.4142C24.7893 13.7893 25.298 14 25.8284 14H42C43.1046 14 44 14.8954 44 16V38C44 39.1046 43.1046 40 42 40H6C4.89543 40 4 39.1046 4 38V10Z" fill="#3B82F6" className="group-hover:fill-blue-600 transition-colors" />
                    <path d="M4 18H44V38C44 39.1046 43.1046 40 42 40H6C4.89543 40 4 39.1046 4 38V18Z" fill="#60A5FA" className="group-hover:fill-blue-500 transition-colors" />
                    <rect x="14" y="24" width="20" height="2" rx="1" fill="white" fillOpacity="0.4" />
                    <rect x="14" y="29" width="12" height="2" rx="1" fill="white" fillOpacity="0.4" />
                  </svg>
                <div className="absolute inset-0 bg-yellow-400 opacity-0 blur-xl group-hover:opacity-20 transition-opacity" />
              </div>
              <span className="text-[10px] font-bold text-zinc-700 text-center leading-tight truncate w-full px-1 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                FAQs
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-gray-100 bg-gray-50/60 py-6 px-4 rounded-b-3xl dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
              <span className="text-xs font-black uppercase tracking-tight">Chat with me</span>
            </div>
            <Link 
              href="mailto:patelabhay550@gmail.com" 
              onClick={() => { if(playClick) playClick.play(); }} 
              className="text-xs font-black flex items-center gap-1 text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors dark:text-blue-400 dark:hover:text-blue-300"
            >
              CONTACT ME <FaArrowRight/>
            </Link>
          </div>
        </div>
      </article>

      {/* The Draggable Modal you just fixed */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      <FaqModal open={faqOpen} onClose={() => setFaqOpen(false)} />
    </>
  );
};

export default FourumCard;
