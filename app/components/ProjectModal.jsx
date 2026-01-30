import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import Link from 'next/link';
import Image from 'next/image';
import { playClick } from '../../utils/sounds';

const ProjectModal = ({ project, onClose }) => {
  const nodeRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // 1. MOUNT EFFECT: Must always run in the same order
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. SCROLL LOCK EFFECT: Prevents background scrolling on mobile/desktop
  useEffect(() => {
    if (project) {
      // Save original styles to restore them later
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      // position: fixed is the most reliable way to lock iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
      };
    }
  }, [project]);

  // 3. EARLY RETURN: This MUST come after all useEffect calls
  if (!project || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* --- MOBILE VIEW --- */}
      <div 
        className="md:hidden relative w-full bg-white/60 backdrop-blur-md  rounded-t-[32px] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300"
        style={{ height: '85vh', maxHeight: '85vh' }}
      >
        {/* Drag Indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4 shrink-0" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 shrink-0">
           <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">{project.name}</span>
              </div>
          
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-transform"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable Area */}
        <div 
          className="flex-1 overflow-y-auto px-6 pb-24 overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Image
          height={1000}
          width={2000}
          preload={true}
            src={project.image} 
            alt={project.name} 
            className="rounded-2xl w-full aspect-video object-cover mb-6 shadow-sm border border-gray-100" 
          />

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Type</p>
              <p className="text-gray-800 text-lg font-semibold">{project.title}</p>
            </div>
            
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Project Description</p>
              <div className="text-gray-600 leading-relaxed text-base pb-6">
                {project.description}
              </div>
            </div>

            {project.link && (
              <div className="pb-10">
                <Link 
                  href={project.link} 
                  onClick={()=>{playClick.play();}}
                  target="_blank" 
                  className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 active:bg-blue-700 active:scale-[0.98] transition-all"
                >
                  Visit Live Site <FaExternalLinkAlt size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block pointer-events-none w-full max-w-[550px] z-20">
        <Draggable 
          nodeRef={nodeRef} 
          handle=".modal-header" 
          bounds="parent"
        >
          <div 
            ref={nodeRef} 
            className="pointer-events-auto bg-white/60 backdrop-blur-md  rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Draggable Header */}
            <div className="modal-header flex items-center justify-between px-6 py-4 bg-gray-50/80 border-b border-gray-100 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">{project.name}</span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Desktop Scroll Content */}
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <Image
              height={1000} 
              width={2000}
              preload={true}
                src={project.image} 
                className="rounded-xl w-full aspect-video object-cover mb-6 shadow-md" 
                alt={project.name} 
              />
              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Classification</h3>
                  <p className="text-gray-900 font-bold text-xl">{project.title}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Details</h3>
                  <p className="text-gray-900 leading-relaxed">{project.description}</p>
                </div>
                {project.link && (
                  <Link 
                    href={project.link} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline mt-4 decoration-2 underline-offset-4"
                  >
                    View Project <FaExternalLinkAlt size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;