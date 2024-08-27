// app/signin.jsx
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Call the API to add the user to the database
      const addUser = async () => {
        console.log('Making POST request to /api/addUser'); // Add this line
        const response = await fetch('/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }),
        });

        const data = await response.json();
        if (data.success) {
          console.log('User added successfully:', data.data);
        } else {
          console.error('Error adding user:', data.error);
        }
      };

      addUser();
      router.push('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <button
        onClick={() => signIn('google')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
