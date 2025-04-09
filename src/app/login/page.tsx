'use client'
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { LoginSignupFormValue } from "../_types/type"
import LoginSignupForm from "../_components/LoginSignupForm"

export default function Page() {
  const router = useRouter()

  const defaultValues = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginSignupFormValue>({defaultValues})

  const onSubmit = async (data: LoginSignupFormValue) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('ログインに失敗しました')
    } else {
      router.replace('/admin/posts')
    }
  }

  return (
    <LoginSignupForm 
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      mode='login'
      onSubmit={onSubmit}
    />
  )
}