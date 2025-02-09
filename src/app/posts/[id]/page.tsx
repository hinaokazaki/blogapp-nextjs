'use client';
import { useState, useEffect } from 'react';
import { MicroCmsPost } from '@/app/_types/type';
import { useParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import NotFound from '@/app/_components/Not-found';
import PostUi from '../_components/PostUi';

const Posts: React.FC = () => {
  const params = useParams();
  const id = params.id
  console.log(id);

  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true)
      const res = await fetch(`https://kvjqi36xjz.microcms.io/api/v1/posts/${id}`, {
        headers: {
          'X-MICROCMS-API-KEY': process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      })
      const data = await res.json();
      setPost(data)
      setIsLoading(false)
    }

    fetcher(); 

  },[id])

  if(isLoading) {
    return <Loading />
  }

  if (!post) {
    return <NotFound />
  }
  
  return (
    <>
      <main id='main'>
        <PostUi post={post} />
      </main>
    </>
  )
}

export default Posts;