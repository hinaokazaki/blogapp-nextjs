'use client'
import { Controller, Control } from "react-hook-form"
import { ChangeEvent } from "react"
import Select from "react-select"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue  } from "react-hook-form"
import { CreatePostRequestBody } from "@/app/_types/type"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from 'uuid';
import useSWR from "swr";
import { fetcherWithToken } from "@/lib/fetcherWithToken";
import { ApiResponseCategories } from "@/app/_types/type";
import Label from "../../_components/Label";
import Button from "../../_components/Button";
import Input from "../../_components/Input";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useFetch from "../../_hooks/useFetch"

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
  const { token } = useSupabaseSession();

  // GET: カテゴリー一覧の取得
  const { data, error, isLoading } = useFetch<ApiResponseCategories>('/api/admin/categories')

  const categoryOptions = data?.categories

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
      <Label name='title' title='タイトル' />
      <Input  
        type='text'
        {...register('title', {
          required: ' タイトルを入力して下さい。',
          maxLength: {
            value: 30,
            message: 'タイトルは３０文字以内にしてください。'
          }
        })}
        disabled={isSubmitting || isLoading}
        placeholder=''
      />
      <ErrorMessage errors={errors} name='title' />
      <Label name='content' title='内容' />
      <textarea className='mt-1 mb-4 min-h-[60px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' id='content' disabled={isSubmitting || isLoading}
        {...register('content', {
          required: '本文を入力してください。',
          maxLength: {
            value: 500,
            message: '本文は500字以内にしてください。'
          },
        })}
      />
      <ErrorMessage errors={errors} name='content' />
      <Label name='thumbnailImageKey' title='サムネイルURL' />
      <input 
        className="mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg" 
        id="thumbnailImageKey" 
        disabled={isSubmitting || isLoading} 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      <ErrorMessage errors={errors} name='thumbnailImageKey' />
      <Label name='categories' title='カテゴリー' />
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
      <Button mode={mode} page='posts'/>
    </form>
  )
}

export default PostForm;