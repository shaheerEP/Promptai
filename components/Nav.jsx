'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  const handleDropdownClick = () => setDropdownOpen(false)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })

    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // Clear localStorage
    localStorage.clear()

    // Clear sessionStorage
    sessionStorage.clear()

    // Perform a hard reload of the page
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <Link href="/" className="flex items-center">
        <img src="/assets/images/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="hidden md:block ml-2 text-xl font-bold">Promptai</span>
      </Link>

      <div className="flex items-center space-x-4">
        {status === 'loading' ? null : session ? (
          <>
            <Link
              href="/create-prompt"
              className="hidden md:block px-4 py-2 bg-black text-white rounded"
            >
              Create Prompt
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={session.user.image || '/assets/images/profile.png'}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleDropdownClick}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 md:hidden"
                    onClick={handleDropdownClick}
                  >
                    Create Prompt
                  </Link>
                  {session && (
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => {
                        handleDropdownClick()
                        handleSignOut()
                      }}
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              )}
            </div>
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
  )
}

export default Navbar
