import React, { useState, useId } from 'react';
import { AudienceSegment, SignupData } from '../types';
import { useEmailSignup } from '../hooks/useEmailSignup';
import { useFormTracking } from '../hooks/useAnalytics';
import { Check, ChevronDown, Loader2 } from 'lucide-react';

interface EmailSignupFormProps {
  variant?: 'inline' | 'footer';
  source: SignupData['source'];
}

const AUDIENCE_OPTIONS: { value: AudienceSegment; label: string }[] = [
  { value: 'researcher', label: 'Researcher / Scientist' },
  { value: 'pharma', label: 'Pharma / Biotech Professional' },
  { value: 'healthcare', label: 'Healthcare Professional' },
  { value: 'investor', label: 'Investor / Business Professional' },
  { value: 'patient_caregiver', label: 'Patient / Caregiver' },
  { value: 'patient_advocate', label: 'Patient Advocate / Non-profit' },
  { value: 'general', label: 'Interested in Science / Health' },
];

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ variant = 'inline', source }) => {
  const [email, setEmail] = useState('');
  const [audienceSegment, setAudienceSegment] = useState<AudienceSegment>('');
  const { submit, isLoading, isSuccess, error, reset } = useEmailSignup();
  const trackFormSubmit = useFormTracking('email_signup');

  const formId = useId();
  const emailId = `${formId}-email`;
  const audienceId = `${formId}-audience`;
  const errorId = `${formId}-error`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit(email, audienceSegment, source);
    if (success) {
      trackFormSubmit({
        source,
        audience_segment: audienceSegment as any,
        variant,
      });
      setEmail('');
      setAudienceSegment('');
    }
  };

  // Shared input styles
  const inputStyles = `
    w-full px-4 py-3
    border border-divider bg-white
    text-ink placeholder-ink-muted
    font-ui text-small
    rounded
    transition-colors duration-200
    focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const selectStyles = `
    w-full appearance-none px-4 py-3 pr-10
    border border-divider bg-white
    text-ink
    font-ui text-small
    rounded
    transition-colors duration-200
    cursor-pointer
    focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const buttonStyles = `
    px-6 py-3
    bg-accent hover:bg-accent-hover
    text-white
    font-ui text-small font-semibold uppercase tracking-wider
    rounded
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    flex items-center justify-center gap-2
  `;

  // Success state
  if (isSuccess) {
    return (
      <div className={`
        ${variant === 'inline' ? 'bg-paper-warm border-l-4 border-green-600 p-6 md:p-8 rounded-r' : 'py-4'}
      `}>
        <div className="flex items-center gap-3 text-green-700">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="font-ui font-semibold text-body">Thank you for subscribing!</p>
            <p className="text-small font-body text-ink-muted">We'll keep you updated on our research synthesis.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-small font-ui text-ink-muted hover:text-accent underline transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  // Inline variant - more prominent, with heading
  if (variant === 'inline') {
    return (
      <div className="bg-paper-warm border-l-4 border-accent p-6 md:p-8 rounded-r">
        <div className="mb-6">
          <h3 className="font-display text-h3 text-ink mb-2">Stay in the Loop</h3>
          <p className="text-small font-body text-ink-light">
            Join researchers, clinicians, and science enthusiasts following the evolution of this synthesis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Email Input */}
            <div className="flex-1">
              <label htmlFor={emailId} className="sr-only">Email address</label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-describedby={error ? errorId : undefined}
                aria-invalid={!!error}
                className={inputStyles}
                disabled={isLoading}
              />
            </div>

            {/* Audience Dropdown */}
            <div className="relative md:w-64">
              <label htmlFor={audienceId} className="sr-only">I am a</label>
              <select
                id={audienceId}
                value={audienceSegment}
                onChange={(e) => setAudienceSegment(e.target.value as AudienceSegment)}
                className={selectStyles}
                disabled={isLoading}
              >
                <option value="" disabled>Select Interest</option>
                {AUDIENCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={buttonStyles}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  <span>Subscribing...</span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p id={errorId} className="text-small font-ui text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-caption font-ui text-ink-muted">
            We respect your inbox. Expect occasional updates, not spam.
          </p>
        </form>
      </div>
    );
  }

  // Footer variant - compact, horizontal
  return (
    <div className="py-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <span className="text-small font-ui font-medium text-ink shrink-0" id={`${formId}-label`}>
          Stay Updated
        </span>

        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
          <label htmlFor={emailId} className="sr-only">Email address</label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            className="flex-1 min-w-0 px-3 py-2 border border-divider bg-white text-ink placeholder-ink-muted font-ui text-small rounded transition-colors focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            disabled={isLoading}
          />

          <div className="relative">
            <label htmlFor={audienceId} className="sr-only">I am a</label>
            <select
              id={audienceId}
              value={audienceSegment}
              onChange={(e) => setAudienceSegment(e.target.value as AudienceSegment)}
              className="w-full sm:w-auto appearance-none px-3 py-2 pr-8 border border-divider bg-white text-ink font-ui text-small rounded cursor-pointer transition-colors focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              disabled={isLoading}
            >
              <option value="" disabled>Select Interest</option>
              {AUDIENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              aria-hidden="true"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white font-ui text-small font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-1 shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : 'Subscribe'}
          </button>
        </div>
      </form>

      {error && (
        <p id={errorId} className="text-small font-ui text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default EmailSignupForm;
