'use client'
import React from "react";
import useFetch from "../_hooks/useFetch";
import Loading from "@/app/_components/Loading";
import Link from "next/link";
import NotFound from "@/app/_components/Not-found";
import { ApiResponseCategories } from "@/app/_types/type";

const AdminCategories: React.FC = () => {
  const { data, error, isLoading } = useFetch<ApiResponseCategories>('/api/admin/categories')

  if (isLoading) {
    return <Loading />
  }

  if (!data?.categories || data?.categories.length === 0) {
    return <NotFound />
  }

  const categories = data.categories;

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