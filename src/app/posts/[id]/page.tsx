'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { PostData } from '@/app/_types/type';
import { useParams } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import NotFound from '@/app/_components/Not-found';
import PostUi from '../_components/PostUi';

type ApiResponse = {
  post: PostData
}

const Post: React.FC = () => {
  const params = useParams();
  const id = params.id

  const { data, error, isLoading } = useSWR<ApiResponse>(`/api/posts/${id}`, fetcher)
  
  if(isLoading) {
    return <Loading />
  }

  if (!data?.post) {
    return <NotFound />
  }

  const post: PostData = data.post;
  
  return (
    <>
      <main id='main' className='my-[40px] mx-auto'>
        <PostUi post={post} />
      </main>
    </>
  )
}

export default Post;