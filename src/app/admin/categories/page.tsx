'use client'
import React from "react";
import { useState, useEffect } from "react";
import Loading from "@/app/_components/Loading";
import Link from "next/link";
import { CategoryData } from "@/app/_types/type";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const AdminCategories: React.FC = () => {
  const [ categories, setCategories ] = useState<CategoryData[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const { token } = useSupabaseSession();
 
  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      try {
        const res = await fetch('/api/admin/categories', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            authorization: token,
          },
        })

        const data = await res.json();
        if (!res.ok) {
          throw new Error();
        } else {
          console.log(data.categories);
        }

        setCategories(Array.isArray(data.categories) ? data.categories : []);
      } catch (error) {
        console.error('エラーが発生しました。', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetcher();
  },[token])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <main>
        <div>
          <div className="flex justify-between">
            <h1 className='text-2xl text-[#333] font-bold'>カテゴリー一覧</h1>
            <Link className='mx-4 w-[100px] tezt--lg text-lg/2.4 text-center block 
              no-underline py-2 px-4 text-[rgb(255,255,255)] bg-[rgb(31,41,55)] 
              border-0 rounded-lg font-bold cursor-pointer' href={'/admin/categories/new'}>
              新規作成
            </Link>
          </div>
          <div className="mt-16">
            {categories.length === 0 ? (
              <p>表示できるカテゴリーがありません。</p>
            ) : (
              categories.map((elem) => (
                <React.Fragment key={elem.id}>
                  <Link className='no-underline' href={`/admin/categories/${elem.id}`}>
                    <div className='m-4'>
                      <div className='text-4 font-bold text-[#4d4f5b]'>{elem.name}</div>
                    </div>
                  </Link>
                  <hr className="h-[0.8px] bg-[#b7b8be] border-none"/>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminCategories;