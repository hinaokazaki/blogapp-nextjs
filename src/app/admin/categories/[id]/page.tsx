'use client'
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CategoryData } from "@/app/_types/type"
import { CreateCategoryRequestBody } from "@/app/_types/type"
import Loading from "@/app/_components/Loading"
import NotFound from "@/app/_components/Not-found"
import "@/app/globals.css";

const adminCategory: React.FC = () => {
  const [ category, setCategory ] = useState<CategoryData>();
  const [ name, setName ] = useState('')
  const [ isLoading, setIsLoading ] = useState(true)

  const params = useParams();
  const id = params.id
  const router = useRouter();

  // GET: カテゴリー詳細情報取得
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        const data = await res.json();
        if (!res.ok) {
          throw new Error();
        } else {
          console.log(data)
        }

        setCategory(data.category)
        setName(data.category.name)
        
      } catch (error) {
        console.error('カテゴリーの詳細の取得に失敗しました。', error);
      } finally {
        setIsLoading(false)
      }
    }

    fetcher();
  },[])

  // PUT: カテゴリー更新
  const updatedCategoryData: CreateCategoryRequestBody = {
    name,
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategoryData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error();
      } else {
        console.log(data.updatedCategory)
      }

      setCategory(data.updatedCategory);
      console.log(category);
      alert('カテゴリーを更新しました。');
      router.push('/admin/categories');
    } catch (error) {
      console.error('エラーが発生しました。', error);
      alert('カテゴリーの更新に失敗しました。');
    }
  }

  // DELETE: カテゴリー削除
  const handleDelete = () => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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

  if (isLoading) {
    return <Loading />
  }

  if (!category) {
    return <NotFound />
  }

  return (
    <>
      <h1 className="adminTitle">カテゴリー編集</h1>
      <form className='adminForm'>
        <label className='adminFormTitle' htmlFor="name">カテゴリー名</label>
        <input 
          className='adminFormInput'
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <div>
        <button className='adminFormSubmitBtn' type="button" onClick={handleUpdate}>更新</button>
        <button className='adminFormDeleteBtn' type="button" onClick={handleDelete}>削除</button>
      </div>
    </>
  )
}

export default adminCategory