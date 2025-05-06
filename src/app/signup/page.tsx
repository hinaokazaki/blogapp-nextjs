'use client'
import { supabase } from "@/utils/supabase";
import LoginSignupForm from "../_components/LoginSignupForm";
import { useRouter } from "next/navigation";
import { LoginSignupFormValue } from "../_types/type";

export default function Page() {
  const router = useRouter(); 

  const onSubmit = async (data: LoginSignupFormValue) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    })
    if (error) {
      alert('登録に失敗しました')
    } else {
      alert('確認メールを送信しました。')
      router.replace('/admin/posts')
    }
  }

  return (
    <LoginSignupForm 
      mode='signup'
      onSubmit={onSubmit}
    />
  )
}
