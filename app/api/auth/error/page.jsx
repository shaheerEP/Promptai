'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const AuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500 mb-4">
          {error || 'An error occurred during authentication. Please try again.'}
        </p>
        <Link href="/signin" className="text-blue-500 hover:underline">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
};

export default AuthError;