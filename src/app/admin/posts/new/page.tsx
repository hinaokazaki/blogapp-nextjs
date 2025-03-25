'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CreatePostRequestBody } from '@/app/_types/type';
import "@/app/globals.css";
import PostForm from '../_components/PostForm';

const CreateNewPost: React.FC = () => {
  const router = useRouter();

  const defaultValues = {
    title: '',
    content: '',
    thumbnailUrl: '',
    categories: [],
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostRequestBody>({defaultValues});

   // POST: 記事新規作成
  const onSubmit = async (data: CreatePostRequestBody) => {
    try {
      const res = await fetch('/api/admin/posts',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <h1 className='adminTitle'>記事作成</h1>
      <PostForm 
        handleSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
        register={register} 
        errors={errors} 
        submitFunction={onSubmit}
        control={control}
        mode='new'
      />
    </>
  )
}

export default CreateNewPost;