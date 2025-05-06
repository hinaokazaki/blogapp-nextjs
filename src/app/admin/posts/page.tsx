'use client'
import React from "react"
import { PostData } from "@/app/_types/type"
import Loading from "@/app/_components/Loading"
import Link from "next/link"
import NotFound from "@/app/_components/Not-found"
import { ApiResponsePosts } from "@/app/_types/type"
import useFetch from "../_hooks/useFetch"

const AdminPosts: React.FC = () => {
  const { data, error, isLoading } = useFetch<ApiResponsePosts>('/api/admin/posts')

  console.log(data)
  if (isLoading) {
    return <Loading/>
  }

  if (!data?.posts || data.posts.length === 0) {
    return <NotFound />
  }

  const posts: PostData[] = data.posts;

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className='text-2xl text-[#333] font-bold'>記事一覧</h1>
          <Link className='mx-4 w-[100px] tezt--lg text-lg/2.4 text-center block 
              no-underline py-2 px-4 text-[rgb(255,255,255)] bg-[rgb(31,41,55)] 
              border-0 rounded-lg font-bold cursor-pointer' href={'/admin/posts/new'}>
              新規作成
            </Link>
        </div>
        <div className="mt-16">
          {posts.length === 0 ? (
            <p>表示できる記事がありません。</p>
          ) : (
            posts.map((elem) => ( 
              <React.Fragment key={elem.id}>
                <Link className='no-underline' href={`/admin/posts/${elem.id}`}>
                  <div className='m-4'>
                    <div className='text-4 font-bold text-[#4d4f5b]'>{elem.title}</div>
                    <div className='text-4 text-[#b7b8be]'>{new Date(elem.createdAt).toLocaleDateString()}</div>
                  </div>
                </Link>
                <hr className="h-[0.8px] bg-[#b7b8be] border-none"/>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  )
};

export default AdminPosts;