import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// GET: /api/admin/categories 管理者_カテゴリー一覧取得API
export const GET = async (request: NextRequest) => {
  try {
    // カテゴリーの一覧をDBから取得
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc', // 作成日時の降順で取得
      },
    })
    
    // レスポンスを返す
    return NextResponse.json({ status: 'OK', categories }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// POST: /api/admin/categories 管理者_カテゴリー新規作成API

// カテゴリーの作成時に送られてくるリクエストのbodyの型
type CreateCategoryRequestBody = {
  name: string
}

// POST request
export const POST = async (request: NextRequest, context: any) => {
  try {
    // リクエストのbodyを取得してnameを取り出す
    const { name }: CreateCategoryRequestBody = await request.json()

    // カテゴリーをDBに生成
    const createdCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    // レスポンスを返す
    return NextResponse.json({
      status: 'OK',
      message: '作成しました。',
      id: createdCategory.id
    })
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

