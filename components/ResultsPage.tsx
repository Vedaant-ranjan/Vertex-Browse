import React, { useState } from 'react';
import type { GroundingChunk } from '../types';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { SearchIcon, MicIcon, SparklesIcon } from './icons';
import Favicon from './Favicon';

interface ResultsPageProps {
  query: string;
  results: string | null;
  sources: GroundingChunk[];
  isLoading: boolean;
  error: string | null;
  onSearch: (query: string) => void;
  onNewSearch: () => void;
}

// Helper function to render inline markdown like **bold**
const renderInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const FormattedResults: React.FC<{ results: string | null }> = ({ results }) => {
  if (!results) return null;
  
  // Normalize newlines and split into blocks
  const blocks = results.replace(/\r\n/g, '\n').split('\n\n');
  
  return (
    <>
      {blocks.map((block, index) => {
        const trimmedBlock = block.trim();
        if (trimmedBlock === '') return null;

        // Handle unordered lists
        if (trimmedBlock.startsWith('* ') || trimmedBlock.startsWith('- ')) {
          const items = trimmedBlock.split('\n').map((item, itemIndex) => (
            <li key={itemIndex} className="list-disc ml-5 mb-1">
              {renderInline(item.substring(item.indexOf(' ')+1))}
            </li>
          ));
          return <ul key={index} className="mb-4">{items}</ul>;
        }

        // Handle headings
        if (trimmedBlock.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold my-4">{renderInline(trimmedBlock.substring(3))}</h2>;
        }
        if (trimmedBlock.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold my-4">{renderInline(trimmedBlock.substring(2))}</h1>;
        }

        // Handle paragraphs, preserving internal newlines
        return (
          <p key={index} className="mb-4">
            {trimmedBlock.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {renderInline(line)}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
};

// New component for rendering breadcrumbs
const Breadcrumbs: React.FC<{ uri: string; title: string; }> = ({ uri, title }) => {
  // Handle Gemini API's redirect URLs by attempting to extract the source from the title
  if (uri.includes('vertexaisearch.cloud.google.com')) {
    const titleParts = title.split(' - ');
    // Use the last part of the title as the site name, which is a common pattern.
    // Fallback to the whole title if there's no " - ".
    const siteName = titleParts.length > 1 ? titleParts[titleParts.length - 1].trim() : title;

    return (
      <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-600 dark:text-gray-300 truncate">
        <span className="truncate">vertex</span>
        <span className="mx-1 text-gray-500 flex-shrink-0">{'>'}</span>
        <span className="truncate">{siteName}</span>
      </div>
    );
  }
  
  let url: URL;
  try {
    url = new URL(uri);
  } catch (e) {
    try {
      url = new URL(`https://${uri}`);
    } catch (e2) {
      console.warn(`Could not parse URL for breadcrumbs: ${uri}`);
      return <div className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-600 dark:text-gray-300 truncate">{uri}</div>;
    }
  }

  const hostname = url.hostname.replace(/^www\./, '');
  const pathSegments = url.pathname.split('/').filter(p => p); // filter out empty segments
  const displayParts = [hostname, ...pathSegments];
  
  return (
    <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-600 dark:text-gray-300 truncate">
      {displayParts.map((part, index) => (
        <React.Fragment key={index}>
          <span className="truncate">{decodeURIComponent(part)}</span>
          {index < displayParts.length - 1 && <span className="mx-1 text-gray-500 flex-shrink-0">{'>'}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};


const ResultsPage: React.FC<ResultsPageProps> = ({
  query,
  results,
  sources,
  isLoading,
  error,
  onSearch,
  onNewSearch,
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);

  const handleVoiceResult = (transcript: string) => {
    setCurrentQuery(transcript);
    onSearch(transcript);
  };

  const { isListening, error: voiceError, toggleListening, isSupported } = useVoiceSearch(handleVoiceResult);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(currentQuery);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#202124]">
      <header className="sticky top-0 bg-white dark:bg-[#202124] border-b border-gray-200 dark:border-gray-700 z-10 p-4">
        <div className="flex items-center space-x-4 md:space-x-6">
          <div onClick={onNewSearch} className="select-none cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Vertexbrowselogo.png" 
                alt="Vertex" 
                className="h-7 w-auto" 
              />
          </div>
          <form onSubmit={handleSubmit} className="flex-grow max-w-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={currentQuery}
                onChange={handleInputChange}
                className="w-full pl-4 pr-20 py-2.5 bg-white dark:bg-[#303134] border border-gray-300 dark:border-gray-500 rounded-full shadow-md focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute right-3 flex items-center space-x-2">
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
                 <button type="submit" className="p-2">
                    <SearchIcon color="#4285F4" />
                 </button>
              </div>
            </div>
          </form>
          <div className="flex items-center ml-auto pl-4">
          </div>
        </div>
        {voiceError && <p className="text-red-500 text-center text-sm mt-2">{voiceError}</p>}
      </header>
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {isLoading && 
            <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          }
          {error && <p className="text-red-500">{error}</p>}
          {results && (
            <div className="space-y-8">
              {/* AI Overview */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <SparklesIcon />
                  AI-powered overview
                </h2>
                <div className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                    <FormattedResults results={results} />
                </div>
              </div>
              
              {/* Web Results */}
              <div>
                {sources.map((source, index) => (
                  <div key={index} className="mb-7">
                    <a href={source.web.uri} className="group block">
                       <div className="flex items-center mb-1">
                        <Favicon uri={source.web.uri} />
                        <Breadcrumbs uri={source.web.uri} title={source.web.title} />
                      </div>
                      <h3 className="text-xl text-blue-800 dark:text-blue-400 group-hover:underline font-medium">
                        {source.web.title}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;