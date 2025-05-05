'use client'
import { LoginSignupFormValue } from "../_types/type"
import Input from './Input'
import { useForm } from "react-hook-form"
import Label from "./Label"
import ErrorMessage from "./ErrorMessage"

interface Props {
  mode: 'login' | 'signup';
  onSubmit: (data: LoginSignupFormValue) => Promise<void>;
}

const LoginSignupForm: React.FC<Props> = ({onSubmit, mode}) => {
  const defaultValues = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginSignupFormValue>({defaultValues})

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px]">
        <div>
          <Label name='email' title='メールアドレス' />
          <Input 
            type='email'
            disabled={isSubmitting}
            {...register('email', {
              required: 'メールアドレスを入力してください。',
                pattern: {
                  value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                  message: 'メールアドレスの形式が不正です。'}
            })}
            placeholder="name@company.com"
          />
        </div>
        <ErrorMessage errors={errors} name='email' />
        <div>
          <Label name='password' title='パスワード' />
          <Input
            type='password'
            disabled={isSubmitting}
            {...register('password', {
              required: 'パスワードを入力してください。',
            })}
            placeholder="••••••••"
          />
        </div>
        <ErrorMessage errors={errors} name='password' />
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