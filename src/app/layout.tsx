import Link from 'next/link';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import "./globals.css";

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
      <body id='body'>
        <header>
          <nav className='nav'>
            <ul>
              <li><Link className='headerLink' href='/'>Blog</Link></li>
              <li><Link className='headerLink' href='/contact'>お問い合わせ</Link></li>
            </ul>
          </nav>
        </header>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}

