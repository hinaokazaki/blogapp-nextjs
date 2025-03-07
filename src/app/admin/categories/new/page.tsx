'use client'
import { useState, useEffect } from "react"
import { CreateCategoryRequestBody } from "@/app/_types/type"
import { useRouter } from "next/navigation"

const CreateCategory: React.FC = () => {
  const [ category, setCategory ] = useState('')
  const router = useRouter();
  const name = category;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防ぐ

    const categoryData: CreateCategoryRequestBody = {
      name,
    }

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      const data = await res.json();
      if (!res.ok) {
        throw new Error();
      } else {
        alert('新しいカテゴリーを作成しました。')
        console.log(data.category);
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
      <form className='adminForm'>
        <label htmlFor="category">カテゴリー名</label>
        <input 
          className='adminFormInput'
          id='category' 
          type='text' 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        />   
      </form>
      <button className='adminFormSubmitBtn' type='button' onClick={handleSubmit}>作成</button>
    </>
  );
}

export default CreateCategory;