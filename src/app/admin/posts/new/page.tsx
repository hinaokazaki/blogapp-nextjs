'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreatePostRequestBody } from '@/app/_types/type';
import Select from 'react-select';
import Loading from '@/app/_components/Loading';
import "@/app/globals.css";
import { SelectOptionForCategories } from '@/app/_types/type';
import { CategoryData } from '@/app/_types/type';

const CreatePostForm: React.FC = () => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ categories, setCategories ] = useState<SelectOptionForCategories[]>([]);
  const [ selectedCategories, setSelectedCategories ] = useState<SelectOptionForCategories[]>([]);
  const [ thumbnailUrl, setThumbnailUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const router = useRouter();

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

   // POST: カテゴリー新規作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防ぐ

    const postData: CreatePostRequestBody = {
      title,
      content,
      categories: selectedCategories.map((cat) => ({ id: cat.value, name: cat.label })),
      thumbnailUrl,
    };

    try {
      const res = await fetch('/api/admin/posts',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await res.json();
      if (res.ok) {
        alert('記事を作成しました。' + result.id);
        router.push('/admin/posts');
      } else {
        console.log('エラー：' + result.status);
        alert("エラー： " + result.status);
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿中にエラーが発生しました。');
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <h1 className='adminTitle'>記事作成</h1>
      <form className='adminForm' onSubmit={handleSubmit}>
        <label className='adminFormTitle' htmlFor='title'>タイトル</label>
        <input
          className='adminFormInput'
          id='title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor='title'>内容</label>
        <textarea
          className='adminFormInputContent'
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor='thumbnailUrl'>サムネイルURL</label>
        <input
          className='adminFormInput'
          id='thumbnailUrl'
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <label className='adminFormTitle' htmlFor='categories'>カテゴリー</label>
        {categories.length === 0 ? (
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
        <button className='adminFormSubmitBtn' type="submit">作成</button>
      </form>
    </>
  )
}

export default CreatePostForm;