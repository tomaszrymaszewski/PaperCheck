import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MathCheck - AI-powered Mathematics Analysis',
  description: 'Get detailed feedback on your math papers with MathCheck',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add this script to detect if JS is working, which can help with fallbacks */}
        <script dangerouslySetInnerHTML={{ 
          __html: `
            document.documentElement.classList.add('js-focus-visible');
          `
        }} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
