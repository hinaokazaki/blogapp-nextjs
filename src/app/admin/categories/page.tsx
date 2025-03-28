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
          <div className="adminSubMenu">
            <h1 className='adminTitle'>カテゴリー一覧</h1>
            <Link className='adminCreateButton' href={'/admin/categories/new'}>新規作成</Link>
          </div>
          <div className="adminContentList">
            {categories.length === 0 ? (
              <p>表示できるカテゴリーがありません。</p>
            ) : (
              categories.map((elem) => (
                <React.Fragment key={elem.id}>
                  <Link className='adminContentLink' href={`/admin/categories/${elem.id}`}>
                    <div className='adminContent'>
                      <div className='adminContentTitle'>{elem.name}</div>
                    </div>
                  </Link>
                  <hr />
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