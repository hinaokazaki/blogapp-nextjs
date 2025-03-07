'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PostData } from "@/app/_types/type";
import Select from "react-select";
import Loading from "@/app/_components/Loading";
import NotFound from "@/app/_components/Not-found";
import { CreatePostRequestBody } from "@/app/_types/type";
import { SelectOptionForCategories } from "@/app/_types/type";
import { SelectedCategoryData } from "@/app/_types/type"
import { CategoryData } from "@/app/_types/type";

const adminPost: React.FC = () => {
  const params = useParams();
  const id = params.id
  const router = useRouter();

  const [ post, setPost ] = useState<PostData>();
  const [ isLoading, setIsLoading ] = useState(true);

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ categories, setCategories ] = useState<SelectOptionForCategories[]>([]);
  const [ selectedCategories, setSelectedCategories ] = useState<SelectOptionForCategories[]>([])
  const [ thumbnailUrl, setThumbnailUrl ] = useState('');
  
  // GET 記事詳細取得処理
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
  
        const data = await res.json();
        if (!res.ok) {
          throw new Error(); 
        } else {
          console.log(data.post);
          console.log(data.post.postCategories);
        }
  
        setPost(data.post);
      
        setTitle(data.post.title);
        setContent(data.post.content);
        setThumbnailUrl(data.post.thumbnailUrl);
        setSelectedCategories(Array.isArray(data.post.postCategories) ?
          data.post.postCategories.map((cat: SelectedCategoryData) => ({ value: cat.category.id, label: cat.category.name })) : []);
        
      } catch (error) {
        console.error('記事の取得に失敗しました。', error);
        alert('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    }
  
    fetcher();
  },[])

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
  
          const data = await res.json();
          console.log("APIレスポンス:", data); 
          if (!res.ok) {
            throw new Error();
          } else {
            console.log(data.categories);
            // alert('カテゴリーを取得しました。')
          }
  
          setCategories(Array.isArray(data.categories) ? 
            data.categories.map((cat: CategoryData) => ({ value: cat.id, label: cat.name })) : []);
          
        } catch (error) {
          console.error('エラーが発生しました。', error);
          setCategories([])
        } finally {
          setIsLoading(false);
        }
      }
  
      fetcher();
    },[]);

  // PUT 更新処理
  const handleUpdate = async () => {
    const postData: CreatePostRequestBody = {
      title,
      content,
      categories: selectedCategories.map((cat) => ({ id: cat.value, name: cat.label })),
      thumbnailUrl,
    };

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const data = await res.json();
      if (res.ok) {
        console.log(data.post)
      } else {
        throw new Error();
      };

      setPost(data.post);
      alert('記事を更新しました。');
      router.push('/admin/posts');
    } catch (error) {
      console.error('記事の更新に失敗しました。', error);
    } finally {
      setIsLoading(false);
    }
  }

  // DELETE 削除処理
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (res.ok) {
        alert('記事を削除しました。');
        router.replace('/admin/posts');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('Error', error);
      alert('エラーが発生しました。');
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <h1 className='adminTitle'>記事編集</h1>
      <form className='adminForm'>
        <label className='adminFormTitle' htmlFor="title">タイトル</label>
        <input 
          className='adminFormInput'
          id="title"
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor="content">内容</label>
        <textarea 
          className='adminFormInputContent'
          id="content"
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor="thumbnailUrl">サムネイルURL</label>
        <input 
          className='adminFormInput'
          id="thumbnailUrl"
          type="text"
          value={thumbnailUrl} 
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor='categories'>カテゴリー</label>
        {post && categories.length === 0 ? (
          <p>選択可能なカテゴリーがありません。</p>
        ) : (
          <Select
            className='adminFormInput'
            id='categories'
            isMulti
            options={categories}
            value={selectedCategories}
            onChange={(selectedOptions) => setSelectedCategories(selectedOptions ? [...selectedOptions] : [])}
          />
        )}
      </form>
      <div>
        <button className='adminFormSubmitBtn' type='button' onClick={handleUpdate}>更新</button>
        <button className='adminFormDeleteBtn' type='button' onClick={handleDelete}>削除</button>
      </div>
    </>
  )

}

export default adminPost;