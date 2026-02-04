import React, { useState } from 'react';
import Footer from './components/Footer';
import EmailSignupForm from './components/EmailSignupForm';
import { ViewState } from './types';
import { PRIZE_INFO, TIER_INFO, NAV_ITEMS, getWinnersByTier, getWinnerById } from './constants';
import { Menu, X, Award, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { useAnalyticsInit, usePageTracking } from './hooks/useAnalytics';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = React.useRef<HTMLDivElement>(null);

  // Initialize analytics on app mount
  useAnalyticsInit();

  // Track page views when view changes
  usePageTracking(view);

  React.useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, [view]);

  const navigateToParticipant = (winnerId: string) => {
    setSelectedWinnerId(winnerId);
    setView(ViewState.PARTICIPANT_DETAIL);
  };

  const renderSidebar = () => (
    <div className="h-full bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="font-serif text-xl text-amber-400 font-bold leading-tight">
          Oskar Fischer<br />Prize
        </h1>
        <p className="text-slate-400 text-xs mt-2">2022 Living Literature Review</p>
      </div>
      <nav className="flex-1 p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view as ViewState)}
            className={`w-full text-left px-4 py-3 rounded mb-1 transition-colors ${
              view === item.view
                ? 'bg-amber-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs">
          A companion site to<br />
          <a href="https://adultcognitivedisease.org" className="text-amber-400 hover:underline">
            AdultCognitiveDisease.org
          </a>
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-8">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm mb-8">
                  <Award size={16} />
                  <span>{PRIZE_INFO.totalPrize} in Research Prizes</span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
                  The <span className="text-amber-400">{PRIZE_INFO.name}</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  {PRIZE_INFO.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setView(ViewState.PARTICIPANTS)}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded transition-colors"
                  >
                    Meet the Winners
                  </button>
                  <button
                    onClick={() => setView(ViewState.PRIZE_OVERVIEW)}
                    className="px-8 py-4 border border-slate-600 hover:border-amber-500 text-white rounded transition-colors"
                  >
                    About the Prize
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-100 py-12 px-8">
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600">10</div>
                  <div className="text-slate-600 text-sm">Prize Winners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4</div>
                  <div className="text-slate-600 text-sm">Gold Recipients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">$4M</div>
                  <div className="text-slate-600 text-sm">Total Prizes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">2022</div>
                  <div className="text-slate-600 text-sm">Award Year</div>
                </div>
              </div>
            </div>

            {/* Featured Winners Preview */}
            <div className="py-16 px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl text-slate-900 mb-8 text-center">Gold Prize Winners</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getWinnersByTier('gold').map((winner) => (
                    <button
                      key={winner.id}
                      onClick={() => navigateToParticipant(winner.id)}
                      className="text-left p-6 border border-slate-200 rounded hover:border-amber-400 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                            Gold - $500,000
                          </div>
                          <h3 className="font-serif text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                            {winner.name}
                          </h3>
                          <p className="text-slate-500 text-sm mt-1">{winner.institution}</p>
                          <p className="text-slate-600 text-sm mt-3 font-medium">{winner.hypothesis}</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button
                    onClick={() => setView(ViewState.PARTICIPANTS)}
                    className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-2"
                  >
                    View All 10 Winners <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Signup */}
            <div className="bg-slate-900 py-16 px-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-2xl text-white mb-4">Stay Updated</h2>
                <p className="text-slate-400 mb-8">
                  Get notified when new analyses and synthesis papers are published.
                </p>
                <EmailSignupForm source="home" />
              </div>
            </div>
          </div>
        );

      case ViewState.PRIZE_OVERVIEW:
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <header className="mb-12 border-b border-amber-200 pb-8">
              <h1 className="font-serif text-4xl text-slate-900 mb-4">About the Prize</h1>
              <p className="text-xl text-slate-500 font-light">{PRIZE_INFO.description}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-2xl text-slate-900 mb-4">The Challenge</h2>
              <p className="text-slate-600 mb-8">
                Launched in late 2019 following a philanthropic gift to UTSA from Texas businessman James Truchard,
                the Oskar Fischer Prize put forward a unique challenge by engaging the world's brightest researchers
                to develop proposals to change how society looks at Alzheimer's disease.
              </p>

              <h2 className="font-serif text-2xl text-slate-900 mb-4">Named After Oskar Fischer</h2>
              <p className="text-slate-600 mb-4">
                {PRIZE_INFO.namedAfterBio}
              </p>
              <p className="text-slate-600 mb-8">
                Fischer argued against the distinction between 'presenile' and 'senile' dementia, viewing them as a
                single clinicopathological entity. His focus on the plaque as a site of active neuronal degeneration,
                rather than passive deposition, foreshadowed modern understanding of the disease.
              </p>

              <h2 className="font-serif text-2xl text-slate-900 mb-4">Prize Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {Object.entries(TIER_INFO).map(([tier, info]) => (
                  <div key={tier} className={`p-6 rounded border-2 ${
                    tier === 'gold' ? 'border-amber-400 bg-amber-50' :
                    tier === 'silver' ? 'border-slate-400 bg-slate-50' :
                    'border-orange-400 bg-orange-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      tier === 'gold' ? 'text-amber-600' :
                      tier === 'silver' ? 'text-slate-600' :
                      'text-orange-600'
                    }`}>{info.label}</div>
                    <div className="text-slate-900 font-bold text-xl">{info.amount}</div>
                    <p className="text-slate-600 text-sm mt-2">{info.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case ViewState.PARTICIPANTS:
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <header className="mb-12 border-b border-amber-200 pb-8">
              <h1 className="font-serif text-4xl text-slate-900 mb-4">Prize Winners</h1>
              <p className="text-xl text-slate-500 font-light">
                The 10 researchers whose hypotheses are reshaping Alzheimer's disease research.
              </p>
            </header>

            {(['gold', 'silver', 'bronze'] as const).map((tier) => {
              const winners = getWinnersByTier(tier);
              const tierInfo = TIER_INFO[tier];
              return (
                <div key={tier} className="mb-12">
                  <h2 className={`text-xl font-bold uppercase tracking-widest mb-6 border-l-4 pl-4 ${
                    tier === 'gold' ? 'text-amber-600 border-amber-400' :
                    tier === 'silver' ? 'text-slate-600 border-slate-400' :
                    'text-orange-600 border-orange-400'
                  }`}>
                    {tierInfo.label} Prize Recipients ({tierInfo.amount})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {winners.map((winner) => (
                      <button
                        key={winner.id}
                        onClick={() => navigateToParticipant(winner.id)}
                        className="text-left p-6 border border-slate-200 rounded hover:border-amber-400 hover:shadow-lg transition-all group bg-white"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                              {winner.name}
                            </h3>
                            <p className="text-slate-500 text-sm">{winner.institution}</p>
                            <p className="text-slate-400 text-sm">{winner.country}</p>
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <p className="text-slate-700 font-medium">{winner.hypothesis}</p>
                              <p className="text-slate-500 text-sm mt-2">{winner.hypothesisSummary}</p>
                            </div>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-amber-500 transition-colors shrink-0 ml-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case ViewState.PARTICIPANT_DETAIL:
        const winner = selectedWinnerId ? getWinnerById(selectedWinnerId) : null;
        if (!winner) {
          return (
            <div className="max-w-4xl mx-auto px-8 py-12 text-center">
              <p className="text-slate-500">Winner not found.</p>
              <button
                onClick={() => setView(ViewState.PARTICIPANTS)}
                className="mt-4 text-amber-600 hover:underline"
              >
                Back to Participants
              </button>
            </div>
          );
        }
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <button
              onClick={() => setView(ViewState.PARTICIPANTS)}
              className="text-amber-600 hover:text-amber-700 mb-8 inline-flex items-center gap-2"
            >
              &larr; Back to All Winners
            </button>

            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
              winner.tier === 'gold' ? 'bg-amber-100 text-amber-700' :
              winner.tier === 'silver' ? 'bg-slate-100 text-slate-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {TIER_INFO[winner.tier].label} Prize - {TIER_INFO[winner.tier].amount}
            </div>

            <h1 className="font-serif text-4xl text-slate-900 mb-2">{winner.name}</h1>
            <p className="text-xl text-slate-500 mb-2">{winner.institution}</p>
            <p className="text-slate-400 mb-8">{winner.country}</p>

            <div className="bg-slate-50 p-8 rounded mb-8">
              <h2 className="font-serif text-2xl text-slate-900 mb-4">{winner.hypothesis}</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{winner.hypothesisSummary}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="font-serif text-xl text-slate-900 mb-4">About This Hypothesis</h3>
              <p className="text-slate-600">
                Additional analysis and synthesis of this hypothesis will be added as the site develops.
                Check back for detailed breakdowns, related papers, and connections to other prize-winning hypotheses.
              </p>
            </div>
          </div>
        );

      case ViewState.LIBRARY:
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <header className="mb-12 border-b border-amber-200 pb-8">
              <h1 className="font-serif text-4xl text-slate-900 mb-4">The Library</h1>
              <p className="text-xl text-slate-500 font-light">
                Primary sources and research papers from prize participants.
              </p>
            </header>

            <div className="bg-slate-50 p-8 rounded text-center">
              <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
              <h2 className="font-serif text-xl text-slate-700 mb-2">Coming Soon</h2>
              <p className="text-slate-500">
                The library will be populated with research papers, literature reviews, and synthesis documents
                from the prize participants.
              </p>
            </div>
          </div>
        );

      case ViewState.SYNTHESIS:
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <header className="mb-12 border-b border-amber-200 pb-8">
              <h1 className="font-serif text-4xl text-slate-900 mb-4">Synthesis</h1>
              <p className="text-xl text-slate-500 font-light">
                Cross-cutting analysis of how these hypotheses connect and complement each other.
              </p>
            </header>

            <div className="bg-slate-50 p-8 rounded text-center">
              <Lightbulb className="mx-auto text-slate-400 mb-4" size={48} />
              <h2 className="font-serif text-xl text-slate-700 mb-2">Coming Soon</h2>
              <p className="text-slate-500">
                This section will explore the connections between different hypotheses, identify common themes,
                and present a unified view of the evolving understanding of Alzheimer's disease.
              </p>
            </div>
          </div>
        );

      case ViewState.ABOUT:
        return (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <header className="mb-12 border-b border-amber-200 pb-8">
              <h1 className="font-serif text-4xl text-slate-900 mb-4">About This Site</h1>
              <p className="text-xl text-slate-500 font-light">
                A living literature review and synthesis of the 2022 Oskar Fischer Prize.
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-8">
                This website serves as a companion to{' '}
                <a href="https://adultcognitivedisease.org" className="text-amber-600 hover:underline">
                  AdultCognitiveDisease.org
                </a>
                , focused specifically on the high-quality hypothesis generators who participated in the 2022
                Oskar Fischer Prize and seeded the knowledge base for understanding Alzheimer's disease.
              </p>

              <h2 className="font-serif text-2xl text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 mb-8">
                To present a comprehensive, accessible synthesis of the innovative hypotheses that emerged from
                the Oskar Fischer Prize competition, exploring how these diverse ideas might connect and inform
                future research directions.
              </p>

              <h2 className="font-serif text-2xl text-slate-900 mb-4">Stay Connected</h2>
              <EmailSignupForm source="about" />
            </div>
          </div>
        );

      default:
        return <div className="p-8">Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white z-50 relative shrink-0">
        <div className="text-amber-600 font-serif text-lg font-bold leading-none">
          Oskar Fischer<br />Prize
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 text-slate-600 hover:bg-slate-100 rounded transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-slate-900 md:hidden pt-[73px] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {renderSidebar()}
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-1/5 h-full">
        {renderSidebar()}
      </div>

      {/* Main Content */}
      <main
        ref={mainRef}
        className="flex-1 h-full overflow-y-auto scroll-smooth relative"
      >
        {renderContent()}
        {view !== ViewState.HOME && <Footer />}
      </main>
    </div>
  );
};

export default App;
