import React from 'react';
import { FactCheckResult, FactCheckCitation } from '../types';

interface ResultCardProps {
  result: FactCheckResult;
}

const VerdictDisplay: React.FC<{ verdict: FactCheckResult['veredicto'], confianza: number }> = ({ verdict, confianza }) => {
  const percentage = Math.round(confianza * 100);

  const verdictConfig = {
    'verdadero': {
      text: 'VERDADERO',
      bgColor: 'bg-emerald-900/50',
      textColor: 'text-emerald-300',
      borderColor: 'border-emerald-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    'falso': {
      text: 'FALSO',
      bgColor: 'bg-rose-900/50',
      textColor: 'text-rose-300',
      borderColor: 'border-rose-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    'engañoso': {
      text: 'ENGAÑOSO',
      bgColor: 'bg-amber-900/50',
      textColor: 'text-amber-300',
      borderColor: 'border-amber-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
    },
    'indeterminado': {
      text: 'INDETERMINADO',
      bgColor: 'bg-slate-700/50',
      textColor: 'text-slate-300',
      borderColor: 'border-slate-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
    },
  };

  const config = verdictConfig[verdict];

  return (
    <div className={`p-4 rounded-lg border-l-4 ${config.bgColor} ${config.borderColor} flex items-center justify-between space-x-4 mb-6`}>
      <div className='flex items-center space-x-4'>
        <div className={`${config.textColor}`}>{config.icon}</div>
        <h2 className={`text-2xl font-bold ${config.textColor}`}>{config.text}</h2>
      </div>
      <div className='text-right'>
         <p className={`text-3xl font-bold ${config.textColor}`}>{percentage}%</p>
         <p className='text-sm text-slate-400'>Confianza</p>
      </div>
    </div>
  );
};

const CitationLink: React.FC<{ citation: FactCheckCitation }> = ({ citation }) => (
  <li className="mb-2">
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start space-x-2 text-sky-400 hover:text-sky-300 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
      <span className="group-hover:underline">{citation.titulo || citation.url}</span>
    </a>
  </li>
);

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700 animate-fade-in">
      <VerdictDisplay verdict={result.veredicto} confianza={result.confianza} />
      
      <div className="space-y-6">
        
        {result.claim_normalizado && (
           <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Afirmación Analizada</h3>
            <p className="text-slate-300 leading-relaxed italic border-l-4 border-slate-600 pl-4">"{result.claim_normalizado}"</p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2 border-t border-slate-700 pt-4">Explicación</h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result.explicacion}</p>
        </div>

        {result.citas.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-3 border-t border-slate-700 pt-4">Fuentes Verificadas</h3>
            <ul className="list-none p-0">
              {result.citas.map((citation, index) => (
                <CitationLink key={index} citation={citation} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
