import React from 'react';
import EmailSignupForm from './EmailSignupForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-paper-warm border-t border-divider">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Email Signup */}
        <EmailSignupForm variant="footer" source="footer" />

        {/* Divider */}
        <div className="w-full h-px bg-divider my-8" />

        {/* Medical Disclaimer */}
        <div className="text-center mb-6" data-disclaimer>
          <p className="text-caption font-ui uppercase tracking-wider text-accent font-semibold mb-2">
            Medical Disclaimer
          </p>
          <p className="text-small font-body text-ink-muted leading-relaxed max-w-2xl mx-auto">
            This website is for informational and educational purposes only. It is not intended
            as a substitute for professional medical advice, diagnosis, or treatment. This platform
            serves as a research synthesis tool and does not constitute clinical recommendation.
          </p>
        </div>

        {/* Heritage Element */}
        <div className="border-t border-divider pt-6 mt-6 text-center">
          <p className="text-caption text-accent font-ui font-semibold uppercase tracking-wider mb-2">
            A Truchard Ventures Initiative
          </p>
          <p className="text-small text-ink-light italic font-body mb-4">
            "Accelerate productivity, innovation, and discovery."
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-caption font-ui text-ink-muted">
          <p>&copy; {new Date().getFullYear()} Truchard Ventures &middot; Authored, Designed and Curated by Frontier AI Models</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
