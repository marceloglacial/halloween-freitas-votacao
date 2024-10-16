import type { Metadata } from 'next';
import './globals.css';
import { defaultFont } from '@/util/fonts';

export const metadata: Metadata = {
  title: 'Haloween dos Freitas - Votação Online',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='halloween'>
      <body className={`${defaultFont.className} antialiased`}>
        <div className='flex items-center justify-center w-screen min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  );
}
