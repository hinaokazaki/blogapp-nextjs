'use client'
import React from "react"
import { useState, useEffect } from "react"
import { PostData } from "@/app/_types/type"
import Loading from "@/app/_components/Loading"
import Link from "next/link"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"

const AdminPosts: React.FC = () => {
  const [ posts, setPosts ] = useState<PostData[]>([])
  const [ isLoading, setIsLoading ] = useState(true)

  const { token } = useSupabaseSession()

  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      try {
        const res = await fetch('/api/admin/posts', {
          method: 'GET',
          headers: {
            'content-Type': 'application/json',
            Authorization: token,
          },
         })

         const data = await res.json()
         setPosts(data.posts)
         console.log(data);
      } catch (error) {
        console.error('記事の取得に失敗しました。', error);
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    };

    fetcher();
  },[token]);

  if (isLoading) {
    return <Loading/>
  }

  console.log(posts);
  return (
    <>
      <div>
        <div className="adminSubMenu">
          <h1 className='adminTitle'>記事一覧</h1>
          <Link className='adminCreateButton' href={'/admin/posts/new'}>新規作成</Link>
        </div>
        <div className="adminContentList">
          {posts.length === 0 ? (
            <p>表示できる記事がありません。</p>
          ) : (
            posts.map((elem) => ( 
              <React.Fragment key={elem.id}>
                <Link className='adminContentLink' href={`/admin/posts/${elem.id}`}>
                  <div className='adminContent'>
                    <div className='adminContentTitle'>{elem.title}</div>
                    <div className='adminContentDate'>{new Date(elem.createdAt).toLocaleDateString()}</div>
                  </div>
                </Link>
                <hr className="adminLine"/>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  )
};

export default AdminPosts;