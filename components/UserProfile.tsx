import React, { useState, useRef, useEffect } from 'react';
import type { User } from 'firebase/auth';

interface UserProfileProps {
  user: User;
  onSignOut: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`}
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#2d2e30] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
          <div className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`}
              alt="User Profile"
              className="w-16 h-16 rounded-full mb-3 mx-auto"
            />
            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{user.displayName || 'User'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                onSignOut();
                setIsOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
