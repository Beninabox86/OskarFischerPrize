import React from 'react';

/* =============================================================================
   Page Layout Components
   Editorial/Magazine Style Design System
   ============================================================================= */

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main page container with max-width constraint
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 ${className}`}>
      {children}
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Content Container
   ----------------------------------------------------------------------------- */

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: 'narrow' | 'default' | 'wide';
}

const widthStyles = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
};

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className = '',
  width = 'default',
}) => {
  return (
    <div className={`${widthStyles[width]} mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Full Width Section (breaks out of max-width container)
   ----------------------------------------------------------------------------- */

interface FullWidthSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'warm' | 'dark';
}

const backgroundStyles = {
  default: 'bg-paper',
  warm: 'bg-paper-warm',
  dark: 'bg-paper-dark text-white',
};

export const FullWidthSection: React.FC<FullWidthSectionProps> = ({
  children,
  className = '',
  background = 'default',
}) => {
  return (
    <div className={`w-full ${backgroundStyles[background]} ${className}`}>
      {children}
    </div>
  );
};

/* -----------------------------------------------------------------------------
   Two Column Layout
   ----------------------------------------------------------------------------- */

interface TwoColumnLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarWidth?: 'narrow' | 'default' | 'wide';
  className?: string;
}

const sidebarWidthStyles = {
  narrow: 'w-64',
  default: 'w-72',
  wide: 'w-80',
};

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  sidebar,
  main,
  sidebarWidth = 'default',
  className = '',
}) => {
  return (
    <div className={`flex h-screen w-screen overflow-hidden ${className}`}>
      {/* Sidebar - Hidden on mobile */}
      <aside className={`hidden md:block ${sidebarWidthStyles[sidebarWidth]} h-full flex-shrink-0`}>
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto scroll-smooth">
        {main}
      </main>
    </div>
  );
};
