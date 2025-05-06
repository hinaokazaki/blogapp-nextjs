import { PostData } from "@/app/_types/type";
import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: /admin/posts 投稿記事一覧を取得

export const GET = async (request: NextRequest) => {
  // frontendのリクエストヘッダーからtokenを受け取る
  const token = request.headers.get('Authorization') ?? ''

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)

  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

  // tokenが正しい場合、以降が実行される
  try {
    // post の一覧をDBから取得
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json<{
      status: string;
      posts: PostData[];
    }>({ status: 'OK', posts: posts }, { status: 200, })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400})
  }
}

// POST: /admin/posts 新規記事作成

// 記事作成のリクエストボディの型
type CreatePostRequestBody = {
  title: string,
  content: string,
  categories: { id: number; name: string }[];
  thumbnailImageKey: string,
}

// post requestの処理
// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (request: NextRequest, context: any) => {
  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token);
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    // requestのbodyを取得
    const body = await request.json()

    // bodyの中から必要なデータの取り出し、分割代入
    const { title, content, categories, thumbnailImageKey }: CreatePostRequestBody = body

    // 記事をDBに作成
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailImageKey,
      },
    })

    // カテゴリーとの関連づけ
    // 本来複数同時生成には、createManyというメソッドがあるが、
    // sqliteではcreateManyが使えないので、for文1つずつ実施
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          category: { connect: { id: category.id } },
          post: { connect: { id: newPost.id } },
        },
      })
    }

    // レスポンスを返す
    return NextResponse.json<{
      status: string;
      message: string;
      id: number;
    }>({
      status: 'OK',
      message: '作成しました',
      id: newPost.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 })
    }
  }
}

