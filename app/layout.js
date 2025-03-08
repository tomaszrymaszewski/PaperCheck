import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './components/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MathCheck - Math Papers Analysis',
  description: 'A tool for analyzing and checking mathematical papers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
