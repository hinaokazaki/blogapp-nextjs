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
        <button onClick={() => reset()} type='button' className='resetBtn'>リトライ</button>
      </div>
    </>
  );
}

export default Error;