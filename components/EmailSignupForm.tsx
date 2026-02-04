import React, { useState, useId } from 'react';
import { AudienceSegment, SignupData } from '../types';
import { useEmailSignup } from '../hooks/useEmailSignup';
import { useFormTracking } from '../hooks/useAnalytics';
import { Check, ChevronDown, Loader2 } from 'lucide-react';

interface EmailSignupFormProps {
  variant: 'inline' | 'footer';
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

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ variant, source }) => {
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

    if (!audienceSegment) {
      // Logic handled in useEmailSignup or locally
      // Assuming submit might handle it, but let's be explicit if needed
      // Actually, let's just let the submit hook handle the error if it's missing, 
      // but usually we want to prevent the call if it's a client-side validation.
    }

    const success = await submit(email, audienceSegment, source);
    if (success) {
      // Track successful form submission per GSA requirements
      trackFormSubmit({
        source,
        audience_segment: audienceSegment as any,
        variant,
      });
      setEmail('');
      setAudienceSegment('');
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className={`
        ${variant === 'inline' ? 'bg-slate-50 border-l-4 border-green-400 p-6 md:p-8' : 'py-4'}
        animate-fadeIn
      `}>
        <div className="flex items-center gap-3 text-green-600">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium">Thank you for subscribing!</p>
            <p className="text-sm text-slate-500">We'll keep you updated on our research synthesis.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  // Inline variant - more prominent, with heading
  if (variant === 'inline') {
    return (
      <div className="bg-slate-50 border-l-4 border-red-300 p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-serif text-slate-900 mb-2">Stay in the Loop</h3>
          <p className="text-sm text-slate-500 font-light">
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
                aria-invalid={error ? 'true' : undefined}
                className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-900 placeholder-slate-400
                         focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400
                         transition-colors text-sm"
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
                className="w-full appearance-none px-4 py-3 pr-10 border border-slate-200 bg-white text-slate-700
                         focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400
                         transition-colors text-sm cursor-pointer"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold uppercase tracking-wider
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
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
            <p id={errorId} className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-slate-400 font-light">
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
        <span className="text-sm text-slate-600 font-medium shrink-0" id={`${formId}-label`}>Stay Updated</span>

        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
          <label htmlFor={emailId} className="sr-only">Email address</label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : undefined}
            className="flex-1 min-w-0 px-3 py-2 border border-slate-200 bg-white text-slate-900 placeholder-slate-400
                     focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400 text-sm"
            disabled={isLoading}
          />

          <div className="relative">
            <label htmlFor={audienceId} className="sr-only">I am a</label>
            <select
              id={audienceId}
              value={audienceSegment}
              onChange={(e) => setAudienceSegment(e.target.value as AudienceSegment)}
              className="w-full sm:w-auto appearance-none px-3 py-2 pr-8 border border-slate-200 bg-white text-slate-600
                       focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400 text-sm cursor-pointer"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider
                     transition-colors disabled:opacity-50 flex items-center justify-center gap-1 shrink-0
                     focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : 'Subscribe'}
          </button>
        </div>
      </form>

      {error && (
        <p id={errorId} className="text-red-500 text-xs mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default EmailSignupForm;
