import Categories from '@/app/_components/Categories';
import Text from '@/app/_components/Text';
import { useState, useEffect } from 'react';
import { PostData } from '@/app/_types/type';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';

type Props = {
  post: PostData
}

const PostUi: React.FC<Props> = ({ post }) => {
  console.log('postui', post);

  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null)
  useEffect(() => {
    if (!post.thumbnailImageKey) return 

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post-thumbnail')
        .getPublicUrl(post.thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  },[post.thumbnailImageKey])

  return (
    <div className='max-w-[800px] my-[50px] mx-auto'>
      <div className='p-4'>
        {thumbnailImageUrl && (
          <div>
            <Image 
              height={400}
              width={800}
              src={thumbnailImageUrl} 
              className='h-auto max-w-[100%]'
              alt={post.title}
            />
          </div>
        )}
        <div className='p-4'>
          <div className='flex justify-between'>
            <div className='text-[#ccc]'>{new Date(post.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
            <Categories postCategories={post.postCategories}/>
          </div>
          <div className='mt-2'>
            <h1 className='font-extralight text-2xl'>APIで取得した{post.title}</h1>
            <Text content={post.content}/> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostUi;