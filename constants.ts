import { PrizeWinner, PrizeInfo, LibraryItem } from './types';

/* =============================================================================
   Inspirational Quotes (James Truchard / NI Philosophy)
   ============================================================================= */

export const INSPIRATION_QUOTES = [
  {
    text: "Accelerate productivity, innovation, and discovery.",
    attribution: "National Instruments Mission",
  },
  {
    text: "Innovation is about taking risks, being curious, and not being afraid to fail.",
    attribution: "James Truchard, NI Co-founder",
  },
  {
    text: "We've built a culture where young people know they can have an immediate impact.",
    attribution: "James Truchard",
  },
  {
    text: "I wanted to do for test and measurement what the spreadsheet did for financial analysis.",
    attribution: "James Truchard",
  },
];

export const FEATURED_QUOTE = INSPIRATION_QUOTES[1]; // "Innovation is about taking risks..."

export const MISSION_STATEMENT = INSPIRATION_QUOTES[0]; // "Accelerate productivity..."

export const PRIZE_INFO: PrizeInfo = {
  name: 'Oskar Fischer Prize',
  year: 2022,
  totalPrize: '$4 Million',
  organizer: 'University of Texas at San Antonio (UTSA)',
  description: 'An international competition to expand society\'s understanding of the causes of Alzheimer\'s disease. The world\'s largest prize of its kind, challenging researchers to develop proposals that change how society looks at Alzheimer\'s disease.',
  namedAfter: 'Oskar Fischer',
  namedAfterBio: 'Oskar Fischer (1876-1942) was a Jewish pioneer in neuroscience who studied dementia at the same time as Alois Alzheimer. His contributions to early dementia research were largely overlooked until recently.',
};

export const PRIZE_WINNERS: PrizeWinner[] = [
  // Gold Prize Winners ($500,000 each)
  {
    id: 'area-gomez',
    name: 'Estela Area-Gomez',
    institution: 'Columbia University / Centro de Investigaciones Biologicas Margarita Salas, CSIC',
    country: 'USA / Spain',
    hypothesis: 'Lipid Disorder / C99 Cholesterol Sensor',
    hypothesisSummary: 'Alzheimer\'s disease is fundamentally a lipid disorder. The amyloid precursor protein fragment C99 functions as a cholesterol sensor, and its dysregulation disrupts cholesterol metabolism and mitochondrial-endoplasmic reticulum membrane contact sites.',
    tier: 'gold',
    prizeAmount: 500000,
  },
  {
    id: 'frost',
    name: 'Bess Frost',
    institution: 'UT Health San Antonio',
    country: 'USA',
    hypothesis: 'Tau-Induced DNA Damage & Chromatin Restructuring',
    hypothesisSummary: 'Pathogenic forms of tau protein damage the three-dimensional packaging of DNA, compromising neuronal identity and cellular function. This chromatin restructuring triggers cell death in affected brain regions.',
    tier: 'gold',
    prizeAmount: 500000,
  },
  {
    id: 'nixon',
    name: 'Ralph Nixon',
    institution: 'Nathan S. Kline Institute for Psychiatric Research',
    country: 'USA',
    hypothesis: 'Lysosomal/Autophagy Network Failure',
    hypothesisSummary: 'Alzheimer\'s disease stems from dysfunction in the brain\'s endosomal-lysosomal and autophagy network - the cellular waste-clearing system. This failure causes abnormal proteins to accumulate and become neurotoxic.',
    tier: 'gold',
    prizeAmount: 500000,
  },
  {
    id: 'abbate',
    name: 'Carlo Abbate',
    institution: 'IRCCS Fondazione Don Carlo Gnocchi',
    country: 'Italy',
    hypothesis: 'Adult Neurogenesis Theory',
    hypothesisSummary: 'Alzheimer\'s disease originates in neural stem cells within adult neurogenesis niches. Factors inherent to neurogenesis and migration trigger pathological tau hyperphosphorylation, amplified by amyloid pathology.',
    tier: 'gold',
    prizeAmount: 500000,
  },
  // Silver Prize Winners ($400,000 each)
  {
    id: 'moosmann',
    name: 'Bernd Moosmann',
    institution: 'Johannes Gutenberg University',
    country: 'Germany',
    hypothesis: 'Membrane Protein Oxidation',
    hypothesisSummary: 'The aged human cortex experiences specific and detrimental membrane protein oxidation. This oxidative stress on integral membrane proteins, distinct from lipid peroxidation alone, drives neurodegeneration.',
    tier: 'silver',
    prizeAmount: 400000,
  },
  {
    id: 'weaver',
    name: 'Donald Weaver',
    institution: 'University of Toronto',
    country: 'Canada',
    hypothesis: 'Autoimmune Disorder / Innate Immunity',
    hypothesisSummary: 'Alzheimer\'s disease is a disorder of innate immunity regulated by amino acid metabolic pathways. This comprehensive mechanistic model integrates systems biology, molecular modeling, and neuroscience.',
    tier: 'silver',
    prizeAmount: 400000,
  },
  // Bronze Prize Winners ($300,000 each)
  {
    id: 'barron',
    name: 'Annelise E. Barron',
    institution: 'Stanford University',
    country: 'USA',
    hypothesis: 'Antimicrobial Peptide Defense',
    hypothesisSummary: 'Amyloid-beta may be a natural antimicrobial peptide. The human cathelicidin LL-37 can bind and detoxify A-beta, suggesting stimulation of antimicrobial defenses as a therapeutic strategy.',
    tier: 'bronze',
    prizeAmount: 300000,
  },
  {
    id: 'gouras',
    name: 'Gunnar K. Gouras',
    institution: 'Lund University',
    country: 'Sweden',
    hypothesis: 'Intraneuronal Amyloid-Beta Accumulation',
    hypothesisSummary: 'Alzheimer\'s disease begins with intraneuronal accumulation of amyloid-beta 42 at synapses and endosomes. This initiates synaptic dysfunction before extracellular plaque formation occurs.',
    tier: 'bronze',
    prizeAmount: 300000,
  },
  {
    id: 'john',
    name: 'Varghese John',
    institution: 'University of California, Los Angeles',
    country: 'USA',
    hypothesis: 'Gamma Oscillation Enhancement',
    hypothesisSummary: 'Enhancing gamma oscillations - natural brain waves involved in memory - represents a novel therapeutic approach. This shifts focus from enzyme inhibition to restoring healthy brain electrical activity.',
    tier: 'bronze',
    prizeAmount: 300000,
  },
  {
    id: 'swerdlow',
    name: 'Russell Swerdlow',
    institution: 'University of Kansas Medical Center',
    country: 'USA',
    hypothesis: 'Mitochondrial Cascade',
    hypothesisSummary: 'In sporadic Alzheimer\'s, inherited mitochondrial function determines disease susceptibility. Mitochondrial decline beyond an aging threshold initiates the disease cascade, with amyloid as a downstream effect.',
    tier: 'bronze',
    prizeAmount: 300000,
  },
];

// Library items - to be populated as papers are added
export const LIBRARY_ITEMS: LibraryItem[] = [
  // Placeholder structure for when papers are added
];

// Helper function to get winners by tier
export const getWinnersByTier = (tier: 'gold' | 'silver' | 'bronze'): PrizeWinner[] => {
  return PRIZE_WINNERS.filter(winner => winner.tier === tier);
};

// Helper function to get winner by ID
export const getWinnerById = (id: string): PrizeWinner | undefined => {
  return PRIZE_WINNERS.find(winner => winner.id === id);
};

// Prize tier display info
export const TIER_INFO = {
  gold: {
    label: 'Gold',
    amount: '$500,000',
    color: 'amber',
    description: 'Highest recognition for groundbreaking hypotheses',
  },
  silver: {
    label: 'Silver',
    amount: '$400,000',
    color: 'slate',
    description: 'Recognition for innovative theoretical contributions',
  },
  bronze: {
    label: 'Bronze',
    amount: '$300,000',
    color: 'orange',
    description: 'Recognition for promising novel approaches',
  },
};

// Site navigation structure
export const NAV_ITEMS = [
  { label: 'Home', view: 'HOME' },
  { label: 'The Prize', view: 'PRIZE_OVERVIEW' },
  { label: 'Participants', view: 'PARTICIPANTS' },
  { label: 'Library', view: 'LIBRARY' },
  { label: 'Synthesis', view: 'SYNTHESIS' },
  { label: 'Blog', view: 'BLOG' },
  { label: 'About', view: 'ABOUT' },
];
