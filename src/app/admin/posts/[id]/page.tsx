'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PostData } from "@/app/_types/type";
import Loading from "@/app/_components/Loading";
import { CreatePostRequestBody } from "@/app/_types/type";
import PostForm from "../_components/PostForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const AdminPost: React.FC = () => {
  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();

  const defaultValues = {
    title: '',
    content: '',
    thumbnailImageKey: '',
    categories: [],
  };

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostRequestBody>({defaultValues});

  const [ isLoading, setIsLoading ] = useState(true);

  // GET 記事詳細取得処理
  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          }
        })
  
        const result = await res.json();
        const data: PostData = result.post;
        if (!res.ok) {
          throw new Error(); 
        } else {
          reset({
            title: data.title,
            content: data.content,
            thumbnailImageKey: data.thumbnailImageKey,
            categories: data.postCategories.map((cat) => ({
              id: cat.category.id,
              name: cat.category.name,
            })),
          })
          console.log(data);
        }
  
      } catch (error) {
        console.error('記事の取得に失敗しました。', error);
        alert('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    }
  
    fetcher();
  },[token])

  // PUT 更新処理
  const handleUpdate = async (data: CreatePostRequestBody) => {
    if (!token) return 

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        reset(data);
        alert('記事を更新しました。');
        router.push('/admin/posts');
        console.log(data);
      } else {
        throw new Error();
      };

    } catch (error) {
      console.error('記事の更新に失敗しました。', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <h1 className='adminTitle'>記事編集</h1>
      <PostForm 
        handleSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
        register={register} 
        setValue={setValue}
        errors={errors} 
        submitFunction={handleUpdate}
        control={control}
        mode='edit'
      />
    </>
  )
}

export default AdminPost;