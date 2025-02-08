'use client';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <>
      <div className='errorHandring'>記事が見つかりません。</div>
      <Link className='goHomeBtn' href='/'>ホームに戻る</Link>
    </>
  );
}

export default NotFound;