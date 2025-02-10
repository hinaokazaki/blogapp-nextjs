'use client';
import React from 'react';
import classes from './page.module.css';
import { useState, useEffect } from 'react';
import { MicroCmsPost } from '@/app/_types/type';
import Link from 'next/link';
import Categories from '@/app/_components/Categories';
import Text from '@/app/_components/Text';
import Loading from './_components/Loading';
import NotFound from './_components/Not-found';

type ApiRes = {
  posts: MicroCmsPost[]
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      // 管理画面で取得したエンドポイントを入力
      const res = await fetch('https://kvjqi36xjz.microcms.io/api/v1/posts', { 
        // fetch関数の第二引数にheadersを設定でき、その中にAPIキーを設定
        headers: {
          // 管理画面で取得したAPIキーを入力してください。
          'X-MICROCMS-API-KEY': process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      })
      const { contents } = await res.json()
      console.log(contents);
      setPosts(contents)
      setIsLoading(false);
    };

    fetcher(); 

  },[])


  // 本文のテキストに文字制限をかけた後にhtmlとして表示するようにする関数
  const maxLength: number = 60;
  const fixContentsLength = (content: string) => content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  
  // データが取得される間のローディング中の表示、早期リターン
  if (isLoading)
    return <Loading />
  
  // ローディングが終わってpostsが空である時の表示、早期リターン
  if(posts.length === 0) 
    return <NotFound />
  
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