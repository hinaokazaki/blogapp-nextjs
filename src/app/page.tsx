'use client';
import React from 'react';
import { PostData } from '@/app/_types/type';
import useSWR from 'swr'
import Link from 'next/link';
import Categories from '@/app/_components/Categories';
import Text from '@/app/_components/Text';
import Loading from './_components/Loading';
import NotFound from './_components/Not-found';
import { fetcher } from '@/lib/fetcher';
import { ApiResponsePosts } from '@/app/_types/type';

const Home: React.FC = () => {
  // SWRを使ったAPIリクエスト
  const { data, error, isLoading } = useSWR<ApiResponsePosts>('/api/posts', fetcher);

  // 本文のテキストに文字制限をかけた後にhtmlとして表示するようにする関数
  const maxLength: number = 60;
  const fixContentsLength = (content: string) => content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  
  // データが取得される間のローディング中の表示、早期リターン
  if (isLoading)
    return <Loading />
  
  // ローディングが終わってpostsが空である時の表示、早期リターン
  if(error || !data?.posts || data.posts.length === 0) 
    return <NotFound />

  const posts: PostData[] = data.posts;
  
  return (
    <>
      <main id='main' className='my-[40px] mx-auto'>
        {posts.map((elem) => ( 
          <React.Fragment key={elem.id}>
            <div className='max-w-[1000px] m-auto'>
              <div className='px-4'>
                <Link className='no-underline block text-[#222]' href={`/posts/${elem.id}`}>
                  <div className='max-w-[100%] highet-auto mt-12 mx-auto mb-0 flex flex-col border-[1px] border-solid border-[#ccc]'>
                    <div className='pt-4 px-4 flex justify-between'>
                      <div className='text-[#ccc]'>{new Date(elem.createdAt).toLocaleDateString()}</div>
                      <Categories postCategories={elem.postCategories}/>
                    </div>
                    <div className='mb-[5%] ml-[5%]'>
                      <h1 className='text-2xl text-extralight'>APIで取得した{elem.title}</h1>
                      <Text content={fixContentsLength(elem.content)}/>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </React.Fragment>
        ))}
      </main>
    </>
  );
}

export default Home;