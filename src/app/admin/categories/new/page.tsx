'use client'
import { useForm } from "react-hook-form"
import { CreateCategoryRequestBody } from "@/app/_types/type";
import { useRouter } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";


const CategoryFormRhf: React.FC = () => {
  const router = useRouter();

  // フォームを初期化
  const { 
    register, // フォームの入力フィールドを登録
    handleSubmit, // フォーム送信の処理をラップ
    formState: { errors, isSubmitting } // エラーと送信状態を管理
  } = useForm<CreateCategoryRequestBody>()

  // サブミット時の処理、APIでデータを送信してアラート表示
  const onSubmit = async (data: CreateCategoryRequestBody) => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error();
      } else {
        alert('新しいカテゴリーを作成しました。')
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('エラーが発生しました。', error);
      alert('カテゴリーの作成に失敗しました。');
    }
  }

  return (
    <>
      <h1 className="adminTitle">カテゴリー作成</h1>
      <CategoryForm 
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        submitFunction={onSubmit}
      />
      <button className='adminFormSubmitBtn' form='myForm' type='submit'>作成</button>
    </>
  )
}

export default CategoryFormRhf;