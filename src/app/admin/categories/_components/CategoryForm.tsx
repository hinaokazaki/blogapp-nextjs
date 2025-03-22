'use client'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CreateCategoryRequestBody } from "@/app/_types/type";

type FormValues = {
  name: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  isSubmitting: boolean;
  submitFunction: (data: CreateCategoryRequestBody) => Promise<void>;
}

const CategoryForm: React.FC<Props> = ({ register, handleSubmit, errors, isSubmitting, submitFunction }) => {
  return (
    <form className='adminForm' id='myForm' onSubmit={handleSubmit(submitFunction)}>
      <label className='adminFormTitle' htmlFor="name">カテゴリー名</label>
      <input className='adminFormInput' id="name" type="text" disabled={isSubmitting}
        {...register('name', {
          required: 'カテゴリー名を入力して下さい。',
        })}
      />
      <div>{errors.name?.message ?? ''}</div>
    </form>
  )
}

export default CategoryForm;