'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CreatePostRequestBody } from '@/app/_types/type';
import Loading from '@/app/_components/Loading';
import "@/app/globals.css";
import { SelectOptionForCategories } from '@/app/_types/type';
import { CategoryData } from '@/app/_types/type';
import PostForm from '../_components/PostForm';

const CreateNewPost: React.FC = () => {
  const [ categoryOptions, setCategoryOptions ] = useState<SelectOptionForCategories[]>([])
  const [ isLoading, setIsLoading ] = useState(true);
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

  // GET: カテゴリー一覧の取得
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/admin/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();
        const data: CategoryData[] = result.categories;
        console.log("APIレスポンス:", data); 
        if (!res.ok) {
          throw new Error();
        } else {
          setCategoryOptions(data.map((cat) => ({ id: cat.id, name: cat.name })))
        }
   
      } catch (error) {
        console.error('エラーが発生しました。', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetcher();
  },[]);

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

  if (isLoading) {
    return <Loading />
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
        categoryOptions={categoryOptions}
      />
      <button className='adminFormSubmitBtn' form='myForm' type="submit">作成</button>
    </>
  )
}

export default CreateNewPost;