'use client'

import { UseFormHandleSubmit, UseFormRegister, FieldErrors } from "react-hook-form"
import { LoginSignupFormValue } from "../_types/type"

interface Props {
  handleSubmit: UseFormHandleSubmit<LoginSignupFormValue>;
  register: UseFormRegister<LoginSignupFormValue>;
  errors: FieldErrors<LoginSignupFormValue>;
  isSubmitting: boolean;
  mode: 'login' | 'signup';
  onSubmit: (data: LoginSignupFormValue) => Promise<void>;
}

const LoginSignupForm: React.FC<Props> = ({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  mode,
  onSubmit,
}) => {

 return (
  <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px]">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            disabled={isSubmitting}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            {...register('email', {
              required: 'メールアドレスを入力してください。',
              pattern: {
                value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                message: 'メールアドレスの形式が不正です。'
              }
            })}
          />
        </div>
        <div className='ml-[200px] text-red-500'>{errors.email?.message ?? ''}</div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            disabled={isSubmitting}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register('password',{
              required: 'パスワードを入力してください。',
            })}
          />
        </div>
        <div className='ml-[200px] text-red-500'>{errors.password?.message ?? ''}</div>
        <div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {mode === 'login' ? 'ログイン' : '登録'}
          </button>
        </div>
      </form>
    </div>
 )
}

export default LoginSignupForm;