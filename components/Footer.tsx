import React from 'react';
import EmailSignupForm from './EmailSignupForm';

const Footer: React.FC = () => {
  return (
    <footer className="section-warm-blend border-t border-divider relative">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-prize-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Email Signup */}
        <EmailSignupForm variant="footer" source="footer" />

        {/* Circuit Divider */}
        <div className="circuit-divider my-8" />

        {/* Medical Disclaimer */}
        <div className="text-center mb-6" data-disclaimer>
          <p className="text-caption font-ui uppercase tracking-wider text-prize-gold font-semibold mb-2">
            Medical Disclaimer
          </p>
          <p className="text-small font-body text-ink-muted leading-relaxed max-w-2xl mx-auto">
            This website is for informational and educational purposes only. It is not intended
            as a substitute for professional medical advice, diagnosis, or treatment. This platform
            serves as a research synthesis tool and does not constitute clinical recommendation.
          </p>
        </div>

        {/* Heritage Element */}
        <div className="border-t border-divider/50 pt-6 mt-6 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-prize-gold/40 to-transparent" />
          <p className="text-caption text-prize-gold font-ui font-semibold uppercase tracking-wider mb-2">
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
