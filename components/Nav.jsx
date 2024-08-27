'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <img src="/assets/images/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="hidden md:block ml-2 text-xl font-bold">Promptai</span>
      </div>
      <div className="flex items-center space-x-4">
        {status === 'loading' ? (
          <button className="px-4 py-2 bg-black text-white rounded">Sign In</button>
        ) : session ? (
          <>
            <Link href="/create" legacyBehavior>
              <a className="hidden md:block px-4 py-2 bg-black text-white rounded">Create Prompt</a>
            </Link>
            <button
              onClick={() => signOut()}
              className="hidden md:block px-4 py-2 bg-black text-white rounded"
            >
              Sign Out
            </button>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative"
            >
              <img
                src={session.user.image || '/assets/images/user.png'}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <Link href="/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleDropdownClick}>My Profile</a>
                  </Link>
                  <Link href="/create" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleDropdownClick}>Create Prompt</a>
                  </Link>
                  <button className="block w-full  px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => { handleDropdownClick(); signOut(); }}>
                    Sign Out
                  </button>
                </div>
              )}
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
