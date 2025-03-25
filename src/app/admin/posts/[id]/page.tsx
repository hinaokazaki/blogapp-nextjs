'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PostData } from "@/app/_types/type";
import Loading from "@/app/_components/Loading";
import { CreatePostRequestBody } from "@/app/_types/type";
import PostForm from "../_components/PostForm";

const AdminPost: React.FC = () => {
  const params = useParams();
  const id = params.id
  const router = useRouter();

  const defaultValues = {
    title: '',
    content: '',
    thumbnailUrl: '',
    categories: [],
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostRequestBody>({defaultValues});

  const [ isLoading, setIsLoading ] = useState(true);

  // GET 記事詳細取得処理
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
            thumbnailUrl: data.thumbnailUrl,
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
  },[])

  // PUT 更新処理
  const handleUpdate = async (data: CreatePostRequestBody) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
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
        errors={errors} 
        submitFunction={handleUpdate}
        control={control}
        mode='edit'
      />
    </>
  )
}

export default AdminPost;