import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import Link from 'next/link';

const ProjectModal = ({ project, onClose }) => {
  const nodeRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!project || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4">
      {/* 1. Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* --- MOBILE VIEW --- */}
      <div 
        className="md:hidden relative w-full bg-white rounded-t-[32px] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
        style={{ height: '85vh' }} // Defined height is required for internal scroll
      >
        {/* Drag Indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4 shrink-0" />
        
        {/* Header: Sticky to top of the modal */}
        <div className="flex items-center justify-between px-6 pb-4 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">{project.name}</h2>
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-transform"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* 2. THE SCROLLABLE CONTENT AREA */}
        <div 
          className="flex-1 overflow-y-auto px-6 pb-20 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }} // Smooth iOS scroll
        >
          <img 
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
              <div className="text-gray-600 leading-relaxed text-base">
                {project.description}
                {/* Visual padding to ensure bottom content isn't cut off */}
                <div className="h-10" />
              </div>
            </div>

            {project.link && (
              <Link 
                href={project.link} 
                target="_blank" 
                className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 active:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Visit Live Site <FaExternalLinkAlt size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block pointer-events-none w-full max-w-[550px]">
        <Draggable 
          nodeRef={nodeRef} 
          handle=".modal-header" 
          bounds="parent"
          defaultPosition={{x: 0, y: 0}}
        >
          <div 
            ref={nodeRef} 
            className="pointer-events-auto bg-white rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100 flex flex-col overflow-hidden"
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

            {/* Content Area */}
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <img 
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
                  <p className="text-gray-600 leading-relaxed leading-7">{project.description}</p>
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