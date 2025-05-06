'use client';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <>
      <div className='mt-5 text-xl text-center'>記事が見つかりません。</div>
      <Link className='my-5 mx-auto w-[160px] text-center block no-underline py-2 px-4 
      text-[rgb(255,255,255)] bg-[rgb(31,41,55)] border-0 rounded-lg text-lg 
      font-bold cursor-pointer' href='/'>ホームに戻る</Link>
    </>
  );
}

export default NotFound;