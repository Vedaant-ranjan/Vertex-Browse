import React from 'react';

export const SearchIcon: React.FC<{color?: string}> = ({color = 'currentColor'}) => (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5 text-gray-400"
    fill={color}
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

export const MicIcon: React.FC = () => (
  <svg
    className="h-6 w-6"
    focusable="false"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285f4"
      d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.35-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
    ></path>
    <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
    <path
      fill="#fbbc05"
      d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
    ></path>
    <path
      fill="#ea4335"
      d="m12 16.93a4.97 5.27 0 0 1 -3.54 -1.55l-1.41 1.41a7.02 8.07 0 0 0 10.02 0l-1.41-1.41a4.97 5.27 0 0 1 -3.66 1.55z"
    ></path>
  </svg>
);

export const AppGridIcon: React.FC = () => (
    <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" focusable="false" viewBox="0 0 24 24">
        <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
    </svg>
);

export const SparklesIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5L13.1339 7.86603L18.5 9L13.1339 10.134L12 15.5L10.866 10.134L5.5 9L10.866 7.86603L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4.5 14L5.25 16.25L7.5 17L5.25 17.75L4.5 20L3.75 17.75L1.5 17L3.75 16.25L4.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M19.5 14L18.75 16.25L16.5 17L18.75 17.75L19.5 20L20.25 17.75L22.5 17L20.25 16.25L19.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
);