'use client'
import Link from "next/link";
import { ReactNode } from "react";
import useRouteGuard from "./_hooks/useRouteGuard";

export default function SideBarNavigation({ children }: { children: ReactNode}) {
  useRouteGuard();

  return (
    <>
      <main>
        <div className="flex">
          <nav className='w-[25%] h-[100vh] bg-[#e6e7ee]'>
            <ul className="flex flex-col">
              <li><Link className='p-4 font-bold text-[#333] no-underline block hover:bg-[#9ec2ff]' href='/admin/posts'>記事一覧</Link></li>
              <li><Link className='p-4 font-bold text-[#333] no-underline block hover:bg-[#9ec2ff]' href='/admin/categories'>カテゴリー一覧</Link></li>
            </ul>
          </nav>
          <div className="p-4 w-[75%]">
            {children}
          </div>
        </div>
      </main>
    </>
  )
} 