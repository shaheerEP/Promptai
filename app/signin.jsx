'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }

    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      setError('An error occurred during sign in. Please try again.');
    }
  }, [status, router, searchParams]);

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/' });
      if (result?.error) {
        setError('An error occurred during sign in. Please try again.');
        console.error('Sign in error:', result.error);
      }
    } catch (error) {
      setError('An error occurred during sign in. Please try again.');
      console.error('Sign in error:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;