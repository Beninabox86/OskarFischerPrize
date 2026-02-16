import React, { useState, useRef, useEffect } from 'react';
import Footer from './components/Footer';
import EmailSignupForm from './components/EmailSignupForm';
import { ViewState } from './types';
import { PRIZE_INFO, TIER_INFO, NAV_ITEMS, getWinnersByTier, getWinnerById, FEATURED_QUOTE, MISSION_STATEMENT, SYNTHESIS_PAPERS, getSynthesisPaperUrl, getSynthesisPapersByWinnerStatus } from './constants';
import { Menu, X, Award, BookOpen, Lightbulb, ChevronRight, FileText, Download, Lock } from 'lucide-react';
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
     Top Navigation Component
     --------------------------------------------------------------------------- */
  const TopNav = () => (
    <header className="w-full bg-paper-dark text-white relative z-50">
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-prize-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <h1 className="font-display text-xl md:text-2xl text-white font-semibold uppercase tracking-wide">
              <span className="gold-text">Oskar Fischer</span> Prize
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view as ViewState)}
                className={`
                  px-4 py-2 font-ui text-small uppercase tracking-wider transition-all duration-200
                  ${view === item.view
                    ? 'text-prize-gold-light'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper-dark border-t border-white/10 shadow-xl">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view as ViewState);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 font-ui text-small uppercase tracking-wider transition-all duration-200
                  ${view === item.view
                    ? 'text-prize-gold-light bg-prize-gold/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );

  /* ---------------------------------------------------------------------------
     Home Page
     --------------------------------------------------------------------------- */
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero - Brand Art is the header */}
      <HeroSection size="lg">
        <div className="text-center pt-4">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 bg-prize-gold/20 text-prize-gold-light px-4 py-2 angular-badge text-caption font-ui font-semibold uppercase tracking-wider mb-6 border border-prize-gold/30">
            <Award size={16} className="rotate-12" />
            <span>Living Literature Review & Synthesis</span>
          </div>

          {/* Description */}
          <Text variant="lead" className="text-white/90 max-w-2xl mx-auto mb-8">
            {PRIZE_INFO.description}
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setView(ViewState.PARTICIPANTS)}
              className="bg-prize-gold text-paper-dark border-2 border-prize-gold shadow-lg hover:bg-prize-gold-light hover:border-prize-gold-light transition-all"
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
          <div className="border-t border-prize-gold/30 pt-6">
            <blockquote className="text-center">
              <p className="text-body font-body italic text-white/80 mb-2">
                "{FEATURED_QUOTE.text}"
              </p>
              <cite className="text-small font-ui text-prize-gold-light/70 not-italic">
                — {FEATURED_QUOTE.attribution}
              </cite>
            </blockquote>
          </div>
        </div>
      </HeroSection>

      {/* Stats - flows seamlessly from hero feather */}
      <Section background="warm" padding="md" className="-mt-px">
        <div className="max-w-4xl mx-auto">
          <GridSection columns={4} gap="md">
            <StatCard value="10" label="Prize Winners" />
            <StatCard value="4" label="Gold Recipients" variant="gold" />
            <StatCard value="2" label="Silver Recipients" variant="silver" />
            <StatCard value="4" label="Bronze Recipients" variant="bronze" />
          </GridSection>
        </div>
      </Section>

      {/* Circuit Divider */}
      <div className="circuit-divider bg-paper" />

      {/* Featured Winners */}
      <ContentSection padding="lg">
        <div className="text-center mb-10 section-header-brand-center">
          <Heading level={2}>
            <span className="gold-text">Gold</span> Prize Winners
          </Heading>
        </div>
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
        <div className="max-w-2xl mx-auto text-center relative">
          {/* Decorative circuit traces */}
          <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block" />
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent hidden md:block" />

          <Heading level={2} className="text-white mb-4">
            <span className="gold-text">Stay</span> Updated
          </Heading>
          <Text variant="body" className="text-white/70 mb-8">
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
     Synthesis Page
     --------------------------------------------------------------------------- */
  const SynthesisPage = () => {
    const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('synthesis-unlocked') === 'true');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'oskar') {
        setIsUnlocked(true);
        sessionStorage.setItem('synthesis-unlocked', 'true');
        setError(false);
      } else {
        setError(true);
      }
    };

    if (!isUnlocked) {
      return (
        <PageLayout>
          <div className="max-w-md mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent mb-6 rotate-45">
              <Lock size={28} className="-rotate-45" />
            </div>
            <Heading level={2} className="mb-3">Protected Content</Heading>
            <Text className="text-ink-light mb-8">
              Enter the password to access the synthesis reviews.
            </Text>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password"
                className={`w-full px-4 py-3 border ${error ? 'border-red-400 bg-red-50/50' : 'border-divider'} bg-white font-body text-body text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors`}
                autoFocus
              />
              {error && (
                <Text variant="small" className="text-red-500">
                  Incorrect password. Please try again.
                </Text>
              )}
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-prize-gold text-paper-dark border-2 border-prize-gold hover:bg-prize-gold-light hover:border-prize-gold-light transition-all"
              >
                Unlock
              </Button>
            </form>
          </div>
        </PageLayout>
      );
    }

    const { prizeWinnerPapers, otherEntrantPapers } = getSynthesisPapersByWinnerStatus();

    const PaperRow: React.FC<{ paper: typeof SYNTHESIS_PAPERS[number] }> = ({ paper }) => {
      const winner = paper.winnerId ? getWinnerById(paper.winnerId) : null;
      return (
        <a
          href={getSynthesisPaperUrl(paper.filename)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 p-5 bg-white border border-divider/60 shadow-sm transition-all duration-200 hover:border-accent hover:shadow-md group angular-accent"
          style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-10 h-10 flex items-center justify-center bg-accent/10 text-accent rotate-45">
              <FileText size={18} className="-rotate-45" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-body text-ink group-hover:text-accent transition-colors uppercase tracking-wide mb-1">
              {paper.researcher}
            </h3>
            <p className="text-small font-body text-ink-light mb-1">{paper.title}</p>
            {winner && (
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 angular-badge text-caption font-ui font-semibold uppercase tracking-wider ${
                winner.tier === 'gold' ? 'bg-gold-bg text-gold border border-gold/30' :
                winner.tier === 'silver' ? 'bg-silver-bg text-silver border border-silver/30' :
                'bg-bronze-bg text-bronze border border-bronze/30'
              }`}>
                <span className={`w-1.5 h-1.5 rotate-45 ${winner.tier === 'gold' ? 'bg-gradient-to-br from-prize-gold-light to-prize-gold-dark' : 'bg-current'}`} />
                {winner.tier.charAt(0).toUpperCase() + winner.tier.slice(1)} Prize Winner
              </span>
            )}
          </div>
          <div className="flex-shrink-0 mt-1">
            <Download size={18} className="text-ink-muted group-hover:text-accent transition-colors" />
          </div>
        </a>
      );
    };

    return (
      <PageLayout>
        <SectionHeader
          title="Synthesis"
          subtitle="Critical reviews and evaluations of Alzheimer's disease hypotheses submitted to the Oskar Fischer Prize."
        />

        <Text variant="body-lg" className="mb-10">
          These DeepResearch reviews evaluate each entrant's hypothesis against rigorous criteria including
          scientific rigor, novelty, reproducibility, clinical potential, and evidence quality. Click any
          paper to read the full review.
        </Text>

        {/* Prize Winner Reviews */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award size={20} className="text-prize-gold" />
            <Heading level={3} className="uppercase tracking-wide">
              Prize Winner Reviews
            </Heading>
          </div>
          <div className="space-y-3">
            {prizeWinnerPapers.map((paper) => (
              <PaperRow key={paper.id} paper={paper} />
            ))}
          </div>
        </div>

        {/* Other Entrant Reviews */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={20} className="text-accent" />
            <Heading level={3} className="uppercase tracking-wide">
              Other Entrant Reviews
            </Heading>
          </div>
          <div className="space-y-3">
            {otherEntrantPapers.map((paper) => (
              <PaperRow key={paper.id} paper={paper} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center pt-8 border-t border-divider">
          <div className="inline-flex items-center gap-2 text-ink-muted">
            <FileText size={18} />
            <Text variant="small" className="font-ui uppercase tracking-wider">
              {SYNTHESIS_PAPERS.length} reviews published
            </Text>
          </div>
        </div>
      </PageLayout>
    );
  };

  /* ---------------------------------------------------------------------------
     Blog Page (Coming Soon)
     --------------------------------------------------------------------------- */
  const BlogPage = () => {
    // Placeholder blog posts to preview the design
    const placeholderPosts = [
      {
        category: 'Research Update',
        title: 'Convergent Themes Across Prize-Winning Hypotheses',
        excerpt: 'An analysis of how mitochondrial dysfunction, lipid metabolism, and protein clearance mechanisms intersect across multiple prize-winning theories.',
        date: 'Coming Soon',
        featured: true,
      },
      {
        category: 'Interview',
        title: 'In Conversation with Dr. Ralph Nixon on Lysosomal Dysfunction',
        excerpt: 'A deep dive into the autophagy-lysosomal network and its implications for therapeutic development.',
        date: 'Coming Soon',
      },
      {
        category: 'Commentary',
        title: 'Beyond Amyloid: The Prize\'s Challenge to Conventional Thinking',
        excerpt: 'How the Oskar Fischer Prize encouraged researchers to look beyond the dominant amyloid cascade hypothesis.',
        date: 'Coming Soon',
      },
      {
        category: 'Literature Review',
        title: 'The Mitochondrial Cascade: Evidence and Implications',
        excerpt: 'Reviewing the supporting literature for Dr. Swerdlow\'s mitochondrial hypothesis of sporadic Alzheimer\'s disease.',
        date: 'Coming Soon',
      },
    ];

    const featuredPost = placeholderPosts.find(p => p.featured);
    const recentPosts = placeholderPosts.filter(p => !p.featured);

    return (
      <div className="min-h-screen">
        {/* Atmospheric Header with Neural Imagery */}
        <div className="relative overflow-hidden">
          {/* Hero art - cropped portion showing abstract neural patterns */}
          <div className="relative h-48 md:h-64 lg:h-72">
            <img
              src="/hero-art.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-110"
              aria-hidden="true"
            />
            {/* Atmospheric overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-paper-dark/40 via-paper-dark/60 to-paper" />
            <div className="absolute inset-0 bg-gradient-to-r from-paper-dark/30 via-transparent to-paper-dark/30" />
            {/* Subtle accent pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(184, 150, 12, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 80% 30%, rgba(184, 150, 12, 0.07) 0%, transparent 40%),
                               radial-gradient(circle at 60% 80%, rgba(184, 150, 12, 0.05) 0%, transparent 35%)`
            }} />
          </div>

          {/* Header content floating over the fade */}
          <div className="relative -mt-20 md:-mt-24 pb-8 z-10">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <div className="inline-flex items-center gap-2 bg-prize-gold/20 text-prize-gold-light px-3 py-1.5 angular-badge text-caption font-ui font-semibold uppercase tracking-wider mb-4 border border-prize-gold/30">
                <FileText size={14} />
                <span>Perspectives & Analysis</span>
              </div>
              <Heading level={1} className="text-ink mb-3">Blog</Heading>
              <Text variant="lead" className="text-ink-light max-w-2xl">
                Commentary, analysis, and updates on Alzheimer's disease research from the prize community.
              </Text>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
          {/* Featured Article */}
          {featuredPost && (
            <article
              className="mb-10 p-8 bg-paper-warm border-l-4 border-prize-gold relative group cursor-not-allowed opacity-75"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            >
              <div className="absolute top-4 right-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-prize-gold/20 text-prize-gold angular-badge text-caption font-ui font-semibold uppercase tracking-wider">
                  Featured
                </span>
              </div>
              <Text variant="caption" className="text-accent uppercase tracking-wider font-ui font-semibold mb-2">
                {featuredPost.category}
              </Text>
              <Heading level={2} className="mb-3 group-hover:text-accent transition-colors">
                {featuredPost.title}
              </Heading>
              <Text variant="body-lg" className="text-ink-light mb-4 max-w-3xl">
                {featuredPost.excerpt}
              </Text>
              <Text variant="small" className="text-ink-muted font-ui">
                {featuredPost.date}
              </Text>
            </article>
          )}

          {/* Recent Articles Grid */}
          <div className="mb-10">
            <Heading level={3} className="mb-6 uppercase tracking-wide text-ink-muted">
              Recent Articles
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <article
                  key={index}
                  className="p-6 bg-white border border-divider/60 shadow-sm relative cursor-not-allowed opacity-75 angular-accent"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                >
                  <Text variant="caption" className="text-accent uppercase tracking-wider font-ui font-semibold mb-2">
                    {post.category}
                  </Text>
                  <Heading level={4} className="mb-2 text-h4">
                    {post.title}
                  </Heading>
                  <Text variant="small" className="text-ink-light mb-4 line-clamp-3">
                    {post.excerpt}
                  </Text>
                  <Text variant="caption" className="text-ink-muted font-ui">
                    {post.date}
                  </Text>
                </article>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center py-8 border-t border-divider">
            <div className="inline-flex items-center gap-2 text-ink-muted">
              <FileText size={20} />
              <Text variant="small" className="font-ui uppercase tracking-wider">
                Articles publishing soon — check back for updates
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          <a href="https://adultcognitivedisease.com" className="text-accent hover:underline">
            AdultCognitiveDisease.com
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
        <div className="section-warm-blend p-8 relative content-card-brand" style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
          {/* Gold left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-prize-gold via-prize-gold-dark to-transparent" />
          <div className="pl-4">
            <Text variant="caption" className="text-prize-gold uppercase tracking-wider font-ui font-semibold mb-2">
              The Long View
            </Text>
            <Heading level={3} className="mb-4">Building for the Future</Heading>
            <Text variant="body-lg" className="text-ink-light">
              Like James Truchard's legendary 100-year plan at National Instruments, this prize invests in ideas that will
              shape understanding for generations. The Oskar Fischer Prize represents a commitment to
              long-term scientific discovery over short-term gains—empowering researchers with the freedom
              to pursue bold, transformative hypotheses about Alzheimer's disease.
            </Text>
          </div>
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
      case ViewState.BLOG:
        return <BlogPage />;
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
    <div className="flex flex-col h-screen w-screen bg-paper overflow-hidden">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        {renderContent()}
        {view !== ViewState.HOME && <Footer />}
      </main>
    </div>
  );
};

export default App;
