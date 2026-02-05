import React from 'react';

/* =============================================================================
   Card Components
   Editorial/Magazine Style Design System
   ============================================================================= */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  as?: 'div' | 'article' | 'section';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  as: Component = 'div',
}) => {
  const baseStyles = 'bg-white border border-divider rounded-lg';
  const hoverStyles = hover
    ? 'transition-all duration-200 hover:border-accent hover:shadow-lg cursor-pointer'
    : '';

  return (
    <Component className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
      {children}
    </Component>
  );
};

/* -----------------------------------------------------------------------------
   Clickable Card Component
   ----------------------------------------------------------------------------- */

interface ClickableCardProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const ClickableCard: React.FC<ClickableCardProps> = ({
  children,
  onClick,
  className = '',
  padding = 'md',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        bg-white border border-divider rounded-lg
        transition-all duration-200
        hover:border-accent hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        group
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/* -----------------------------------------------------------------------------
   Winner Card Component
   ----------------------------------------------------------------------------- */

type Tier = 'gold' | 'silver' | 'bronze';

interface WinnerCardProps {
  name: string;
  institution: string;
  country?: string;
  hypothesis: string;
  hypothesisSummary?: string;
  tier: Tier;
  onClick: () => void;
  className?: string;
  compact?: boolean;
}

const tierAccentStyles: Record<Tier, { border: string; badge: string; text: string; label: string; ring: string }> = {
  gold: {
    border: 'hover:border-accent',
    badge: 'bg-accent/10 text-accent border border-accent/20',
    text: 'text-accent',
    label: 'Gold Prize',
    ring: 'ring-accent/20',
  },
  silver: {
    border: 'hover:border-accent-light',
    badge: 'bg-accent/5 text-accent-light border border-accent/10',
    text: 'text-accent-light',
    label: 'Silver Prize',
    ring: 'ring-accent/10',
  },
  bronze: {
    border: 'hover:border-ink-light',
    badge: 'bg-ink-muted/10 text-ink-light border border-ink-muted/20',
    text: 'text-ink-light',
    label: 'Bronze Prize',
    ring: 'ring-ink-muted/10',
  },
};

export const WinnerCard: React.FC<WinnerCardProps> = ({
  name,
  institution,
  country,
  hypothesis,
  hypothesisSummary,
  tier,
  onClick,
  className = '',
  compact = false,
}) => {
  const tierStyles = tierAccentStyles[tier];

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        bg-white border border-divider/60 rounded-xl shadow-sm
        transition-all duration-300 ease-out
        ${tierStyles.border} hover:shadow-lg hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        group
        relative
        ${compact ? 'p-5' : 'p-6'}
        ${className}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Tier Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-ui font-medium mb-3 ${tierStyles.badge}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
            {tierStyles.label}
          </div>

          {/* Name */}
          <h3 className="font-display text-h3 text-ink group-hover:text-accent transition-colors mb-1">
            {name}
          </h3>

          {/* Institution & Country */}
          <p className="text-small font-ui text-ink-muted mb-1">{institution}</p>
          {country && <p className="text-caption font-ui text-ink-muted">{country}</p>}

          {/* Hypothesis */}
          {!compact && (
            <div className="mt-4 pt-4 border-t border-divider">
              <p className="text-body font-body font-medium text-ink">{hypothesis}</p>
              {hypothesisSummary && (
                <p className="text-small font-body text-ink-light mt-2">{hypothesisSummary}</p>
              )}
            </div>
          )}
          {compact && (
            <p className="text-small font-body font-medium text-ink mt-3">{hypothesis}</p>
          )}
        </div>

        {/* Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 text-divider group-hover:text-accent transition-colors mt-1"
          aria-hidden="true"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

/* -----------------------------------------------------------------------------
   Stat Card Component
   ----------------------------------------------------------------------------- */

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="font-display text-display text-accent tabular-nums mb-1">
        {value}
      </div>
      <div className="text-small font-ui text-ink-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Tier Info Card Component
   ----------------------------------------------------------------------------- */

interface TierInfoCardProps {
  tier: Tier;
  label: string;
  description: string;
  className?: string;
}

export const TierInfoCard: React.FC<TierInfoCardProps> = ({
  tier,
  label,
  description,
  className = '',
}) => {
  const tierStyles = tierAccentStyles[tier];

  return (
    <div className={`p-6 rounded-xl border ${tierStyles.border.replace('hover:', '')} bg-white shadow-sm ${className}`}>
      <div className={`inline-flex items-center gap-2 ${tierStyles.badge} px-3 py-1 rounded-full text-caption font-ui font-medium mb-4`}>
        <span className="w-2 h-2 rounded-full bg-current" />
        {label} Prize
      </div>
      <p className="text-small font-body text-ink-light">{description}</p>
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Coming Soon Card Component
   ----------------------------------------------------------------------------- */

interface ComingSoonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`bg-paper-warm p-8 rounded-lg text-center ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-divider rounded-full text-ink-muted mb-4">
        {icon}
      </div>
      <h2 className="font-display text-h3 text-ink mb-2">{title}</h2>
      <p className="text-body font-body text-ink-light max-w-md mx-auto">{description}</p>
    </div>
  );
};
