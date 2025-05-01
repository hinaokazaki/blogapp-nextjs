'use client'
import { useParams, useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { mutate } from "swr";

type Props = {
  mode: 'new' | 'edit',
  page: 'posts' | 'categories',
}

const Button: React.FC<Props> = ({mode, page}) => {
  const params = useParams();
  const id = params.id
  const router = useRouter();
  const { token } = useSupabaseSession();
  
  // DELETE: 削除処理
  const handleDelete = () => {
    if (!token) return

    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/${page}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        })

        if (!res.ok) {
          throw new Error();
        } else {
          alert('削除しました');
          mutate(`/api/admin/${page}/${id}`);
          router.replace(`/admin/${page}`);
        }
      } catch (error) {
        console.error('エラーが発生しました。', error);
      }
    }

    fetcher();
  }
  
  return (
    <div>
      <button 
        className='w-[80px] mt-[10px] pt-2 px-4 pb-[10px] text-[rgb(255,255,255)] 
        text-lg bg-[#4085fd] border-0 rounded-lg font-bold cursor-pointer' 
        form='myForm' type="submit">{mode === 'new' ? '作成' : '更新'}
      </button>
        {mode === 'edit' ? <button className='w-[80px] mt-[10px] ml-[10px] pt-2 px-4 pb-[10px] 
        text-[rgb(255,255,255)] text-lg bg-[#fd4d40] border-0 rounded-lg font-bold 
        cursor-pointer' type='button' onClick={handleDelete}>削除</button> : ''}
    </div>
  )
}

export default Button;