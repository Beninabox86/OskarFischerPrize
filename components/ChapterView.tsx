import React from 'react';
import { ChapterContent, LibraryItem, VirtualLabItem } from '../types';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { LIBRARY_ITEMS, VIRTUAL_LAB_ITEMS } from '../constants';

interface ChapterViewProps {
  data: ChapterContent;
}

// Helper function to find paper metadata by filename
const findPaperByFilename = (filename: string): (LibraryItem | VirtualLabItem) | undefined => {
  const libraryItem = LIBRARY_ITEMS.find(item => item.filename === filename);
  if (libraryItem) return libraryItem;
  return VIRTUAL_LAB_ITEMS.find(item => item.filename === filename);
};

const ChapterView: React.FC<ChapterViewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:px-8 md:py-12 animate-fadeIn">
      <header className="mb-8 md:mb-12 border-b border-red-200 pb-6 md:pb-8">
        <h1 className="serif-font text-3xl md:text-4xl text-slate-900 mb-4">{data.title}</h1>
        <p className="text-lg md:text-xl text-slate-500 font-light italic">{data.subtitle}</p>
      </header>

      <div className="space-y-8">
        {data.content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2 key={index} className="serif-font text-2xl text-slate-800 mt-12 mb-6 border-l-4 border-slate-900 pl-4">
                  {block.text}
                </h2>
              );
            case 'quote':
              return (
                <blockquote key={index} className="p-8 bg-slate-100 border-l-4 border-red-500 text-slate-700 italic serif-font my-10 shadow-sm">
                  "{block.text}"
                </blockquote>
              );
            case 'list':
              return (
                <div key={index} className="my-8 p-8 bg-slate-50 border border-slate-200 rounded-sm">
                  <p className="font-bold text-slate-900 mb-6 uppercase tracking-wide text-xs">{block.text}</p>
                  <ul className="space-y-4">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-start text-slate-700 leading-relaxed">
                        <span className="text-red-500 mr-3 font-bold">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            case 'pdf-link': {
              const paper = findPaperByFilename(block.file);
              return (
                <a
                  key={index}
                  href={`pdfs/${block.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 md:p-6 my-6 border border-slate-200 bg-white hover:border-red-400 hover:shadow-lg transition-all duration-300 rounded-sm max-w-2xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shrink-0">
                        <FileText size={20} className="md:hidden" />
                        <FileText size={24} className="hidden md:block" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                          <h3 className="text-base md:text-lg font-serif text-slate-900 group-hover:text-red-600 transition-colors">
                            {paper?.displayTitle || block.text}
                          </h3>
                          {paper && (
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${paper.type === 'whitepaper'
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-red-50 text-red-600 border border-red-100'
                            }`}>
                              {paper.type}
                            </span>
                          )}
                        </div>
                        {paper && (
                          <>
                            <p className="text-xs text-slate-400 italic">
                              {paper.title}
                            </p>
                            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
                              {paper.author} <span className="mx-2 text-slate-300">|</span> {paper.year}
                            </p>
                            <p className="text-xs md:text-sm text-slate-400 mt-2 font-light max-w-xl leading-relaxed hidden sm:block">
                              {paper.description}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="p-2 text-slate-300 group-hover:text-red-500 transition-colors">
                        <ExternalLink size={20} />
                      </div>
                      {block.deck && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`pdfs/${block.deck}`, '_blank');
                          }}
                          className="flex items-center gap-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded transition-colors z-10"
                        >
                          <FileText size={14} />
                          View Deck
                        </button>
                      )}
                    </div>
                  </div>
                </a>
              );
            }
            case 'paragraph':
            default:
              return (
                <p key={index} className="text-lg text-slate-700 leading-relaxed font-light mb-6">
                  {block.text}
                </p>
              );
          }
        })}
      </div>
    </div>
  );
};

export default ChapterView;