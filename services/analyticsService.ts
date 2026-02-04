/**
 * Google Analytics 4 Service
 * Based on GSA Three-Tier Analytics Stack
 *
 * Features:
 * - Page views, file downloads, form submissions, modals (GSA required)
 * - Bot detection, engagement tracking, scroll depth
 * - Rage click detection, quick back detection, error tracking
 */

// GA4 types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

function gtag(...args: unknown[]) {
  window.dataLayer.push(args);
}

// Make gtag available globally
window.gtag = gtag;

let isInitialized = false;
const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;
const isDev = (import.meta as any).env?.DEV;

// ============================================
// Bot & Device Detection
// ============================================

const BOT_USER_AGENT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|Slackbot|Discordbot|WhatsApp|Telegram|LinkedInBot/i;

function isBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  return BOT_USER_AGENT_PATTERN.test(navigator.userAgent);
}

function getDeviceType(): 'mobile' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

function isPWA(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true;
}

// ============================================
// Core Tracking Function
// ============================================

function sendToGA4(eventName: string, params: Record<string, unknown> = {}): void {
  if (isBot()) return;
  if (!measurementId) return;
  if (typeof window === 'undefined' || !window.gtag) return;

  const enrichedParams = {
    ...params,
    device_type: getDeviceType(),
    is_pwa: isPWA(),
  };

  gtag('event', eventName, enrichedParams);

  if (isDev) {
    console.log(`[Analytics] ${eventName}:`, enrichedParams);
  }
}

// ============================================
// Initialization
// ============================================

export const initializeAnalytics = (): void => {
  if (isInitialized) return;

  if (!measurementId) {
    if (isDev) {
      console.warn('[Analytics] VITE_GA_MEASUREMENT_ID not set - analytics disabled');
    }
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false, // We handle page views manually for SPA
  });

  isInitialized = true;

  if (isDev) {
    console.log('[Analytics] Initialized with ID:', measurementId);
  }

  // Track initial page load
  sendToGA4('page_load');
};

// ============================================
// Page & Navigation Tracking
// ============================================

export const trackPageView = (pageName: string, pageTitle?: string): void => {
  sendToGA4('page_view', {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: `/${pageName.toLowerCase().replace(/_/g, '-')}`,
  });
};

export const trackNavigation = (
  from: string,
  to: string,
  method: 'sidebar' | 'button' | 'link'
): void => {
  sendToGA4('navigation', {
    event_category: 'navigation',
    from_page: from,
    to_page: to,
    navigation_method: method,
  });
};

// ============================================
// File Download Tracking (GSA Required)
// ============================================

export const trackFileDownload = (
  fileName: string,
  fileType: string = 'pdf',
  category?: string
): void => {
  sendToGA4('file_download', {
    event_category: 'file_download',
    file_name: fileName,
    file_type: fileType,
    content_category: category,
  });
};

// ============================================
// Form Submission Tracking (GSA Required)
// ============================================

export const trackFormSubmission = (
  formName: string,
  formData?: Record<string, string>
): void => {
  sendToGA4('form_submit', {
    event_category: 'form_submission',
    form_name: formName,
    ...formData,
  });
};

// ============================================
// Modal Tracking (GSA Required)
// ============================================

export const trackModalOpen = (modalName: string, modalType?: string): void => {
  sendToGA4('modal_open', {
    event_category: 'modal',
    modal_name: modalName,
    modal_type: modalType || 'dialog',
  });
};

export const trackModalClose = (modalName: string): void => {
  sendToGA4('modal_close', {
    event_category: 'modal',
    modal_name: modalName,
  });
};

// ============================================
// Chatbot Tracking
// ============================================

export const trackChatbotInteraction = (
  action: 'open' | 'close' | 'query',
  queryText?: string
): void => {
  sendToGA4('chatbot_interaction', {
    event_category: 'chatbot',
    action,
    query_length: queryText?.length,
  });
};

// ============================================
// Engagement Tracking (GSA Standard)
// ============================================

const engagementTracked = { 30: false, 60: false, 180: false };

export function trackEngagement(seconds: 30 | 60 | 180): void {
  if (engagementTracked[seconds]) return;
  engagementTracked[seconds] = true;
  sendToGA4(`engagement_${seconds}s`);
}

export function setupEngagementTracking(): () => void {
  const startTime = Date.now();

  const checkEngagement = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= 30 && !engagementTracked[30]) trackEngagement(30);
    if (elapsed >= 60 && !engagementTracked[60]) trackEngagement(60);
    if (elapsed >= 180 && !engagementTracked[180]) trackEngagement(180);
  };

  const intervalId = setInterval(checkEngagement, 5000);

  // Return cleanup function
  return () => clearInterval(intervalId);
}

// ============================================
// Scroll Depth Tracking (GSA Standard)
// ============================================

const scrollTracked = { 25: false, 50: false, 75: false, 100: false };

export function trackScrollDepth(): void {
  if (typeof window === 'undefined') return;

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return;

  const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

  const thresholds = [25, 50, 75, 100] as const;
  for (const threshold of thresholds) {
    if (scrollPercent >= threshold && !scrollTracked[threshold]) {
      scrollTracked[threshold] = true;
      sendToGA4(`scroll_depth_${threshold}`);
    }
  }
}

export function resetScrollTracking(): void {
  scrollTracked[25] = false;
  scrollTracked[50] = false;
  scrollTracked[75] = false;
  scrollTracked[100] = false;
}

// ============================================
// Error Tracking (GSA Standard)
// ============================================

export function trackJavaScriptError(
  error: Error | string,
  source?: string,
  line?: number
): void {
  sendToGA4('javascript_error', {
    error_message: typeof error === 'string' ? error : error.message,
    error_source: source,
    error_line: line,
  });
}

export function setupErrorTracking(): void {
  if (typeof window === 'undefined') return;

  window.onerror = (message, source, line) => {
    trackJavaScriptError(String(message), source, line);
  };

  window.addEventListener('unhandledrejection', (event) => {
    trackJavaScriptError(`Unhandled Promise: ${event.reason}`);
  });
}

// ============================================
// Rage Click Detection (GSA Standard)
// ============================================

let clickCount = 0;
let lastClickTarget: EventTarget | null = null;
let lastClickTime = 0;

export function trackPotentialRageClick(event: MouseEvent): void {
  const now = Date.now();

  // Reset if different target or >1 second gap
  if (event.target !== lastClickTarget || now - lastClickTime > 1000) {
    clickCount = 1;
    lastClickTarget = event.target;
  } else {
    clickCount++;
  }

  lastClickTime = now;

  // 3+ rapid clicks = rage click
  if (clickCount >= 3) {
    const target = event.target as HTMLElement;
    sendToGA4('rage_click', {
      target_tag: target.tagName,
      target_class: target.className?.slice?.(0, 100), // Limit length
      target_id: target.id,
      click_count: clickCount,
    });
    clickCount = 0; // Reset after tracking
  }
}

// ============================================
// Quick Back Detection (GSA Standard)
// ============================================

let pageLoadTime = 0;

export function setupQuickBackTracking(): void {
  if (typeof window === 'undefined') return;

  pageLoadTime = Date.now();

  window.addEventListener('beforeunload', () => {
    const duration = Date.now() - pageLoadTime;
    if (duration < 10000) { // Left in under 10 seconds
      sendToGA4('quick_back', {
        duration_ms: duration,
      });
    }
  });
}

// ============================================
// Button Click Tracking
// ============================================

export function trackButtonClick(
  buttonName: string,
  additionalParams?: Record<string, unknown>
): void {
  sendToGA4('button_click', {
    button_name: buttonName,
    ...additionalParams,
  });
}

// ============================================
// Feature Usage Tracking
// ============================================

export function trackFeatureUsage(
  featureName: string,
  additionalParams?: Record<string, unknown>
): void {
  sendToGA4('feature_usage', {
    feature_name: featureName,
    ...additionalParams,
  });
}

// ============================================
// Generic Event Tracking
// ============================================

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  sendToGA4(eventName, eventParams);
};
