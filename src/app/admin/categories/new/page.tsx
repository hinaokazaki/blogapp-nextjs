'use client'
import { useForm } from "react-hook-form"
import { CreateCategoryRequestBody } from "@/app/_types/type";
import { useRouter } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";


const CreateNewCategory: React.FC = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();

  // フォームを初期化
  const { 
    register, // フォームの入力フィールドを登録
    handleSubmit, // フォーム送信の処理をラップ
    formState: { errors, isSubmitting } // エラーと送信状態を管理
  } = useForm<CreateCategoryRequestBody>()

  // サブミット時の処理、APIでデータを送信してアラート表示
  const onSubmit = async (data: CreateCategoryRequestBody) => {
    if (!token) return

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
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
      <h1 className="text-2xl text-[#333] font-bold mb-4">カテゴリー作成</h1>
      <CategoryForm 
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        submitFunction={onSubmit}
        mode='new'
      />
    </>
  )
}

export default CreateNewCategory;