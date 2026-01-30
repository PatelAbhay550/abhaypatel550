import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import { FaTimes, FaQuestionCircle } from 'react-icons/fa';
import { playClick } from '../../utils/sounds';

const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'I specialize in Next.js, React, Node.js, and modern web technologies.'
  },
  {
    question: 'Are you available for freelance work?',
    answer: 'Yes, I am open to freelance and contract opportunities.'
  },
  {
    question: 'How can I contact you?',
    answer: 'You can contact me via the email link by clicking contact me in main page.'
  },
  {
    question: 'Why is there a Sparrow on the page?',
    answer: 'Their population is declining, so featuring a sparrow is a nod to raising awareness about their conservation. Sound Effect by <a style="color:blue;" target="_blank" href="https://pixabay.com/users/sondangsirait419-44635360/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=220066">Sondang Sirait</a> from <a style="color:blue;" target="_blank" href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=220066">Pixabay</a>.'
  }
];

export default function FaqModal({ open, onClose }) {
  const nodeRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
      };
    }
  }, [open]);

  if (!open || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999]  flex flex-col justify-end md:justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* --- MOBILE VIEW --- */}
      <div 
        className="md:hidden relative w-full bg-white/60 backdrop-blur-md  rounded-t-[32px] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300"
        style={{ height: '70vh', maxHeight: '70vh' }}
      >
        {/* Drag Indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4 shrink-0" />
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">FAQs</span>
              </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-100 rounded-full text-gray-600 active:scale-90 transition-transform"
          >
            <FaTimes onClick={()=>{ if(playClick) playClick.play(); }} size={20} />
          </button>
        </div>
        {/* Scrollable Area */}
        <div 
          className="flex-1 overflow-y-auto px-6 pb-24 overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 mb-4">
                <div className="text-blue-700 font-semibold mb-1 flex items-center gap-2"><FaQuestionCircle className="text-blue-400" /> {faq.question}</div>
                <div className="text-gray-700 text-sm pl-6" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block pointer-events-none w-full max-w-[550px] z-20">
        <Draggable nodeRef={nodeRef} handle=".modal-header" bounds="parent">
          <div 
            ref={nodeRef} 
            className="pointer-events-auto bg-white/60 backdrop-blur-md  rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Draggable Header */}
            <div className="modal-header flex items-center justify-between px-6 py-4 bg-gray-50/80 border-b border-gray-100 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">FAQs</span>
              </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaTimes size={18} />
              </button>
            </div>
            {/* Desktop Scroll Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 mb-4">
                    <div className="text-blue-700 font-semibold mb-1 flex items-center gap-2"><FaQuestionCircle className="text-white" /> {faq.question}</div>
                    <div className="text-gray-900 text-sm pl-6" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
