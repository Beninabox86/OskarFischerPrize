import { useState, useCallback } from 'react';
import { SignupData, AudienceSegment } from '../types';

// Formbricks configuration
// Set up your survey at https://formbricks.com and get your Environment ID, Survey ID, and Question IDs
const FORMBRICKS_HOST = (import.meta as any).env?.VITE_FORMBRICKS_HOST || 'https://app.formbricks.com';
const FORMBRICKS_ENV_ID = (import.meta as any).env?.VITE_FORMBRICKS_ENV_ID;
const FORMBRICKS_SURVEY_ID = (import.meta as any).env?.VITE_FORMBRICKS_SURVEY_ID;
// Question IDs from Formbricks survey (found in survey editor URL or API response)
const FORMBRICKS_EMAIL_QUESTION_ID = (import.meta as any).env?.VITE_FORMBRICKS_EMAIL_QUESTION_ID;
const FORMBRICKS_SEGMENT_QUESTION_ID = (import.meta as any).env?.VITE_FORMBRICKS_SEGMENT_QUESTION_ID;

const STORAGE_KEY = 'acd_email_signups';

interface UseEmailSignupReturn {
  submit: (email: string, audienceSegment: AudienceSegment, source: SignupData['source']) => Promise<boolean>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

const validateEmail = (email: string): boolean => {
  // More robust email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
};

const getStoredSignups = (): SignupData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const storeSignupLocally = (data: SignupData): void => {
  try {
    const existing = getStoredSignups();
    existing.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage may be full or unavailable, continue silently
  }
};

const isEmailAlreadySubmitted = (email: string): boolean => {
  const signups = getStoredSignups();
  return signups.some(s => s.email.toLowerCase() === email.toLowerCase());
};

export const useEmailSignup = (): UseEmailSignupReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  const submit = useCallback(async (
    email: string,
    audienceSegment: AudienceSegment,
    source: SignupData['source']
  ): Promise<boolean> => {
    setError(null);
    setIsSuccess(false);
    setIsLoading(true);

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return false;
    }

    // Check for duplicates (local cache)
    if (isEmailAlreadySubmitted(email)) {
      setError('This email is already subscribed.');
      setIsLoading(false);
      return false;
    }

    const signupData: SignupData = {
      email: email.trim().toLowerCase(),
      audienceSegment,
      timestamp: new Date().toISOString(),
      source,
    };

    try {
      // Check if Formbricks is configured
      if (!FORMBRICKS_ENV_ID || !FORMBRICKS_SURVEY_ID || !FORMBRICKS_EMAIL_QUESTION_ID || !FORMBRICKS_SEGMENT_QUESTION_ID) {
        console.warn('Formbricks not configured. Set all VITE_FORMBRICKS_* env vars in .env');
        setError('Email signup is not configured. Please try again later.');
        setIsLoading(false);
        return false;
      }

      // Build data object with dynamic question IDs from Formbricks
      const formData: Record<string, string> = {
        [FORMBRICKS_EMAIL_QUESTION_ID]: signupData.email,
        [FORMBRICKS_SEGMENT_QUESTION_ID]: signupData.audienceSegment,
      };

      // Send to Formbricks
      const response = await fetch(`${FORMBRICKS_HOST}/api/v1/client/${FORMBRICKS_ENV_ID}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId: FORMBRICKS_SURVEY_ID,
          finished: true,
          data: formData,
          meta: {
            source: signupData.source,
            timestamp: signupData.timestamp,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.message) {
          setError(data.message);
        } else {
          setError('Failed to subscribe. Please try again.');
        }
        setIsLoading(false);
        return false;
      }

      // Store locally for duplicate detection
      storeSignupLocally(signupData);
      setIsSuccess(true);
      setIsLoading(false);
      return true;
    } catch {
      setError('Network error. Please check your connection and try again.');
      setIsLoading(false);
      return false;
    }
  }, []);

  return {
    submit,
    isLoading,
    isSuccess,
    error,
    reset,
  };
};

export default useEmailSignup;
