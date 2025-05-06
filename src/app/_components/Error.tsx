'use client';
import { useEffect } from 'react';

type Props = {
  error: Error,
  reset: () => void;
};

const Error: React.FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error); // consoleにエラーを表示
  },[error]);

  return (
    <>
      <div>
        <p>エラーが発生しました</p>
        <p>{error.message}</p>
        <button 
          onClick={() => reset()} 
          type='button' 
          className='my-5 mx-auto w-[100px] text-center block no-underline 
          py-2 px-4 border-0 text-[rgb(255,255,255)] bg-[rgb(31,41,55)] 
          text-lg font-bold cursor-pointer rounded-xl'>リトライ</button>
      </div>
    </>
  );
}

export default Error;