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
    <header className="nav">
      <Link href='/' className='headerLink'>
        Blog
      </Link>
      {!isLoading && (
        <div>
          {session ? (
            <>
              <Link href='/admin/posts' className='headerLink'>
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href='/contact' className='headerLink'>
                お問い合わせ
              </Link>
              <Link href='/login' className='headerLink'>
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}