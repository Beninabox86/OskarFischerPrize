import React from 'react';
import { ViewState } from '../types';
import { BookOpen, GitGraph, Home, Library, FlaskConical, Info, Video } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onClose }) => {

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        onChangeView(view);
        onClose?.();
      }}
      className={`
        w-full flex items-center gap-3 px-6 py-4 text-sm transition-all border-l-2
        ${currentView === view
          ? 'bg-slate-800 text-white border-red-500'
          : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'}
      `}
    >
      <Icon size={18} />
      <span className="tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="h-full bg-slate-900 flex flex-col border-r border-slate-800">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-slate-100 font-bold tracking-widest uppercase text-xs mb-1 text-opacity-50">
          Digital Monograph
        </h1>
        <div className="text-red-500 font-serif text-xl italic leading-tight">
          Convergent Autophagic Collapse
        </div>
      </div>

      <nav className="flex-1 py-8 space-y-1 overflow-y-auto">
        <NavItem view={ViewState.HOME} label="Cover" icon={Home} />
        <div className="px-6 pt-6 pb-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
          The Theory
        </div>
        <NavItem view={ViewState.CHAPTER_1} label="I. History" icon={BookOpen} />
        <NavItem view={ViewState.CHAPTER_2} label="II. Mechanism" icon={GitGraph} />
        <NavItem view={ViewState.CHAPTER_3} label="III. Progression" icon={GitGraph} />
        <NavItem view={ViewState.CHAPTER_4} label="IV. Convergence" icon={GitGraph} />

        <div className="px-6 pt-6 pb-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
          Reference
        </div>
        <NavItem view={ViewState.LIBRARY} label="Library" icon={Library} />
        <NavItem view={ViewState.VIRTUAL_LAB} label="Virtual Lab" icon={FlaskConical} />
        <NavItem view={ViewState.VIDEOS} label="Videos" icon={Video} />
        <div className="mt-4 border-t border-slate-800 pt-4">
          <NavItem view={ViewState.ABOUT} label="About" icon={Info} />
        </div>
      </nav>

      <div className="p-6 border-t border-slate-800 text-xs text-slate-600 text-center">
        &copy; {new Date().getFullYear()} Truchard Ventures<br />
        Authored, Designed and Curated by Frontier AI Models
      </div>
    </div>
  );
};

export default Sidebar;
