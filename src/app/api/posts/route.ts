// 必要なモジュールをインポート
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client' // データベースに接続するために使用

// Prisma clientの初期化
const prisma = new PrismaClient()

// GETリクエストの処理 GETとすることでGETリクエストの時にこの関数が呼ばれる
export const GET = async (request: NextRequest) => {
  try{
    // Postの一覧をDBから取得
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
      // 作成日時の降順で取得
      orderBy: {
        createdAt: 'desc',
      }
    })

    // レスポンスを返す
    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200})
  } catch (error) {
    if (error instanceof Error) // errorハンドリングでのinstanceof
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

