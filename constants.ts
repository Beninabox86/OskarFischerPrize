import { PrizeWinner, PrizeInfo, LibraryItem, SynthesisPaper } from './types';

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

/* =============================================================================
   Synthesis Papers - DeepResearch Reviews of Prize Entrants
   ============================================================================= */

const SYNTHESIS_FOLDER = '/COMPLETED - DeepResearch Reviews of Prize Entrants/';

export const SYNTHESIS_PAPERS: SynthesisPaper[] = [
  {
    id: 'alan-snow',
    researcher: 'Alan Snow',
    title: 'The Heparan Sulfate Proteoglycan Unifying Hypothesis',
    filename: 'Alan Snow_Evaluating Alzheimer\'s Hypothesis_ CAC Framework.pdf',
  },
  {
    id: 'annelise-barron',
    researcher: 'Annelise Barron',
    title: 'Antimicrobial Peptide Defense & Disease Pathogenesis',
    filename: 'Annellise Barron_PhD Thesis_ Alzheimer\'s Disease Pathogenesis Review.pdf',
    winnerId: 'barron',
  },
  {
    id: 'ari-rappoport',
    researcher: 'Ari Rappoport',
    title: 'Hypothesis Thesis Evaluation',
    filename: 'Ari Rappoport_Alzheimer\'s Hypothesis Thesis Evaluation.pdf',
  },
  {
    id: 'ashley-bush',
    researcher: 'Ashley Bush',
    title: 'Ferroptosis Theory of Alzheimer\'s Disease',
    filename: 'Ashley Bush_Evaluating Alzheimer\'s Ferroptosis Theory.pdf',
  },
  {
    id: 'bess-frost',
    researcher: 'Bess Frost',
    title: 'Tau-Induced DNA Damage & Chromatin Restructuring',
    filename: 'Bess Frost_Thesis Evaluation of Alzheimer\'s Hypothesis.pdf',
    winnerId: 'frost',
  },
  {
    id: 'brenda-aske',
    researcher: 'Brenda Aske',
    title: 'COIL vs. Convergent Autophagic Collapse',
    filename: 'Brenda Aske_Alzheimer\'s Hypothesis_ COIL vs. CAC.pdf',
  },
  {
    id: 'brian-head',
    researcher: 'Brian Head',
    title: 'Hypothesis Thesis Review',
    filename: 'Brian Head_Alzheimer\'s Hypothesis Thesis Review.pdf',
  },
  {
    id: 'carina-clawson',
    researcher: 'Carina Clawson',
    title: 'Evaluating Hypothesis via CAC Framework',
    filename: 'Carina Clawson_Evaluating Alzheimer\'s Hypothesis_ CAC Framework.pdf',
  },
  {
    id: 'charles-greenblatt',
    researcher: 'Charles Greenblatt',
    title: 'BCG & Alzheimer\'s Hypothesis',
    filename: 'Charles Greenblatt_Evaluating Alzheimer\'s Hypothesis_ BCG.pdf',
  },
  {
    id: 'daniel-michaelson',
    researcher: 'Daniel Michaelson',
    title: 'Hypothesis Thesis Generation',
    filename: 'Daniel Michaelson_Alzheimer\'s Hypothesis Thesis Generation.pdf',
  },
  {
    id: 'donald-weaver',
    researcher: 'Donald Weaver',
    title: 'Autoimmune Disorder & Innate Immunity',
    filename: 'Donald Weaver_Alzheimer\'s Hypothesis Thesis Evaluation.pdf',
    winnerId: 'weaver',
  },
  {
    id: 'erwin-roggen',
    researcher: 'Erwin Roggen',
    title: 'Hypothesis Generation Evaluation',
    filename: 'Erwin Roggen_Evaluating Alzheimer\'s Hypothesis Generation.pdf',
  },
  {
    id: 'estela-area-gomez',
    researcher: 'Estela Area-Gomez',
    title: 'Lipid Disorder & C99 Cholesterol Sensor',
    filename: 'Estela Area-Gomez_Evaluating Alzheimer\'s Hypothesis for Prize.pdf',
    winnerId: 'area-gomez',
  },
  {
    id: 'gunnar-gouras',
    researcher: 'Gunnar Gouras',
    title: 'Intraneuronal Amyloid-Beta Accumulation',
    filename: 'Gunnar Gouras_Alzheimer\'s Hypothesis Paper Review.pdf',
    winnerId: 'gouras',
  },
  {
    id: 'jeevan-pradhan',
    researcher: 'Jeevan Pradhan',
    title: 'Disease Hypothesis Thesis Generation',
    filename: 'Jeevan Pradhan_Alzheimer\'s Disease Hypothesis Thesis Generation.pdf',
  },
  {
    id: 'li-huei-tsai',
    researcher: 'Li-Huei Tsai',
    title: 'Hypothesis Thesis Generation',
    filename: 'Li-Huei Tsai_Alzheimer\'s Hypothesis Thesis Generation.pdf',
  },
  {
    id: 'maxim-shokhirev',
    researcher: 'Maxim Shokhirev',
    title: 'Thesis Review: Aging & Alzheimer\'s Hypothesis',
    filename: 'Maxim Shokhirev_Thesis Review_ Shokhirev\'s Alzheimer\'s Hypothesis.pdf',
  },
  {
    id: 'michal-schwartz-1',
    researcher: 'Michal Schwartz',
    title: 'Neuroimmunology & Hypothesis Thesis Generation',
    filename: 'Michal Schwartz_Alzheimer\'s Hypothesis Thesis Generation (1).pdf',
  },
  {
    id: 'michal-schwartz-2',
    researcher: 'Michal Schwartz',
    title: 'Evaluating Hypothesis via CAC Framework',
    filename: 'Michal Schwartz_Evaluating Alzheimer\'s Hypothesis_ CAC Framework.pdf',
  },
  {
    id: 'pamela-maher',
    researcher: 'Pamela Maher',
    title: 'Evaluating Hypotheses via CAC Framework',
    filename: 'Pamela Maher_Evaluating Alzheimer\'s Hypotheses_ CAC Framework.pdf',
  },
  {
    id: 'paul-cox',
    researcher: 'Paul Cox',
    title: 'Evaluating Hypothesis via CAC Framework',
    filename: 'Paul Cox_Evaluating Alzheimer\'s Hypothesis_ CAC Framework.pdf',
  },
  {
    id: 'ralph-nixon',
    researcher: 'Ralph Nixon',
    title: 'Autophagic Collapse & Lysosomal Network Failure',
    filename: 'Ralph Nixon_Alzheimer\'s Hypothesis_ Autophagic Collapse.pdf',
    winnerId: 'nixon',
  },
  {
    id: 'richelle-cutler',
    researcher: 'Richelle Cutler',
    title: 'Disease Hypothesis Generation',
    filename: 'Richelle Cutler_Alzheimer\'s Disease Hypothesis Generation.pdf',
  },
  {
    id: 'russell-swerdlow',
    researcher: 'Russell Swerdlow',
    title: 'Mitochondrial Cascade & CAC',
    filename: 'Russell Swerdlow_Alzheimer\'s Hypothesis_ CAC and Mitochondria.pdf',
    winnerId: 'swerdlow',
  },
  {
    id: 'ruth-itzhaki',
    researcher: 'Ruth Itzhaki',
    title: 'Hypothesis Review & Evaluation',
    filename: 'Ruth Itzhaki_Alzheimer\'s Hypothesis Review and Evaluation.pdf',
  },
  {
    id: 'stephen-dominy',
    researcher: 'Stephen Dominy',
    title: 'CAC & Dominy\'s Infectious Hypothesis',
    filename: 'Stephen Dominy_Alzheimer\'s Thesis_ CAC and Dominy.pdf',
  },
  {
    id: 'zaven-khachaturian',
    researcher: 'Zaven S. Khachaturian',
    title: 'Hypothesis Thesis Evaluation',
    filename: 'Zaven S. Khachaturian_Alzheimer\'s Hypothesis Thesis Evaluation.pdf',
  },
  {
    id: 'zhen-huang',
    researcher: 'Zhen Huang',
    title: 'Evaluating Hypothesis via CAC Framework',
    filename: 'Zhen Huang_Evaluating Alzheimer\'s Hypothesis_ CAC Framework.pdf',
  },
];

export const getSynthesisPaperUrl = (filename: string): string => {
  return SYNTHESIS_FOLDER + filename;
};

export const getSynthesisPapersByWinnerStatus = () => {
  const prizeWinnerPapers = SYNTHESIS_PAPERS.filter(p => p.winnerId);
  const otherEntrantPapers = SYNTHESIS_PAPERS.filter(p => !p.winnerId);
  return { prizeWinnerPapers, otherEntrantPapers };
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
