'use client';
import React from 'react';
import classes from './page.module.css';
import { useState, useEffect } from 'react';
import { Post } from '@/app/_types/type';
import Link from 'next/link';
import Categories from '@/app/_components/Categories';
import Text from '@/app/_components/Text';

type ApiRes = {
  posts: Post[]
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
        
        if (!res.ok) {
          throw new Error('HTTP Error!');
        }
        const data: ApiRes = await res.json();
        setPosts(data.posts);
      } catch (error){
        console.error('postのデータを読み込めませんでした', error)
      } finally {
        setisLoading(false);
      }
    };

    fetcher(); 

  },[])

  // 本文のテキストに文字制限をかけた後にhtmlとして表示するようにする関数
  const maxLength: number = 60;
  const fixContentsLength = (content: string) => content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  
  // データが取得される間のローディング中の表示、早期リターン
  if (isLoading)
    return <div className={classes.loadingMessage}>読み込み中...</div>
  
  // ローディングが終わってpostsが空である時の表示、早期リターン
  if(posts.length === 0) 
    return <div className={classes.errorHandring}>記事が見つかりません。</div>
  
  return (
    <>
      <main id='main'>
        {posts.map((elem) => ( 
          <React.Fragment key={elem.id}>
            <div className={classes.homeMain}>
              <div className={classes.homeBoxes}>
                <Link className={classes.postLink} href={`/posts/${elem.id}`}>
                  <div className={classes.homeBox}>
                    <div className={classes.homeBoxNav}>
                      <div className={classes.homeBoxNavDate}>{new Date(elem.createdAt).toLocaleDateString()}</div>
                      <Categories categories={elem.categories}/>
                    </div>
                    <div className={classes.homeBoxTexts}>
                      <h1 className={classes.homeBoxTextsTitle}>APIで取得した{elem.title}</h1>
                      <Text content={fixContentsLength(elem.content)}/>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </React.Fragment>
        ))}
      </main>
    </>
  );
}

export default Home;