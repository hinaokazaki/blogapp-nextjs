'use client'
import Link from "next/link";
import { ReactNode } from "react";
import useRouteGuard from "./_hooks/useRouteGuard";

export default function SideBarNavigation({ children }: { children: ReactNode}) {
  useRouteGuard();

  return (
    <>
      <main>
        <div className="sidebar">
          <nav className='sidebarMenu'>
            <ul className="sidebarItems">
              <li><Link className='sidebarMenuLink' href='/admin/posts'>記事一覧</Link></li>
              <li><Link className='sidebarMenuLink' href='/admin/categories'>カテゴリー一覧</Link></li>
            </ul>
          </nav>
          <div className="adminMain">
            {children}
          </div>
        </div>
      </main>
    </>
  )
} 