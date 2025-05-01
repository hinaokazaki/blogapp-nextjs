'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Loading from "@/app/_components/Loading";
import { CreatePostRequestBody } from "@/app/_types/type";
import PostForm from "../_components/PostForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import useFetch from "../../_hooks/useFetch";
import { mutate } from "swr";
import NotFound from "@/app/_components/Not-found";
import { ApiResponsePost } from "@/app/_types/type";

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

  // GET SWRによる記事詳細取得処理
  const { data, error, isLoading } = useFetch<ApiResponsePost>(`/api/admin/posts/${id}`)

  console.log(data?.post)

  useEffect(() => {
    if (data?.post) {
      reset({
        title: data.post.title,
        content: data.post.content,
        thumbnailImageKey: data.post.thumbnailImageKey,
        categories: data.post.postCategories.map((cat) => ({
          id: cat.category.id,
          name: cat.category.name,
        })),
      })
    }
  },[])

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
        mutate(`/api/admin/posts/${id}`);
        router.push('/admin/posts');
        console.log(data);
      } else {
        throw new Error();
      };

    } catch (error) {
      console.error('記事の更新に失敗しました。', error);
    } 
  }

  if (isLoading) {
    return <Loading/>
  }

  if (!data?.post) {
    return <NotFound />
 }

  return (
    <>
      <h1 className='text-2xl text-[#333] font-bold mb-4'>記事編集</h1>
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