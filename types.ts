export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PRIZE_OVERVIEW = 'PRIZE_OVERVIEW',
  PARTICIPANTS = 'PARTICIPANTS',
  PARTICIPANT_DETAIL = 'PARTICIPANT_DETAIL',
  LIBRARY = 'LIBRARY',
  SYNTHESIS = 'SYNTHESIS',
}

export type PrizeTier = 'gold' | 'silver' | 'bronze';

export interface PrizeWinner {
  id: string;
  name: string;
  institution: string;
  country: string;
  hypothesis: string;
  hypothesisSummary: string;
  tier: PrizeTier;
  prizeAmount: number;
  paperFilename?: string;
  deckFilename?: string;
  profileImage?: string;
  bio?: string;
}

export type AudienceSegment =
  | 'researcher'
  | 'pharma'
  | 'healthcare'
  | 'investor'
  | 'patient_caregiver'
  | 'patient_advocate'
  | 'general'
  | '';

export interface SignupData {
  email: string;
  audienceSegment: AudienceSegment;
  timestamp: string;
  source: 'about' | 'footer' | 'home';
}

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; text: string; items: string[] }
  | { type: 'pdf-link'; text: string; file: string; deck?: string };

export interface LibraryItem {
  id: string;
  displayTitle: string;
  title: string;
  author: string;
  institution: string;
  year: string;
  filename: string;
  deckFilename?: string;
  description: string;
  category: 'hypothesis' | 'mechanism' | 'review' | 'synthesis';
  tier: PrizeTier;
  winnerId: string; // Links to PrizeWinner
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

export interface PrizeInfo {
  name: string;
  year: number;
  totalPrize: string;
  organizer: string;
  description: string;
  namedAfter: string;
  namedAfterBio: string;
}
