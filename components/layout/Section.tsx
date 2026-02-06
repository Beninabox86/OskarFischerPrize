import React from 'react';

/* =============================================================================
   Section Components
   Editorial/Magazine Style Design System
   ============================================================================= */

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'warm' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

const backgroundStyles = {
  default: 'bg-paper',
  warm: 'section-warm-blend',
  dark: 'section-dark-blend',
};

const paddingStyles = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-24',
};

/**
 * Full-width section wrapper with background and padding options
 */
export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'default',
  padding = 'md',
  id,
}) => {
  const isDark = background === 'dark';

  return (
    <section
      id={id}
      className={`
        w-full
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${isDark ? 'text-white' : ''}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

/* -----------------------------------------------------------------------------
   Hero Section
   ----------------------------------------------------------------------------- */

interface HeroSectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const heroSizeStyles = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-28 md:py-36',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <section
      className={`
        w-full
        text-white
        relative
        overflow-hidden
        bg-paper-dark
        ${className}
      `}
    >
      {/* Brand Art Image - The Hero Header */}
      <div className="hero-art-container">
        {/* The actual brand art image */}
        <div className="relative w-full bg-hero-dark">
          <img
            src="/hero-art.jpg"
            alt="Oskar Fischer Prize - Golden Phoenix with Neural Circuit Design"
            className="w-full h-auto"
          />
          {/* Atmospheric scrim - subtle tonal adjustment */}
          <div className="hero-art-scrim" />
          {/* Sculptural edge fades - dissolve the image into atmosphere */}
          <div className="hero-art-fade-top" />
          <div className="hero-art-fade-bottom-extended" />
          <div className="hero-art-fade-sides" />
        </div>

        {/* Content floats in the dissolved space */}
        <div className="relative z-10 -mt-24 md:-mt-32 pb-10 md:pb-14 hero-content-feather">
          <div className="max-w-4xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
            {children}
          </div>
        </div>
      </div>

      {/* Atmospheric transition - the hero breathes into the page */}
      <div className="hero-to-page-feather" />
    </section>
  );
};

/* -----------------------------------------------------------------------------
   Content Section (with max-width container built-in)
   ----------------------------------------------------------------------------- */

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'warm' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  width?: 'narrow' | 'default' | 'wide';
  id?: string;
}

const widthStyles = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
};

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className = '',
  background = 'default',
  padding = 'md',
  width = 'default',
  id,
}) => {
  const isDark = background === 'dark';

  return (
    <section
      id={id}
      className={`
        w-full
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${isDark ? 'text-white' : ''}
      `}
    >
      <div className={`${widthStyles[width]} mx-auto px-6 md:px-8 ${className}`}>
        {children}
      </div>
    </section>
  );
};

/* -----------------------------------------------------------------------------
   Grid Section
   ----------------------------------------------------------------------------- */

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const columnStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export const GridSection: React.FC<GridSectionProps> = ({
  children,
  className = '',
  columns = 2,
  gap = 'md',
}) => {
  return (
    <div className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Section Divider
   ----------------------------------------------------------------------------- */

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
}) => {
  return (
    <hr className={`section-divider-angular ${className}`} />
  );
};

/* -----------------------------------------------------------------------------
   Tier Section Header
   ----------------------------------------------------------------------------- */

type Tier = 'gold' | 'silver' | 'bronze';

interface TierSectionHeaderProps {
  tier: Tier;
  label: string;
  className?: string;
}

const tierBorderStyles: Record<Tier, string> = {
  gold: 'border-gold text-gold',
  silver: 'border-silver text-silver',
  bronze: 'border-bronze text-bronze',
};

export const TierSectionHeader: React.FC<TierSectionHeaderProps> = ({
  tier,
  label,
  className = '',
}) => {
  return (
    <h2 className={`
      font-display text-h3 font-semibold uppercase tracking-wider
      angular-border-left mb-6
      ${tierBorderStyles[tier]}
      ${className}
    `}>
      {label} Prize Recipients
    </h2>
  );
};
