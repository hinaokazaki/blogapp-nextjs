'use client';
import { useState, useEffect } from 'react';
import { Post } from '@/app/_types/type';
import { useParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import NotFound from '@/app/_components/Not-found';
import PostUi from '../_components/PostUi';

type ApiRes = {
  post: Post
}

const Posts: React.FC = () => {
  const params = useParams();
  const targetedId = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${targetedId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: ApiRes = await res.json();
        setPost(data.post);
      } catch(error) {
        console.error("Failed to fetch post data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetcher(); 

  },[targetedId])

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