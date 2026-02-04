import React from 'react';
import { ViewState } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ChapterNavigationProps {
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({ currentView, onChangeView }) => {
    const getNavConfig = () => {
        switch (currentView) {
            case ViewState.CHAPTER_1:
                return {
                    prev: { view: ViewState.ABOUT_PREVIEW, label: 'About Preview' },
                    next: { view: ViewState.CHAPTER_2, label: 'Chapter 2: The Mechanism' }
                };
            case ViewState.CHAPTER_2:
                return {
                    prev: { view: ViewState.CHAPTER_1, label: 'Chapter 1: History' },
                    next: { view: ViewState.CHAPTER_3, label: 'Chapter 3: Progression' }
                };
            case ViewState.CHAPTER_3:
                return {
                    prev: { view: ViewState.CHAPTER_2, label: 'Chapter 2: Mechanism' },
                    next: { view: ViewState.CHAPTER_4, label: 'Chapter 4: Convergence' }
                };
            case ViewState.CHAPTER_4:
                return {
                    prev: { view: ViewState.CHAPTER_3, label: 'Chapter 3: Progression' },
                    next: { view: ViewState.LIBRARY, label: 'The Library' }
                };
            case ViewState.LIBRARY:
                return {
                    prev: { view: ViewState.CHAPTER_4, label: 'Chapter 4: Convergence' },
                    next: { view: ViewState.VIRTUAL_LAB, label: 'Virtual Lab' }
                };
            case ViewState.VIRTUAL_LAB:
                return {
                    prev: { view: ViewState.LIBRARY, label: 'The Library' },
                    next: { view: ViewState.VIDEOS, label: 'Videos' }
                };
            case ViewState.VIDEOS:
                return {
                    prev: { view: ViewState.VIRTUAL_LAB, label: 'Virtual Lab' },
                    next: { view: ViewState.ABOUT, label: 'About & Mission' }
                };
            case ViewState.ABOUT:
                return {
                    prev: { view: ViewState.VIDEOS, label: 'Videos' },
                    next: null
                }
            default:
                return null;
        }
    };

    const config = getNavConfig();
    if (!config) return null;

    return (
        <div className="border-t border-slate-200 mt-12 bg-slate-50">
            <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4">

                {/* Previous Button */}
                {config.prev ? (
                    <button
                        onClick={() => onChangeView(config.prev.view)}
                        className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors group text-left"
                    >
                        <div className="p-2 bg-white border border-slate-200 rounded-full group-hover:border-red-300 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-wider font-bold text-slate-400">Previous</div>
                            <div className="font-serif text-sm md:text-base">{config.prev.label}</div>
                        </div>
                    </button>
                ) : <div />}

                {/* Next Button */}
                {config.next ? (
                    <button
                        onClick={() => onChangeView(config.next.view)}
                        className="flex items-center gap-3 text-slate-900 hover:text-red-600 transition-colors group text-right justify-end"
                    >
                        <div>
                            <div className="text-xs uppercase tracking-wider font-bold text-red-500">Next</div>
                            <div className="font-serif text-lg md:text-xl font-bold">{config.next.label}</div>
                        </div>
                        <div className="p-3 bg-red-500 text-white rounded-full group-hover:bg-red-600 shadow-md transition-all group-hover:scale-110">
                            <ArrowRight size={20} />
                        </div>
                    </button>
                ) : <div />}
            </div>
        </div>
    );
};

export default ChapterNavigation;
