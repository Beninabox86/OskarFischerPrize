import React, { useState, useRef, useEffect } from 'react';
import Footer from './components/Footer';
import EmailSignupForm from './components/EmailSignupForm';
import { ViewState } from './types';
import { PRIZE_INFO, TIER_INFO, NAV_ITEMS, getWinnersByTier, getWinnerById, FEATURED_QUOTE, MISSION_STATEMENT } from './constants';
import { Menu, X, Award, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { useAnalyticsInit, usePageTracking } from './hooks/useAnalytics';

// UI Components
import { Heading, Text, SectionHeader, TierBadge } from './components/ui/Typography';
import { Button, BackButton } from './components/ui/Button';
import { WinnerCard, StatCard, TierInfoCard, ComingSoonCard } from './components/ui/Card';

// Layout Components
import { PageLayout } from './components/layout/PageLayout';
import { Section, HeroSection, ContentSection, GridSection, TierSectionHeader } from './components/layout/Section';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useAnalyticsInit();
  usePageTracking(view);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, [view]);

  const navigateToParticipant = (winnerId: string) => {
    setSelectedWinnerId(winnerId);
    setView(ViewState.PARTICIPANT_DETAIL);
  };

  /* ---------------------------------------------------------------------------
     Sidebar Component
     --------------------------------------------------------------------------- */
  const Sidebar = () => (
    <div className="h-full bg-paper-dark text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-divider-dark">
        <h1 className="font-display text-h3 text-white font-medium leading-tight">
          Oskar Fischer<br />Prize
        </h1>
        <p className="text-caption font-ui text-white/50 mt-2">2022 Living Literature Review</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view as ViewState)}
            className={`
              w-full text-left px-4 py-3 rounded font-ui text-small mb-1 transition-colors
              ${view === item.view
                ? 'bg-accent text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-divider-dark">
        <p className="text-caption font-ui text-white/50">
          A companion site to<br />
          <a href="https://adultcognitivedisease.org" className="text-accent-light hover:underline">
            AdultCognitiveDisease.org
          </a>
        </p>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------------------
     Home Page
     --------------------------------------------------------------------------- */
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection size="lg">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-caption font-ui mb-8">
            <Award size={16} />
            <span>Recognizing Innovation in Alzheimer's Research</span>
          </div>

          <Heading level={1} className="text-white mb-6">
            The <span className="text-white">{PRIZE_INFO.name}</span>
          </Heading>

          <Text variant="lead" className="text-white/80 max-w-2xl mx-auto mb-10">
            {PRIZE_INFO.description}
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setView(ViewState.PARTICIPANTS)}
              className="bg-accent text-white border-2 border-accent shadow-lg hover:bg-white hover:text-accent hover:border-white transition-all"
            >
              Meet the Winners
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setView(ViewState.PRIZE_OVERVIEW)}
              className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-all"
            >
              About the Prize
            </Button>
          </div>

          {/* Featured Quote */}
          <div className="border-t border-white/10 pt-8">
            <blockquote className="text-center">
              <p className="text-body-lg font-body italic text-white/80 mb-2">
                "{FEATURED_QUOTE.text}"
              </p>
              <cite className="text-small font-ui text-white not-italic">
                — {FEATURED_QUOTE.attribution}
              </cite>
            </blockquote>
          </div>
        </div>
      </HeroSection>

      {/* Stats */}
      <Section background="warm" padding="md">
        <div className="max-w-4xl mx-auto">
          <GridSection columns={4} gap="md">
            <StatCard value="10" label="Prize Winners" />
            <StatCard value="4" label="Gold Recipients" />
            <StatCard value="2" label="Silver Recipients" />
            <StatCard value="4" label="Bronze Recipients" />
          </GridSection>
        </div>
      </Section>

      {/* Featured Winners */}
      <ContentSection padding="lg">
        <Heading level={2} className="text-center mb-10">Gold Prize Winners</Heading>
        <GridSection columns={2} gap="md">
          {getWinnersByTier('gold').map((winner) => (
            <WinnerCard
              key={winner.id}
              name={winner.name}
              institution={winner.institution}
              hypothesis={winner.hypothesis}
              tier="gold"
              onClick={() => navigateToParticipant(winner.id)}
              compact
            />
          ))}
        </GridSection>
        <div className="text-center mt-10">
          <Button
            variant="link"
            onClick={() => setView(ViewState.PARTICIPANTS)}
            rightIcon={<ChevronRight size={16} />}
          >
            View All 10 Winners
          </Button>
        </div>
      </ContentSection>

      {/* Email Signup */}
      <Section background="dark" padding="lg">
        <div className="max-w-2xl mx-auto text-center">
          <Heading level={2} className="text-white mb-4">Stay Updated</Heading>
          <Text variant="body" className="text-white/60 mb-8">
            Get notified when new analyses and synthesis papers are published.
          </Text>
          <EmailSignupForm source="home" />
        </div>
      </Section>
    </div>
  );

  /* ---------------------------------------------------------------------------
     Prize Overview Page
     --------------------------------------------------------------------------- */
  const PrizeOverviewPage = () => (
    <PageLayout>
      <SectionHeader
        title="About the Prize"
        subtitle={PRIZE_INFO.description}
      />

      <div className="space-y-8">
        <div>
          <Heading level={3} className="mb-4">The Challenge</Heading>
          <Text variant="body-lg">
            Launched in late 2019 following a philanthropic gift to UTSA from Texas businessman James Truchard,
            the Oskar Fischer Prize put forward a unique challenge by engaging the world's brightest researchers
            to develop proposals to change how society looks at Alzheimer's disease.
          </Text>
        </div>

        <div>
          <Heading level={3} className="mb-4">Named After Oskar Fischer</Heading>
          <Text className="mb-4">{PRIZE_INFO.namedAfterBio}</Text>
          <Text>
            Fischer argued against the distinction between 'presenile' and 'senile' dementia, viewing them as a
            single clinicopathological entity. His focus on the plaque as a site of active neuronal degeneration,
            rather than passive deposition, foreshadowed modern understanding of the disease.
          </Text>
        </div>

        <div>
          <Heading level={3} className="mb-6">Prize Tiers</Heading>
          <GridSection columns={3} gap="md">
            {Object.entries(TIER_INFO).map(([tier, info]) => (
              <TierInfoCard
                key={tier}
                tier={tier as 'gold' | 'silver' | 'bronze'}
                label={info.label}
                description={info.description}
              />
            ))}
          </GridSection>
        </div>
      </div>
    </PageLayout>
  );

  /* ---------------------------------------------------------------------------
     Participants Page
     --------------------------------------------------------------------------- */
  const ParticipantsPage = () => (
    <PageLayout>
      <SectionHeader
        title="Prize Winners"
        subtitle="The 10 researchers whose hypotheses are reshaping Alzheimer's disease research."
      />

      {(['gold', 'silver', 'bronze'] as const).map((tier) => {
        const winners = getWinnersByTier(tier);
        const tierInfo = TIER_INFO[tier];
        return (
          <div key={tier} className="mb-12">
            <TierSectionHeader tier={tier} label={tierInfo.label} />
            <div className="space-y-4">
              {winners.map((winner) => (
                <WinnerCard
                  key={winner.id}
                  name={winner.name}
                  institution={winner.institution}
                  country={winner.country}
                  hypothesis={winner.hypothesis}
                  hypothesisSummary={winner.hypothesisSummary}
                  tier={tier}
                  onClick={() => navigateToParticipant(winner.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </PageLayout>
  );

  /* ---------------------------------------------------------------------------
     Participant Detail Page
     --------------------------------------------------------------------------- */
  const ParticipantDetailPage = () => {
    const winner = selectedWinnerId ? getWinnerById(selectedWinnerId) : null;

    if (!winner) {
      return (
        <PageLayout className="text-center">
          <Text className="text-ink-muted mb-4">Winner not found.</Text>
          <Button variant="link" onClick={() => setView(ViewState.PARTICIPANTS)}>
            Back to Participants
          </Button>
        </PageLayout>
      );
    }

    return (
      <PageLayout>
        <BackButton onClick={() => setView(ViewState.PARTICIPANTS)} className="mb-8">
          Back to All Winners
        </BackButton>

        <TierBadge tier={winner.tier} className="mb-4" />

        <Heading level={1} className="mb-2">{winner.name}</Heading>
        <Text variant="lead" className="mb-1">{winner.institution}</Text>
        <Text variant="small" className="text-ink-muted mb-8">{winner.country}</Text>

        <div className="bg-paper-warm p-8 rounded-lg mb-8">
          <Heading level={3} className="mb-4">{winner.hypothesis}</Heading>
          <Text variant="body-lg">{winner.hypothesisSummary}</Text>
        </div>

        <div>
          <Heading level={3} className="mb-4">About This Hypothesis</Heading>
          <Text>
            Additional analysis and synthesis of this hypothesis will be added as the site develops.
            Check back for detailed breakdowns, related papers, and connections to other prize-winning hypotheses.
          </Text>
        </div>
      </PageLayout>
    );
  };

  /* ---------------------------------------------------------------------------
     Library Page (Coming Soon)
     --------------------------------------------------------------------------- */
  const LibraryPage = () => (
    <PageLayout>
      <SectionHeader
        title="The Library"
        subtitle="Primary sources and research papers from prize participants."
      />
      <ComingSoonCard
        icon={<BookOpen size={32} />}
        title="Coming Soon"
        description="The library will be populated with research papers, literature reviews, and synthesis documents from the prize participants."
      />
    </PageLayout>
  );

  /* ---------------------------------------------------------------------------
     Synthesis Page (Coming Soon)
     --------------------------------------------------------------------------- */
  const SynthesisPage = () => (
    <PageLayout>
      <SectionHeader
        title="Synthesis"
        subtitle="Cross-cutting analysis of how these hypotheses connect and complement each other."
      />
      <ComingSoonCard
        icon={<Lightbulb size={32} />}
        title="Coming Soon"
        description="This section will explore the connections between different hypotheses, identify common themes, and present a unified view of the evolving understanding of Alzheimer's disease."
      />
    </PageLayout>
  );

  /* ---------------------------------------------------------------------------
     About Page
     --------------------------------------------------------------------------- */
  const AboutPage = () => (
    <PageLayout>
      <SectionHeader
        title="About This Site"
        subtitle="A living literature review and synthesis of the 2022 Oskar Fischer Prize."
      />

      <div className="space-y-8">
        <Text variant="body-lg">
          This website serves as a companion to{' '}
          <a href="https://adultcognitivedisease.org" className="text-accent hover:underline">
            AdultCognitiveDisease.org
          </a>
          , focused specifically on the high-quality hypothesis generators who participated in the 2022
          Oskar Fischer Prize and seeded the knowledge base for understanding Alzheimer's disease.
        </Text>

        <div>
          <Heading level={3} className="mb-4">Our Mission</Heading>
          <Text>
            To present a comprehensive, accessible synthesis of the innovative hypotheses that emerged from
            the Oskar Fischer Prize competition, exploring how these diverse ideas might connect and inform
            future research directions.
          </Text>
        </div>

        {/* 100-Year Vision Section */}
        <div className="bg-paper-warm p-8 rounded-lg border-l-4 border-accent">
          <Text variant="caption" className="text-accent uppercase tracking-wider font-ui font-semibold mb-2">
            The Long View
          </Text>
          <Heading level={3} className="mb-4">Building for the Future</Heading>
          <Text variant="body-lg" className="text-ink-light">
            Like National Instruments' legendary 100-year plan, this prize invests in ideas that will
            shape understanding for generations. The Oskar Fischer Prize represents a commitment to
            long-term scientific discovery over short-term gains—empowering researchers with the freedom
            to pursue bold, transformative hypotheses about Alzheimer's disease.
          </Text>
        </div>

        <div>
          <Heading level={3} className="mb-4">Stay Connected</Heading>
          <EmailSignupForm source="about" />
        </div>
      </div>
    </PageLayout>
  );

  /* ---------------------------------------------------------------------------
     Content Router
     --------------------------------------------------------------------------- */
  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return <HomePage />;
      case ViewState.PRIZE_OVERVIEW:
        return <PrizeOverviewPage />;
      case ViewState.PARTICIPANTS:
        return <ParticipantsPage />;
      case ViewState.PARTICIPANT_DETAIL:
        return <ParticipantDetailPage />;
      case ViewState.LIBRARY:
        return <LibraryPage />;
      case ViewState.SYNTHESIS:
        return <SynthesisPage />;
      case ViewState.ABOUT:
        return <AboutPage />;
      default:
        return <div className="p-8">Page not found</div>;
    }
  };

  /* ---------------------------------------------------------------------------
     Main Render
     --------------------------------------------------------------------------- */
  return (
    <div className="flex h-screen w-screen bg-paper overflow-hidden flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-divider bg-paper z-50 relative shrink-0">
        <div className="font-display text-h3 text-accent font-medium leading-none">
          Oskar Fischer<br />Prize
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 text-ink-light hover:bg-paper-warm rounded transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-paper-dark md:hidden pt-[73px]
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <Sidebar />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar />
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
