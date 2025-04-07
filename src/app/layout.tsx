import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import "./globals.css";
import { Header } from './_components/Header';

// google font を有効化
const fnt = Inter({ subsets: ['latin']});

// meta dataを定義
export const metadata = {
  title: 'Blog App',
  description: 'Next.js を使ったブログアプリ'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body id='body' className='p-0 m-0'>
        <Header />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}

