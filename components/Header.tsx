import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 mb-8 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sky-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c.413 1.023 1.137 1.867 2.035 2.508a8.987 8.987 0 0 1 3.43 1.282A8.987 8.987 0 0 1 10.5 21M9.75 6.75a2.25 2.25 0 0 1 2.25-2.25h.008a2.25 2.25 0 0 1 2.25 2.25v.008a2.25 2.25 0 0 1-2.25 2.25h-.008a2.25 2.25 0 0 1-2.25-2.25v-.008ZM16.5 9.75a2.25 2.25 0 0 1 2.25-2.25h.008a2.25 2.25 0 0 1 2.25 2.25v.008a2.25 2.25 0 0 1-2.25 2.25h-.008a2.25 2.25 0 0 1-2.25-2.25v-.008Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5a7.5 7.5 0 0 1 14.58-2.247.75.75 0 0 1 .358.622v1.123a.75.75 0 0 1-.358.622A7.5 7.5 0 0 1 3 13.5Z" />
        </svg>
        <h1 className="text-2xl font-bold text-slate-100">Verificador de Hechos con IA</h1>
      </div>
    </header>
  );
};

export default Header;