'use client' 
import Link from "next/link"
import React from "react"
import { useSupabaseSession } from "../_hooks/useSupabaseSession"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"

export const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/') // `window.location.href` の代わり
  }

  const { session, isLoading } = useSupabaseSession()

  return (
    <header className="py-4 bg-[#333] flex justify-between">
      <Link href='/' className='text-white text-xl font-bold mx-8 py-2 px-4'>
        Blog
      </Link>
      {!isLoading && (
        <div className="flex">
          {session ? (
            <>
              <Link href='/admin/posts' className='text-white text-xl font-bold mr-8 py-2 px-4'>
                管理画面
              </Link>
              <button className='text-white text-xl font-bold mr-8 py-2 px-4'
                onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href='/contact' className='text-white text-xl font-bold mr-8 py-2 px-4'>
                お問い合わせ
              </Link>
              <Link href='/login' className='text-white text-xl font-bold mr-8 py-2 px-4'>
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}