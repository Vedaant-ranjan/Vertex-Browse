
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2] dark:bg-[#171717] text-sm text-gray-500 dark:text-gray-400">
      <div className="px-8 py-3 border-b border-gray-300 dark:border-gray-700">
        <p>United States</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-3 space-y-2 md:space-y-0">
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Advertising</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">How Search works</a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
