import React, { useState, useCallback } from 'react';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import { searchWithGoogle } from './services/geminiService';
import type { GroundingChunk } from './types';

/**
 * Filters common boilerplate phrases from the beginning of the API response text.
 * @param text The raw text from the Gemini API.
 * @returns The cleaned text with boilerplate removed.
 */
const filterBoilerplate = (text: string): string => {
  const patternsToRemove = [
    /^I am a large language model, trained by Google\.(?:\s)*/i,
    /^I am currently processing your request and preparing a response\.(?:\s)*/i,
    /^My purpose is to provide information, answer questions, and assist with a variety of tasks by generating human-like text\.(?:\s)*/i,
    // Combined pattern to catch the full user-reported phrase and similar intros
    /I am a large language model, trained by Google\. I am currently processing your request(?:.|\n|\r)*/i
  ];

  let cleanedText = text;
  for (const pattern of patternsToRemove) {
    cleanedText = cleanedText.replace(pattern, '');
  }
  
  return cleanedText.trim();
};


const App: React.FC = () => {
  const [view, setView] = useState<'search' | 'results'>('search');
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setView('results');
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    setSources([]);

    try {
      const results = await searchWithGoogle(searchQuery);
      const cleanedText = filterBoilerplate(results.text);
      setSearchResults(cleanedText);
      setSources(results.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewSearch = useCallback(() => {
    setView('search');
    setQuery('');
    setSearchResults(null);
    setSources([]);
    setError(null);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {view === 'search' ? (
        <SearchPage 
          onSearch={handleSearch} 
        />
      ) : (
        <ResultsPage
          query={query}
          results={searchResults}
          sources={sources}
          isLoading={isLoading}
          error={error}
          onSearch={handleSearch}
          onNewSearch={handleNewSearch}
        />
      )}
    </div>
  );
};

export default App;