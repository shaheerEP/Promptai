// app/layout.jsx
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@components/Nav'
import Provider from '@components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI-Powered Prompts',
  description: 'Generated by create next app',
}

function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Provider>
          <Navbar />
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
