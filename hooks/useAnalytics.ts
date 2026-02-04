import { useEffect, useCallback, useRef } from 'react';
import { ViewState } from '../types';
import {
  initializeAnalytics,
  trackPageView,
  trackFileDownload,
  trackFormSubmission,
  trackModalOpen,
  trackModalClose,
  trackChatbotInteraction,
  trackNavigation,
  trackEvent,
  setupEngagementTracking,
  setupErrorTracking,
  setupQuickBackTracking,
  trackScrollDepth,
  resetScrollTracking,
  trackPotentialRageClick,
} from '../services/analyticsService';

// Map ViewState to human-readable page titles
const VIEW_TITLES: Record<ViewState, string> = {
  [ViewState.HOME]: 'Home',
  [ViewState.ABOUT_PREVIEW]: 'About Preview',
  [ViewState.CHAPTER_1]: 'Chapter 1: The Historical Bridge',
  [ViewState.CHAPTER_2]: 'Chapter 2: The Molecular Mechanism',
  [ViewState.CHAPTER_3]: 'Chapter 3: The Progression',
  [ViewState.CHAPTER_4]: 'Chapter 4: The Unified Theory',
  [ViewState.LIBRARY]: 'The Library',
  [ViewState.VIRTUAL_LAB]: 'Virtual Lab',
  [ViewState.VIDEOS]: 'Videos',
  [ViewState.ABOUT]: 'About',
};

/**
 * Hook to initialize analytics and all GSA trackers on app mount
 */
export const useAnalyticsInit = (): void => {
  useEffect(() => {
    // Initialize GA4
    initializeAnalytics();

    // Setup GSA standard trackers
    const cleanupEngagement = setupEngagementTracking();
    setupErrorTracking();
    setupQuickBackTracking();

    // Setup scroll depth tracking
    const handleScroll = () => trackScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Setup rage click detection
    const handleClick = (e: MouseEvent) => trackPotentialRageClick(e);
    document.addEventListener('click', handleClick);

    // Cleanup on unmount
    return () => {
      cleanupEngagement();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

/**
 * Hook to track page views when ViewState changes
 */
export const usePageTracking = (view: ViewState): void => {
  const previousView = useRef<ViewState | null>(null);

  useEffect(() => {
    // Track page view
    trackPageView(view, VIEW_TITLES[view]);

    // Track navigation if this isn't the initial load
    if (previousView.current !== null) {
      trackNavigation(previousView.current, view, 'button');
    }

    // Reset scroll tracking on view change
    resetScrollTracking();

    previousView.current = view;
  }, [view]);
};

/**
 * Hook for tracking file downloads
 * Returns a callback to wrap download links
 */
export const useFileDownloadTracking = () => {
  const trackDownload = useCallback(
    (fileName: string, category?: string, fileType: string = 'pdf') => {
      trackFileDownload(fileName, fileType, category);
    },
    []
  );

  return trackDownload;
};

/**
 * Hook for tracking form submissions
 */
export const useFormTracking = (formName: string) => {
  const trackSubmit = useCallback(
    (formData?: Record<string, string>) => {
      trackFormSubmission(formName, formData);
    },
    [formName]
  );

  return trackSubmit;
};

/**
 * Hook for tracking modal interactions
 */
export const useModalTracking = (modalName: string) => {
  const trackOpen = useCallback(
    (modalType?: string) => {
      trackModalOpen(modalName, modalType);
    },
    [modalName]
  );

  const trackClose = useCallback(() => {
    trackModalClose(modalName);
  }, [modalName]);

  return { trackOpen, trackClose };
};

/**
 * Hook for tracking Research Assistant chatbot
 */
export const useChatbotTracking = () => {
  const trackOpen = useCallback(() => {
    trackChatbotInteraction('open');
  }, []);

  const trackClose = useCallback(() => {
    trackChatbotInteraction('close');
  }, []);

  const trackQuery = useCallback((queryText: string) => {
    trackChatbotInteraction('query', queryText);
  }, []);

  return { trackOpen, trackClose, trackQuery };
};

/**
 * Generic event tracking hook
 */
export const useEventTracking = () => {
  const track = useCallback(
    (eventName: string, eventParams?: Record<string, unknown>) => {
      trackEvent(eventName, eventParams);
    },
    []
  );

  return track;
};
