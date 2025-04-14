'use client'
import { Controller, Control } from "react-hook-form"
import { ChangeEvent } from "react"
import { useParams, useRouter } from "next/navigation";
import Select from "react-select"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue  } from "react-hook-form"
import { CreatePostRequestBody } from "@/app/_types/type"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from 'uuid';
import useSWR, { mutate } from "swr";
import { fetcherWithToken } from "@/lib/fetcherWithToken";
import { ApiResponseCategories } from "@/app/_types/type";

type FormValues = {
  title: string,
  content: string,
  thumbnailImageKey: string,
  categories: {
    id: number;
    name: string;
  }[];
}

interface Props {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  isSubmitting: boolean;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>
  errors: FieldErrors<FormValues>;
  submitFunction: (data: CreatePostRequestBody) => Promise<void>;
  control: Control<CreatePostRequestBody, any>;
  mode: 'new' | 'edit';
}

const PostForm: React.FC<Props> = ({ 
  handleSubmit, 
  isSubmitting, 
  register, 
  setValue,
  errors, 
  submitFunction,
  control,
  mode,
}) => {

  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();

  // GET: カテゴリー一覧の取得
  const { data, error, isLoading } = useSWR(
    token ? ['/api/admin/categories', token] : null,
    ([url, token]) => fetcherWithToken<ApiResponseCategories>(url, token)
  );

  const categoryOptions = data?.categories

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
        mutate(`/api/admin/posts/${id}`);
        router.replace('/admin/posts');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('Error', error);
      alert('エラーが発生しました。');
    }
  }

  // 画像挿入処理
  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) : Promise<void> => {
    if (!e.target.files || e.target.files.length == 0) {
      return // 画像が選択されていないのでreturn
    }

    const file = e.target.files[0] // 選択された画像を取得
    const filePath = `private/${uuidv4()}` // ファイルパスを指定

    // supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('post-thumbnail') // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message)
      return
    }

    setValue('thumbnailImageKey', data.path)

  }

  return (
    <form className='w-[100%] flex flex-col' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='text-base text-[#4d4f5b]' htmlFor='title'>タイトル</label>
      <input
        className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' id='title' type="text" disabled={isSubmitting || isLoading}
        {...register('title', {
          required: ' タイトルを入力して下さい。',
          maxLength: {
            value: 30,
            message: 'タイトルは３０文字以内にしてください。'
          }
        })}
      />
      <div>{errors.title?.message ??  ''}</div>
      <label className='text-base text-[#4d4f5b]' htmlFor='title'>内容</label>
      <textarea className='mt-1 mb-4 min-h-[60px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' id='content' disabled={isSubmitting || isLoading}
        {...register('content', {
          required: '本文を入力してください。',
          maxLength: {
            value: 500,
            message: '本文は500字以内にしてください。'
          },
        })}
      />
      <div>{errors.content?.message ?? ''}</div>
      <label className='text-base text-[#4d4f5b]' htmlFor='thumbnailImageKey'>サムネイルURL</label>
      <input 
        className="mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg" 
        id="thumbnailImageKey" 
        disabled={isSubmitting || isLoading} 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      <div>{errors.thumbnailImageKey?.message ?? ''}</div>
      <label className='text-base text-[#4d4f5b]' htmlFor='categories'>カテゴリー</label>
        <Controller 
          disabled={isSubmitting || isLoading}
          name='categories'
          control={control}
          render={({field}) => (
            <Select
              className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg'
              {...field}
              isMulti
              options={categoryOptions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => String(option.id)}
            />
          )}  
        />
        <div>
          <button 
          className='w-[80px] mt-[10px] pt-2 px-4 pb-[10px] text-[rgb(255,255,255)] 
          text-lg bg-[#4085fd] border-0 rounded-lg font-bold cursor-pointer' 
          form='myForm' type="submit">{mode === 'new' ? '作成' : '更新'}</button>
          {mode === 'edit' ? <button className='w-[80px] mt-[10px] ml-[10px] pt-2 px-4 pb-[10px] 
          text-[rgb(255,255,255)] text-lg bg-[#fd4d40] border-0 rounded-lg font-bold 
          cursor-pointer' type='button' onClick={handleDelete}>削除</button> : ''}
        </div>
    </form>
  )
}

export default PostForm;