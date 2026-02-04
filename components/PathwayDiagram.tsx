import React, { useState } from 'react';
import { PATHWAY_NODES } from '../constants';
import { PathwayNode } from '../types';

const PathwayDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PathwayNode | null>(null);

  return (
    <div className="w-full min-h-[600px] bg-slate-50 p-8 flex flex-col items-center justify-center relative">
      <h3 className="serif-font text-2xl text-slate-800 mb-12 text-center">The Cascade of Failure</h3>
      
      {/* The Grid Map */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-5xl w-full z-10">
        
        {/* Connecting Lines (Simplified for CSS Grid) - Horizontal */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-8"></div>

        {PATHWAY_NODES.map((node, index) => (
          <div 
            key={node.id}
            onClick={() => setSelectedNode(node)}
            className={`
              relative group cursor-pointer transition-all duration-300
              ${selectedNode?.id === node.id ? 'scale-105' : 'hover:scale-105'}
            `}
          >
            {/* Card */}
            <div className={`
              h-40 p-6 flex flex-col items-center justify-center text-center border
              ${selectedNode?.id === node.id 
                ? 'bg-slate-900 border-red-500 shadow-xl' 
                : 'bg-white border-slate-200 shadow-sm hover:border-red-300'}
            `}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs mb-3 font-mono border
                ${selectedNode?.id === node.id 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'bg-slate-100 text-slate-500 border-slate-300'}
              `}>
                {index + 1}
              </div>
              
              <h4 className={`serif-font text-lg mb-2 ${selectedNode?.id === node.id ? 'text-white' : 'text-slate-800'}`}>
                {node.label}
              </h4>
              
              <p className={`text-xs ${selectedNode?.id === node.id ? 'text-slate-400' : 'text-slate-500'}`}>
                {node.description}
              </p>
            </div>

            {/* Down Arrow indicator for mobile flow or visual flair */}
            {index < PATHWAY_NODES.length - 1 && (
              <div className="md:hidden flex justify-center py-2 text-slate-300">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel (Modal-like overlay at bottom) */}
      <div className={`
        fixed bottom-0 right-0 md:right-[20px] md:bottom-[20px] md:w-[400px] bg-slate-900 border-t-4 border-red-500 shadow-2xl p-6
        transition-transform duration-500 z-50
        ${selectedNode ? 'translate-y-0' : 'translate-y-[120%]'}
      `}>
        {selectedNode && (
          <>
            <div className="flex justify-between items-start mb-4">
              <h4 className="serif-font text-xl text-white">{selectedNode.label}</h4>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-500 hover:text-white"
              >
                ×
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {selectedNode.detailedText}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center text-xs text-red-400 uppercase tracking-wider">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Critical Path
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PathwayDiagram;
