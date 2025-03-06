import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './components/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MathCheck - AI-powered Mathematics Analysis',
  description: 'Get detailed feedback on your math papers with MathCheck',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ 
          __html: `
            document.documentElement.classList.add('js-focus-visible');
          `
        }} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
