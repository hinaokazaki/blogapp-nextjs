'use client'
import { Controller, Control } from "react-hook-form"
import { useState,useEffect } from "react"
import Select from "react-select"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister,  } from "react-hook-form"
import { CreatePostRequestBody } from "@/app/_types/type"
import { SelectOptionForCategories } from "@/app/_types/type"
import { CategoryData } from "@/app/_types/type";

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
}

const PostForm: React.FC<Props> = ({ 
  handleSubmit, 
  isSubmitting, 
  register, 
  errors, 
  submitFunction,
  control,
}) => {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ categoryOptions, setCategoryOptions ] = useState<SelectOptionForCategories[]>([]);

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
    },[]);

  return (
    <form className='adminForm' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='adminFormTitle' htmlFor='title'>タイトル</label>
      <input
        className='adminFormInput' id='title' type="text" disabled={isSubmitting}
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
      <textarea className='adminFormInputContent' id='content' disabled={isSubmitting}
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
      <input className='adminFormInput' id='thumbnailUrl' type="text" disabled={isSubmitting}
        {...register('thumbnailUrl', {
          required: '画像URLを入力してください。',
        })}
      />
      <div>{errors.thumbnailUrl?.message ?? ''}</div>
      <label className='adminFormTitle' htmlFor='categories'>カテゴリー</label>
        <Controller 
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
    </form>
  )
}

export default PostForm;