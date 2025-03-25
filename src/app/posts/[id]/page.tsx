'use client';
import { useState, useEffect } from 'react';
import { PostData } from '@/app/_types/type';
import { useParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import NotFound from '@/app/_components/Not-found';
import PostUi from '../_components/PostUi';

const Posts: React.FC = () => {
  const params = useParams();
  const id = params.id
  console.log(id);

  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json();
      setPost(data.post)
      console.log('page', data.post);
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