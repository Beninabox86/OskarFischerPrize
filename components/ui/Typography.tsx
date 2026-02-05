import React from 'react';

/* =============================================================================
   Typography Components
   Editorial/Magazine Style Design System
   ============================================================================= */

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-display font-display font-semibold text-ink uppercase tracking-wide',
  2: 'text-h1 font-display font-semibold text-ink uppercase tracking-wide',
  3: 'text-h2 font-display font-medium text-ink uppercase tracking-wide',
  4: 'text-h3 font-display font-medium text-ink uppercase tracking-wide',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className = '',
  as,
}) => {
  const Tag = as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4');
  const baseStyles = headingStyles[level];

  return (
    <Tag className={`${baseStyles} ${className}`}>
      {children}
    </Tag>
  );
};

/* -----------------------------------------------------------------------------
   Text Component
   ----------------------------------------------------------------------------- */

type TextVariant = 'body' | 'body-lg' | 'lead' | 'small' | 'caption';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
  muted?: boolean;
}

const textStyles: Record<TextVariant, string> = {
  'body': 'text-body font-body',
  'body-lg': 'text-body-lg font-body',
  'lead': 'text-body-lg font-body text-ink-light',
  'small': 'text-small font-body',
  'caption': 'text-caption font-ui uppercase tracking-wide',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  className = '',
  as = 'p',
  muted = false,
}) => {
  const Tag = as;
  const baseStyles = textStyles[variant];
  const colorClass = muted ? 'text-ink-muted' : (variant === 'lead' || variant === 'caption' ? '' : 'text-ink-light');

  return (
    <Tag className={`${baseStyles} ${colorClass} ${className}`}>
      {children}
    </Tag>
  );
};

/* -----------------------------------------------------------------------------
   Label Component (for UI elements)
   ----------------------------------------------------------------------------- */

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = '',
  htmlFor,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-small font-ui font-medium text-ink ${className}`}
    >
      {children}
    </label>
  );
};

/* -----------------------------------------------------------------------------
   Tier Badge Component
   ----------------------------------------------------------------------------- */

type Tier = 'gold' | 'silver' | 'bronze';

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

const tierStyles: Record<Tier, { bg: string; text: string; border: string; label: string; glow?: string }> = {
  gold: {
    bg: 'bg-gold-bg',
    text: 'text-gold',
    border: 'border-gold/30',
    label: 'Gold',
    glow: 'tier-gold-glow',
  },
  silver: {
    bg: 'bg-silver-bg',
    text: 'text-silver',
    border: 'border-silver/30',
    label: 'Silver',
  },
  bronze: {
    bg: 'bg-bronze-bg',
    text: 'text-bronze',
    border: 'border-bronze/30',
    label: 'Bronze',
  },
};

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  className = '',
}) => {
  const styles = tierStyles[tier];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 angular-badge text-caption font-ui font-semibold uppercase tracking-wider border ${styles.bg} ${styles.text} ${styles.border} ${styles.glow || ''} ${className}`}
      role="status"
      aria-label={`${styles.label} Prize`}
    >
      <span className={`w-2 h-2 rotate-45 ${tier === 'gold' ? 'bg-gradient-to-br from-prize-gold-light to-prize-gold-dark' : 'bg-current'}`} aria-hidden="true" />
      {styles.label} Prize
    </span>
  );
};

/* -----------------------------------------------------------------------------
   Section Header Component
   ----------------------------------------------------------------------------- */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <header className={`mb-12 pb-8 border-b border-divider relative ${className}`}>
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-8 w-[3px] bg-gradient-to-b from-prize-gold via-prize-gold-dark to-transparent" />
      <div className="pl-5">
        <Heading level={2} className="mb-3">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="lead" className="max-w-2xl normal-case">
            {subtitle}
          </Text>
        )}
      </div>
    </header>
  );
};

/* -----------------------------------------------------------------------------
   Pull Quote Component
   ----------------------------------------------------------------------------- */

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  children,
  attribution,
  className = '',
}) => {
  return (
    <blockquote className={`pull-quote ${className}`}>
      <p className="font-display text-h2 italic text-ink-light">
        {children}
      </p>
      {attribution && (
        <cite className="block mt-4 text-small font-ui not-italic text-ink-muted">
          {attribution}
        </cite>
      )}
    </blockquote>
  );
};
