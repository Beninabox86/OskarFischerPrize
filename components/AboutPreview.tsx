import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface AboutPreviewProps {
  onEnterMonograph: () => void;
  onReadFullAbout: () => void;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ onEnterMonograph, onReadFullAbout }) => {
  return (
    <div className="min-h-screen bg-white animate-fadeIn flex flex-col items-center">
      {/* 
         DESIGN PHILOSOPHY: THE TYPOGRAPHIC THESIS
         - Single column, centered, max-w-2xl (optimal line length)
         - Hierarchy defined by type size and whitespace, not boxes
         - "Japanese Precision": Every pixel of margin matters.
      */}

      <div className="w-full max-w-2xl mx-auto px-6 py-24 md:py-32">

        {/* Header Block */}
        <header className="text-center mb-16">
          <p className="text-xs font-bold text-red-600 uppercase tracking-[0.25em] mb-8">
            Mission Statement
          </p>
          <h1 className="serif-font text-5xl md:text-6xl text-slate-900 leading-[1.1] tracking-tight mb-2">
            Synthesizing the Silos
          </h1>
          <p className="font-serif text-3xl md:text-4xl text-slate-400 italic font-light">
            of Neurodegeneration
          </p>

          <div className="w-12 h-px bg-red-300 mx-auto mt-12"></div>
        </header>

        {/* Narrative Flow */}
        <article className="prose prose-lg prose-slate max-w-none text-center">

          {/* Section 1: The Context */}
          <p className="text-slate-600 leading-relaxed font-light mb-12">
            For over a century, the field of neurodegeneration research has been defined as much by its divisions as by its discoveries. Virologists studying HSV-1 in Alzheimer's rarely converse with lysosomal biologists; geneticists identifying PSEN1 mutations often work in isolation from environmental toxicologists.
          </p>

          {/* Section 2: The Core Thesis (The "Manifesto") */}
          {/* No box. Just pure, weighted typography. */}
          <div className="my-16 px-4 md:px-8">
            <blockquote className="not-italic border-none p-0 m-0">
              <p className="font-serif text-2xl md:text-3xl text-slate-800 leading-relaxed italic">
                “We believe the answers are already present in the scientific literature—they are simply disconnected, buried across millions of papers.”
              </p>
              <footer className="mt-6 text-sm font-bold text-red-500 uppercase tracking-widest not-italic">
                The AdultCognitiveDisease.com Hypothesis
              </footer>
            </blockquote>
          </div>

          {/* Section 3: The Synthesis */}
          <p className="text-slate-600 leading-relaxed font-light mb-16">
            Using AI-powered synthesis, we bridge the gap between 1907 German neuropathology and 2024 molecular biology—revealing how Oskar Fischer's "inside-out" plaque theory is validated by Ralph Nixon's modern ultrastructural analysis of lysosomal failure.
          </p>

        </article>

        {/* Action Area */}
        <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col items-center gap-8">

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onEnterMonograph}
              className="group flex items-center justify-center gap-3 px-8 py-3 bg-white border border-red-500 text-red-600 hover:bg-red-50 transition-colors min-w-[240px]"
            >
              <span className="text-xs uppercase tracking-widest font-bold">Enter Monograph</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onReadFullAbout}
              className="group flex items-center justify-center gap-3 px-8 py-3 bg-white border border-slate-200 hover:border-slate-400 text-slate-600 transition-colors min-w-[240px]"
            >
              <BookOpen size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs uppercase tracking-widest font-bold">Read Methodology</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPreview;
