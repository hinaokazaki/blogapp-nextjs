'use client';
import { useForm } from 'react-hook-form';
import classes from './Contact.module.css';

type Data = {
  name: string,
  email: string,
  message: string,
}

const Contact: React.FC = () => {
  // 既定値を準備
  const defaultValues = {
    name: '',
    email: '',
    message: '',
  }

  // フォームを初期化
  const {
    register, // フォームの入力フィールドを登録
    handleSubmit, // フォーム送信の処理をラップ
    reset, // クリアボタンで使用する、フォームをリセット
    formState: { errors, isSubmitting } // エラーと送信状態を管理
  } = useForm<Data>({defaultValues});

  // サブミット時の処理、APIでデータを送信してアラート表示
  const onSubmit = async (data: Data) => {
    try {
      const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('送信しました。');
        handleClear();
      } else {
        throw new Error();
      }
    } catch(error) {
      console.log('エラー:', error);
      alert('エラーが発生しました。');
    } 
  };

  // クリアボタンの処理、フォームをリセット
  const handleClear = () => reset();

  return (
    <>
      <div className='mt-[40px] mx-auto px-[10px] max-w-[800px]'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className='text-2xl mb-[40px]'>問合わせフォーム</h1>
          <div className='mb-[40px]'>
            <div className='flex'>
              <label className='w-[200px] text-lg' htmlFor='name'>お名前</label>
              <input className='max-w-[calc(100%-10px)] h-[50px] m-0 p-0 rounded-lg flex-1 border-[1px] border-solid border-[rgb(198,198,198)]' id='name' type='text' disabled={isSubmitting}
                {...register('name', {
                  required: '名前は必須入力です。',
                  maxLength: {
                    value: 30,
                    message: '名前は３０文字以内にしてください。'
                  }
                })}/>
            </div>
            {/* ??（ヌル合体演算子）でundefined または null のときに代わりの値を指定する */}
            <div className='ml-[200px] text-red-500'>{errors.name?.message ?? ''}</div> 
          </div>
          <div className='mb-[40px]'>
            <div className='flex'>
              <label className='w-[200px] text-lg' htmlFor='email'>メールアドレス</label>
              <input className='max-w-[calc(100%-10px)] h-[50px] m-0 p-0 rounded-lg flex-1 border-[1px] border-solid border-[rgb(198,198,198)]' id='email' type='text' disabled={isSubmitting}
                {...register('email', {
                  required: 'メールアドレスは必須入力です。',
                  pattern: {
                    value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                    message: 'メールアドレスの形式が不正です。'
                  }
                })}/>
            </div>
            <div className='ml-[200px] text-red-500'>{errors.email?.message ?? ''}</div>
          </div>
          <div className='mb-[40px]'>
            <div className='flex'>
              <label className='w-[200px] text-lg' htmlFor='message'>本文</label>
              <textarea className='max-w-[calc(100%-10px)] h-[200px] m-0 p-0 rounded-lg flex-1 border-[1px] border-solid border-[rgb(198,198,198)]' id='message' disabled={isSubmitting} 
              {...register('message', {
                required: '本文は必須入力です。',
                maxLength: {
                  value: 500,
                  message: '本文は５００字以内にして下さい。'
                }
              })}/>
            </div>
            <div className='ml-[200px] text-red-500'>{errors.message?.message ?? ''}</div>
          </div>
          <div className='my-[50px] mx-auto flex justify-center'>
            <button className='mx-[10px] py-2 px-4 bg-[rgb(31,41,55)] text-[rgb(255,255,255)] text-lg font-bold border-0 rounded-lg cursor-pointer' type="submit" disabled={isSubmitting}>
              送信
            </button>
            <button className='mx-[10px] py-2 px-4 bg-[rgb(198,198,198)] text-[rgb(31,41,55)] text-lg font-bold border-0 rounded-lg cursor-pointer' type="button" onClick={handleClear} disabled={isSubmitting}>
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;