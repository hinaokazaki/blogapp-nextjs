'use client'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CreateCategoryRequestBody } from "@/app/_types/type";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

type FormValues = {
  name: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  isSubmitting: boolean;
  submitFunction: (data: CreateCategoryRequestBody) => Promise<void>;
  mode: 'new' | 'edit';
}

const CategoryForm: React.FC<Props> = ({ register, handleSubmit, errors, isSubmitting, submitFunction, mode }) => {
  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();
  
  // DELETE: カテゴリー削除
  const handleDelete = () => {
    if (!token) return

    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        })

        if (!res.ok) {
          throw new Error();
        } else {
          alert('カテゴリーを削除しました');
          router.replace('/admin/categories');
        }
      } catch (error) {
        console.error('エラーが発生しました。', error);
      }
    }

    fetcher();
  }
  
  return (
    <form className='w-[100%] flex flex-col' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='text-base text-[#4d4f5b]' htmlFor="name">カテゴリー名</label>
      <input className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' id="name" type="text" disabled={isSubmitting}
        {...register('name', {
          required: 'カテゴリー名を入力して下さい。',
        })}
      />
      <div>{errors.name?.message ?? ''}</div>
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

export default CategoryForm;