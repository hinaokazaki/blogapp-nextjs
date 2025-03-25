import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PostData } from '@/app/_types/type'

// prisma client を初期化
const prisma = new PrismaClient()

// GETリクエストの処理 GETとすることでGETリクエストの時にこの関数が呼ばれる
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }, // ここでリクエストパラメーターを受け取る
) => {
  // paramsの中にidが入っているので、それを取り出す
  const { id } = params // 分割代入 const id = params.id と同じ

  try {
    // idを元にPostをDBから取得
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      // カテゴリーも含めて取得
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                // カテゴリーのidとnameだけ取得
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ status: 'Post not found' }, { status: 404 });
    }

    // レスポンスを返す
    return NextResponse.json<{
      status: String;
      post: PostData;
    }>({ status: 'OK', post: post }, {status: 200 })
  } catch (error) {
    if(error instanceof Error) 
      return NextResponse.json({ status: error.message }, { status: 400 })
  } 
}