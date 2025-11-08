import React, { useState, useCallback } from 'react';
import { factCheckWithGemini } from './services/geminiService';
import { FactCheckResult } from './types';
import Header from './components/Header';
import Loader from './components/Loader';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleVerify = useCallback(async () => {
    if (!query.trim()) {
      setError('Por favor, introduce texto o un enlace para verificar.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiResult = await factCheckWithGemini(query);
      setResult(apiResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Verificar Noticia o Enlace</h2>
          <p className="text-slate-400 mb-6">Pega aquí el texto de una noticia o un enlace (URL) para analizar su veracidad.</p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-slate-300 mb-1 sr-only">
                Noticia o enlace a verificar
              </label>
              <textarea
                id="query"
                rows={4}
                className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow placeholder-slate-500"
                placeholder="Ej: 'https://ejemplo.com/noticia' o 'El cielo es verde según un estudio reciente...'"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if(error) setError(null);
                }}
                disabled={isLoading}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleVerify}
              disabled={isLoading || !query.trim()}
              className="w-full flex items-center justify-center sm:w-auto px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                 <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Verificar ahora
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          {isLoading && <Loader />}
          {error && (
            <div className="bg-rose-900/50 border-l-4 border-rose-500 text-rose-200 p-4 rounded-lg" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {result && <ResultCard result={result} />}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        Potenciado por la API de Google Gemini.
      </footer>
    </div>
  );
};

export default App;