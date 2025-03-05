import './globals.css';
import { AuthProvider } from './components/AuthContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MathCheck - AI-Powered Math Analysis',
  description: 'Analyze your math papers with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Fallback styles in case Tailwind isn't loading */}
        <style jsx global>{`
          body {
            background-color: #121212;
            color: white;
            font-family: 'Inter', sans-serif;
          }
          
          button, select, input {
            background-color: #2c3542;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
          }
          
          button:hover {
            background-color: #0073f5;
          }
        `}</style>
      </body>
    </html>
  );
}
