import React, { useState, useEffect } from 'react';
import { Zap, Target, Cpu, Layers, ArrowRight, CheckCircle2, Play, Users, Sparkles, Menu, X, MessageSquare } from 'lucide-react';

// --- Navbar Component ---
const Navbar = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500">
            <Zap size={18} className="text-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Nextframe<span className="text-[#00F0FF] text-lg">.Agency</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <a href="#process" className="hover:text-[#CCFF00] transition-colors">Process</a>
          <a href="#services" className="hover:text-[#CCFF00] transition-colors">Services</a>
          <button 
            onClick={onOpenModal} 
            className="px-6 py-2 bg-[#00F0FF] text-black hover:bg-[#CCFF00] transition-all duration-300 rounded-full text-xs font-black shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            Start The Conversation
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Hero Component ---
const Hero = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://ce6vsiuf1fnatbbk.public.blob.vercel-storage.com/Commercial%20one%20-%20Jade%20bar%20v%202.5.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-black uppercase tracking-widest mb-8 animate-pulse">
          <Sparkles size={12} /> The Human-AI Interface
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
          Stop Shooting.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#CCFF00]">Start Visioning.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white font-medium mb-12 leading-relaxed drop-shadow-lg">
          Traditional production is expensive, slow, and rigid. Nextframe.Agency bridges the gap between business intuition and high-fidelity AI execution.
        </p>
        
        <button 
          onClick={onOpenModal} 
          className="group flex items-center gap-3 px-10 py-5 bg-[#CCFF00] text-black font-black uppercase italic tracking-tighter text-xl rounded-sm hover:bg-white transition-all duration-300"
        >
          Start The Conversation 
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#050505] text-white selection:bg-[#CCFF00] selection:text-black font-sans">
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      {/* Modal logic omitted for brevity, but you can add it back later */}
    </div>
  );
}
