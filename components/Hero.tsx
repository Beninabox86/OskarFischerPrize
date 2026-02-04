import React from 'react';
import { useModalTracking } from '../hooks/useAnalytics';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [hoveredSide, setHoveredSide] = React.useState<'left' | 'right' | null>(null);
  const [showVideo, setShowVideo] = React.useState(false);
  const { trackOpen: trackVideoOpen, trackClose: trackVideoClose } = useModalTracking('intro_video');

  // Handle video modal open with tracking
  const handleOpenVideo = () => {
    trackVideoOpen('video');
    setShowVideo(true);
  };

  // Handle video modal close with tracking
  const handleCloseVideo = () => {
    trackVideoClose();
    setShowVideo(false);
  };

  // Scroll/Swipe detection logic
  React.useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) { // Threshold for scroll down
        onStart();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 50) { // Swipe up (scroll down)
        onStart();
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onStart]);

  return (
    <div className="relative h-[100dvh] w-full bg-slate-950 overflow-hidden">

      {/* ================= MOBILE LAYOUT (Clean Editorial) ================= */}
      <div className="md:hidden absolute inset-0 z-20 flex flex-col h-full">
        {/* Background - Clean Slate (No Image) */}
        <div className="absolute inset-0 bg-slate-950"></div>
        {/* Subtle Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>

        {/* Safe Content Area - Flex Column */}
        <div className="relative z-30 flex flex-col justify-between h-full pt-10 pb-8 px-8">

          {/* 1. Header Block */}
          <div className="w-full border-t border-red-500/50 pt-6">
            <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-4 font-bold">The Digital Monograph</p>
            <h1 className="serif-font text-4xl text-slate-100 leading-[1.15]">
              Convergent <br />
              <span className="italic text-slate-500">Autophagic</span> <br />
              Collapse
            </h1>
          </div>

          {/* 2. Middle Block (Spacer & Names) */}
          <div className="flex-1 flex flex-col justify-center min-h-[100px]">
            <div className="w-full border-b border-slate-800 pb-2 mb-2 flex justify-between text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
              <span>Prague, 1907</span>
              <span>New York, 2025</span>
            </div>
            <div className="flex justify-between serif-font text-xl text-slate-200">
              <span>Fischer</span>
              <span>Nixon</span>
            </div>
          </div>

          {/* 3. Bottom Block (CTA & Scroll Cue) */}
          <div className="w-full flex flex-col items-center gap-6">
            <p className="text-slate-200 text-sm font-light leading-relaxed text-left w-full border-l-2 border-[#D4AF37] pl-4">
              The unified theory connecting the "lost" observations of the 20th century with modern lysosomal biology.
            </p>

            {/* Watch Introduction Button */}
            <button
              onClick={handleOpenVideo}
              className="group flex items-center justify-center gap-3 px-6 py-3 border border-slate-600 hover:border-red-500/50 bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-300 rounded-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="text-[10px] tracking-[0.2em] text-slate-200 uppercase font-medium">
                Watch Introduction
              </span>
            </button>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-4 cursor-pointer" onClick={onStart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#D4AF37]">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">Scroll to Begin</p>
          </div>
        </div>
      </div>


      {/* ================= DESKTOP LAYOUT (Split Screen Interaction) ================= */}
      <div className="hidden md:flex relative h-full w-full flex-row">

        {/* Left Side: Fischer (Sepia/Historical) */}
        <div
          className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-slate-700 order-1 overflow-hidden
              ${hoveredSide === 'left' ? 'w-[60%]' : hoveredSide === 'right' ? 'w-[40%]' : 'w-1/2'}
            `}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Reveal Logic: Opacity 0 by default, 80 when hovered */}
          <div className={`absolute inset-0 bg-[url('/images/hero_composite.jpg')] bg-[length:200%_100%] bg-left transition-all duration-1000
              ${hoveredSide === 'left' ? 'opacity-80 scale-105 sepia-0' : 'opacity-0 scale-100 sepia mix-blend-luminosity'}
            `}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>

          <div className={`hidden xl:block absolute bottom-12 lg:bottom-20 xl:bottom-16 left-6 lg:left-12 xl:left-8 2xl:left-16 text-slate-300 z-10 p-4 lg:p-6 border-l w-full max-w-xs lg:max-w-sm xl:max-w-xs 2xl:max-w-md transition-all duration-500
              ${hoveredSide === 'left' ? 'border-red-500 bg-slate-900/40 backdrop-blur-sm pr-8' : 'border-slate-500/50'}
            `}>
            <h2 className="serif-font text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl italic tracking-tight text-white/90">Oskar Fischer <span className="text-[#D4AF37] text-lg lg:text-xl xl:text-xl 2xl:text-2xl not-italic ml-2 inline font-sans font-light tracking-wide">1907</span></h2>
            <p className={`mt-3 lg:mt-4 text-sm lg:text-base xl:text-base 2xl:text-lg text-slate-300 font-light leading-relaxed transition-all duration-500
                 ${hoveredSide === 'left' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
              The first person to see "The Poison Flower," the <span className="italic text-red-400">Drusige Nekrose.</span>
            </p>
          </div>
        </div>

        {/* Right Side: Nixon (Fluorescence/Modern) */}
        <div
          className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] order-2 overflow-hidden
              ${hoveredSide === 'right' ? 'w-[60%]' : hoveredSide === 'left' ? 'w-[40%]' : 'w-1/2'}
            `}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Reveal Logic: Opacity 0 by default, 90 when hovered */}
          <div className={`absolute inset-0 bg-[url('/images/hero_composite.jpg')] bg-[length:200%_100%] bg-right transition-all duration-1000
              ${hoveredSide === 'right' ? 'opacity-90 scale-105' : 'opacity-0 scale-100'}
            `}></div>
          <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply"></div>

          <div className={`hidden xl:block absolute top-12 lg:top-20 xl:top-16 right-6 lg:right-12 xl:right-8 2xl:right-16 text-right z-10 p-4 lg:p-6 w-full max-w-xs lg:max-w-sm xl:max-w-xs 2xl:max-w-md ml-auto transition-all duration-500 border-r
               ${hoveredSide === 'right' ? 'border-white/50 bg-white/10 backdrop-blur-md pl-8 shadow-2xl' : 'border-transparent'}
            `}>
            <h2 className="serif-font text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl font-bold text-slate-100 tracking-tight drop-shadow-md">Ralph Nixon <span className="text-[#D4AF37] text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-normal ml-2 inline font-sans tracking-wide">2025</span></h2>
            <p className={`mt-3 lg:mt-4 text-sm lg:text-base xl:text-base 2xl:text-lg text-slate-200 font-medium leading-relaxed drop-shadow-md
                 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0 translate-y-4'}
              `}>
              The first person to recognize the neuronal explosion within the cell. <span className="italic text-red-400">The V-ATPase Collapse.</span>
            </p>
          </div>
        </div>

        {/* Desktop Center Overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-4 transition-all duration-700
             ${hoveredSide ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}
          `}>
          <div className="relative pointer-events-auto text-center group w-full max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl px-4">

            <div className="relative py-8 lg:py-10 xl:py-12 px-6 lg:px-10 xl:px-12">
              <h1 className="serif-font text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-slate-100 font-light tracking-wider lg:tracking-widest mb-1 lg:mb-2 leading-tight drop-shadow-md">
                CONVERGENT
              </h1>
              <h1 className="serif-font text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 tracking-wider lg:tracking-widest mb-4 lg:mb-6 leading-tight drop-shadow-xl">
                AUTOPHAGIC
              </h1>
              <h1 className="serif-font text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-slate-100 font-light tracking-wider lg:tracking-widest mb-6 lg:mb-8 leading-tight drop-shadow-md">
                COLLAPSE
              </h1>

              <p className="text-slate-300 text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.25em] xl:tracking-[0.3em] uppercase mb-8 lg:mb-10 xl:mb-12 font-medium border-t border-slate-500/30 pt-6 lg:pt-8 inline-block drop-shadow-sm">
                The Unified Theory of Neurodegeneration
              </p>

              <div className="inline-flex flex-col items-center gap-6">
                <button
                  onClick={onStart}
                  className="group relative px-8 lg:px-10 xl:px-12 py-3 lg:py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-300 border border-slate-600/50 hover:border-red-500/50"
                >
                  <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-100 group-hover:opacity-90"></div>
                  <span className="relative text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em] text-white uppercase font-bold group-hover:text-white transition-colors duration-300">
                    Enter The Monograph
                  </span>
                </button>

                <button
                  onClick={handleOpenVideo}
                  className="group flex items-center justify-center gap-3 px-8 py-3 border border-slate-500/50 hover:border-red-500/50 bg-slate-900/50 hover:bg-slate-800/70 transition-all duration-300 rounded-sm backdrop-blur-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 group-hover:text-red-400 transition-colors">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] text-slate-300 uppercase font-medium group-hover:text-white transition-colors">
                    Watch Introduction
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseVideo}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-white transition-colors">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/47P_5TcJpKg?autoplay=1&rel=0"
              title="Introduction to Convergent Autophagic Collapse"
              className="w-full h-full rounded-sm shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Decorative Border */}
            <div className="absolute inset-0 border border-red-500/20 rounded-sm pointer-events-none"></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Hero;
