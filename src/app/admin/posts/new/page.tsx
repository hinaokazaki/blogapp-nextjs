'use client'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CreatePostRequestBody } from '@/app/_types/type';
import "@/app/globals.css";
import PostForm from '../_components/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

const CreateNewPost: React.FC = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const defaultValues = {
    title: '',
    content: '',
    thumbnailImageKey: '',
    categories: [],
  }

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostRequestBody>({defaultValues});

   // POST: 記事新規作成
  const onSubmit = async (data: CreatePostRequestBody) => {
    if (!token) return
    
    try {
      const res = await fetch('/api/admin/posts',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert('記事を作成しました。' + result.id);
        console.log(result);
        router.push('/admin/posts');
      } else {
        console.log('エラー：' + result.status);
        alert("エラー： " + result.status);
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿中にエラーが発生しました。');
    }
  }

  return (
    <>
      <h1 className='text-2xl text-[#333] font-bold mb-4'>記事作成</h1>
      <PostForm 
        handleSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
        register={register} 
        setValue={setValue}
        errors={errors} 
        submitFunction={onSubmit}
        control={control}
        mode='new'
      />
    </>
  )
}

export default CreateNewPost;