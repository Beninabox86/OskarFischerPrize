import React from 'react';
import EmailSignupForm from './EmailSignupForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Email Signup */}
        <EmailSignupForm variant="footer" source="footer" />

        {/* Thin red accent rule */}
        <div className="w-full h-px bg-red-200 my-8"></div>

        {/* Medical Disclaimer */}
        <div className="text-center mb-6" data-disclaimer>
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-semibold mb-2">
            Medical Disclaimer
          </p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            This website is for informational and educational purposes only. It is not intended
            as a substitute for professional medical advice, diagnosis, or treatment. This platform
            serves as a research synthesis tool and does not constitute clinical recommendation.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} Truchard Ventures &middot; Authored, Designed and Curated by Frontier AI Models</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
