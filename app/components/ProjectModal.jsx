import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import Link from 'next/link';
import Image from 'next/image';
import { playClick } from '../../utils/sounds';
import useModalA11y from '../../utils/useModalA11y';

const ProjectModal = ({ project, onClose }) => {
  // Mount flag, Esc-to-close, body scroll lock and focus trap (see utils/useModalA11y.js)
  const { nodeRef: overlayRef, mounted } = useModalA11y(!!project, onClose);
  // Draggable window handle ref (desktop)
  const dragRef = useRef(null);

  if (!project || !mounted) return null;

  const titleId = `project-modal-title-${project.id}`;

  const modalContent = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center md:items-center"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* --- MOBILE VIEW --- */}
      <div
        className="md:hidden relative w-full bg-white/60 backdrop-blur-md rounded-t-[32px] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300 dark:bg-gray-900/85 dark:border dark:border-white/10"
        style={{ height: '85vh', maxHeight: '85vh' }}
      >
        {/* Drag Indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4 shrink-0 dark:bg-gray-700" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase dark:text-gray-300">{project.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-3 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-transform dark:bg-white/10 dark:text-gray-200"
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
            className="rounded-2xl w-full aspect-video object-cover mb-6 shadow-sm border border-gray-100 dark:border-white/10"
          />

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1 dark:text-blue-400">Type</p>
              <p className="text-gray-800 text-lg font-semibold dark:text-gray-100">{project.title}</p>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1 dark:text-blue-400">Project Description</p>
              <div className="text-gray-600 leading-relaxed text-base pb-6 dark:text-gray-300">
                {project.description}
              </div>
            </div>

            {project.link && (
              <div className="pb-10">
                <Link
                  href={project.link}
                  onClick={() => { playClick.play(); }}
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
          nodeRef={dragRef}
          handle=".modal-header"
          bounds="parent"
        >
          <div
            ref={dragRef}
            className="pointer-events-auto bg-white/60 backdrop-blur-md rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100 flex flex-col overflow-hidden dark:bg-gray-900/85 dark:border-white/10"
          >
            {/* Draggable Header */}
            <div className="modal-header flex items-center justify-between px-6 py-4 bg-gray-50/80 border-b border-gray-100 cursor-grab active:cursor-grabbing dark:bg-gray-800/90 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span id={titleId} className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase dark:text-gray-300">{project.name}</span>
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
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest dark:text-blue-400">Classification</h3>
                  <p className="text-gray-900 font-bold text-xl dark:text-white">{project.title}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest dark:text-blue-400">Details</h3>
                  <p className="text-gray-900 leading-relaxed dark:text-gray-100">{project.description}</p>
                </div>
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline mt-4 decoration-2 underline-offset-4 dark:text-blue-400"
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
