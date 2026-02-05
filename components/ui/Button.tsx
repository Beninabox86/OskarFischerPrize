import React from 'react';

/* =============================================================================
   Button Component
   Editorial/Magazine Style Design System
   ============================================================================= */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-accent text-white
    hover:bg-accent-hover
    focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
  `,
  secondary: `
    bg-transparent text-ink border border-divider
    hover:border-accent hover:text-accent
    focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
  `,
  ghost: `
    bg-transparent text-ink-light
    hover:bg-paper-warm hover:text-ink
    focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
  `,
  link: `
    bg-transparent text-accent underline-offset-4
    hover:underline
    focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
    p-0
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-ui font-semibold uppercase tracking-wider
    angular-badge
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const widthStyle = fullWidth ? 'w-full' : '';
  const sizeStyle = variant === 'link' ? '' : sizeStyles[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyle} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

/* -----------------------------------------------------------------------------
   Icon Button Component
   ----------------------------------------------------------------------------- */

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: ButtonSize;
  variant?: 'default' | 'ghost';
  className?: string;
}

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    angular-badge
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyle = variant === 'ghost'
    ? 'text-ink-light hover:bg-paper-warm hover:text-ink'
    : 'text-ink-light hover:bg-divider hover:text-ink';

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${iconSizeStyles[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
};

/* -----------------------------------------------------------------------------
   Back Button Component
   ----------------------------------------------------------------------------- */

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  children = 'Back',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-accent hover:text-accent-hover font-ui font-semibold uppercase tracking-wider transition-all hover:-translate-x-1 ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      {children}
    </button>
  );
};
