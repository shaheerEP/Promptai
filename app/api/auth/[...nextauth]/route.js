import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refreshToken = account.refresh_token;
        token.picture = profile.picture; 

        console.log('Token set:', {
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
          refreshToken: token.refreshToken,
          picture: token.picture, // Log the profile picture URL
        });
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log('Token is valid:', {
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
        });
        return token;
      }

      console.log('Token expired, refreshing...');
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user.picture = token.picture; // Include the profile picture URL in the session
      return session;
    },
  },
};

async function refreshAccessToken(token) {
  try {
    const url = https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken};

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log('Refreshed tokens:', refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      picture: token.picture, // Ensure the profile picture URL is retained
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};