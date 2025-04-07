'use client'
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { CreateCategoryRequestBody } from "@/app/_types/type"
import Loading from "@/app/_components/Loading"
import "@/app/globals.css";
import CategoryForm from "../_components/CategoryForm"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"

const AdminCategory: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);

  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();

  const defaultValues = {
    name: '',
  }
  
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting }
  } = useForm<CreateCategoryRequestBody>({defaultValues})

  // GET: カテゴリー詳細情報取得
  useEffect(() => {
    if (!token) return 
    
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })

        const data = await res.json();
        if (!res.ok) {
          throw new Error();
        } else {
          reset({name: data.category.name});
          console.log(data)
        }
       
      } catch (error) {
        console.error('カテゴリーの詳細の取得に失敗しました。', error);
      } finally {
        setIsLoading(false)
      }
    }

    fetcher();
  },[token])

  // PUT: カテゴリー更新
  const handleUpdate = async (data: CreateCategoryRequestBody) => {
    if (!token) return 

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error();
      } else {
        reset(data);
        alert('カテゴリーを更新しました。');
        router.push('/admin/categories');
      }

    } catch (error) {
      console.error('エラーが発生しました。', error);
      alert('カテゴリーの更新に失敗しました。');
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <h1 className="text-2xl text-[#333] font-bold mb-4">カテゴリー編集</h1>
      <CategoryForm 
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        submitFunction={handleUpdate}
        mode='edit'
      />
    </>
  )
}

export default AdminCategory