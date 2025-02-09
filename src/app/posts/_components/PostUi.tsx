import Categories from '@/app/_components/Categories';
import Text from '@/app/_components/Text';
import classes from '@/app/posts/posts.module.css';
import { MicroCmsPost } from '@/app/_types/type';
import Image from 'next/image';

type Props = {
  post: MicroCmsPost
}

const PostUi: React.FC<Props> = ({ post }) => {
  return (
    <div className={classes.postsMain}>
      <div className={classes.postsBox}>
        <div>
          <Image 
            height={400}
            width={800}
            src={post.thumbnail.url} 
            className={classes.postsImg} 
            alt={post.title}
          />
        </div>
        <div className={classes.postsInfo}>
          <div className={classes.postsBoxNav}>
            <div className={classes.postsBoxNavDate}>{new Date(post.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
            <Categories categories={post.categories}/>
          </div>
          <div className={classes.homeBoxTexts}>
            <h1 className={classes.postsBoxTextsTitle}>APIで取得した{post.title}</h1>
            <Text content={post.content}/> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostUi;