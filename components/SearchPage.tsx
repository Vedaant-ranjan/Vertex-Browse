import React, { useState } from 'react';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { SearchIcon, MicIcon, AppGridIcon } from './icons';

interface SearchPageProps {
  onSearch: (query: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleVoiceResult = (transcript: string) => {
    setQuery(transcript);
    onSearch(transcript);
  };

  const { isListening, error: voiceError, toggleListening, isSupported } = useVoiceSearch(handleVoiceResult);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#202124]">
      <header className="flex justify-end items-center p-4 text-sm">
        <a href="#" className="mr-4 hover:underline text-gray-800 dark:text-gray-200">Gmail</a>
        <a href="#" className="mr-4 hover:underline text-gray-800 dark:text-gray-200">Images</a>
        <button className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <AppGridIcon />
        </button>
        <button className="bg-[#1a73e8] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#1b66c9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign in
        </button>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center -mt-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Vertexbrowselogo.png" 
          alt="Vertex" 
          className="w-[272px] h-auto mb-8" 
        />
        
        <form onSubmit={handleSubmit} className="w-full max-w-lg md:max-w-xl lg:max-w-2xl px-4">
          <div className="relative flex items-center">
            <div className="absolute left-4">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-3 bg-white dark:bg-[#303134] border border-gray-200 dark:border-gray-500 rounded-full hover:shadow-md focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute right-4">
              <button
                type="button"
                onClick={toggleListening}
                disabled={!isSupported}
                className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={isListening ? "Stop listening" : "Search by voice"}
              >
                {isListening && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                )}
                <MicIcon />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              type="button"
              onClick={handleSearchClick}
              className="bg-[#f8f9fa] dark:bg-[#303134] text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md text-sm hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Vertex Search
            </button>
            <button
              type="button"
              onClick={handleSearchClick}
              className="bg-[#f8f9fa] dark:bg-[#303134] text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md text-sm hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              I'm Feeling Lucky
            </button>
          </div>
          {voiceError && <p className="text-red-500 text-center mt-4 text-sm">{voiceError}</p>}
        </form>
      </main>
      
    </div>
  );
};

export default SearchPage;