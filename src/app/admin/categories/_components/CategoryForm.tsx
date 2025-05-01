'use client'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CreateCategoryRequestBody } from "@/app/_types/type";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Button from "../../_components/Button";

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
  return (
    <form className='w-[100%] flex flex-col' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='text-base text-[#4d4f5b]' htmlFor="name">カテゴリー名</label>
      <input className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' id="name" type="text" disabled={isSubmitting}
        {...register('name', {
          required: 'カテゴリー名を入力して下さい。',
        })}
      />
      <ErrorMessage errors={errors} name='name' />
      <Button mode={mode} page='categories'/>
    </form>
  )
}

export default CategoryForm;