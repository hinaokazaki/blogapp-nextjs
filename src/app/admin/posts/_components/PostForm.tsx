'use client'
import { Controller, Control } from "react-hook-form"
import { useState,useEffect } from "react"
import { useParams, useRouter } from "next/navigation";
import Select from "react-select"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister,  } from "react-hook-form"
import { CreatePostRequestBody } from "@/app/_types/type"
import { SelectOptionForCategories } from "@/app/_types/type"
import { CategoryData } from "@/app/_types/type";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

type FormValues = {
  title: string,
  content: string,
  thumbnailUrl: string,
  categories: {
    id: number;
    name: string;
  }[];
}

interface Props {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  isSubmitting: boolean;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  submitFunction: (data: CreatePostRequestBody) => Promise<void>;
  control: Control<CreatePostRequestBody, any>;
  mode: 'new' | 'edit';
}

const PostForm: React.FC<Props> = ({ 
  handleSubmit, 
  isSubmitting, 
  register, 
  errors, 
  submitFunction,
  control,
  mode,
}) => {

  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ categoryOptions, setCategoryOptions ] = useState<SelectOptionForCategories[]>([]);

  // GET: カテゴリー一覧の取得
    useEffect(() => {
      if (!token) return 

      const fetcher = async () => {
        try {
          const res = await fetch('/api/admin/categories', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
          });
  
          const result = await res.json();
          const data: CategoryData[] = result.categories;
          console.log("APIレスポンス:", data); 
          if (!res.ok) {
            throw new Error();
          } else {
            setCategoryOptions(
              data.map((cat) => ({
                id: cat.id,
                name: cat.name,
              }))
            );
          }
        
        } catch (error) {
          console.error('エラーが発生しました。', error);
          setCategoryOptions([])
        } finally {
          setIsLoading(false);
        }
      }
  
      fetcher();
    },[token]);

  // DELETE 削除処理
    const handleDelete = async () => {
      if (!token) return

      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          }
        })

        if (res.ok) {
          alert('記事を削除しました。');
          router.replace('/admin/posts');
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error('Error', error);
        alert('エラーが発生しました。');
      }
    }

  return (
    <form className='adminForm' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='adminFormTitle' htmlFor='title'>タイトル</label>
      <input
        className='adminFormInput' id='title' type="text" disabled={isSubmitting || isLoading}
        {...register('title', {
          required: ' タイトルを入力して下さい。',
          maxLength: {
            value: 30,
            message: 'タイトルは３０文字以内にしてください。'
          }
        })}
      />
      <div>{errors.title?.message ??  ''}</div>
      <label className='adminFormTitle' htmlFor='title'>内容</label>
      <textarea className='adminFormInputContent' id='content' disabled={isSubmitting || isLoading}
        {...register('content', {
          required: '本文を入力してください。',
          maxLength: {
            value: 500,
            message: '本文は500字以内にしてください。'
          },
        })}
      />
      <div>{errors.content?.message ?? ''}</div>
      <label className='adminFormTitle' htmlFor='thumbnailUrl'>サムネイルURL</label>
      <input className='adminFormInput' id='thumbnailUrl' type="text" disabled={isSubmitting || isLoading}
        {...register('thumbnailUrl', {
          required: '画像URLを入力してください。',
        })}
      />
      <div>{errors.thumbnailUrl?.message ?? ''}</div>
      <label className='adminFormTitle' htmlFor='categories'>カテゴリー</label>
        <Controller 
          disabled={isSubmitting || isLoading}
          name='categories'
          control={control}
          render={({field}) => (
            <Select
              className='adminFormInput'
              {...field}
              isMulti
              options={categoryOptions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => String(option.id)}
            />
          )}  
        />
        <div>
          <button className='adminFormSubmitBtn' form='myForm' type="submit">{mode === 'new' ? '作成' : '更新'}</button>
          {mode === 'edit' ? <button className='adminFormDeleteBtn' type='button' onClick={handleDelete}>削除</button> : ''}
        </div>
    </form>
  )
}

export default PostForm;