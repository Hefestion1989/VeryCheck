import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-2">
        <span>Potenciado por la API de Google Gemini.</span>
        <span className="text-slate-600">
          Una herramienta de verificación experimental.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
