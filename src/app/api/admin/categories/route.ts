import { CategoryData } from "@/app/_types/type";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient()

// GET: /api/admin/categories 管理者_カテゴリー一覧取得API
export const GET = async (request: NextRequest) => {
  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    // カテゴリーの一覧をDBから取得
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc', // 作成日時の降順で取得
      },
    })
    
    // レスポンスを返す
    return NextResponse.json<{
      status: string;
      categories: CategoryData[];
    }>({ status: 'OK', categories: categories }, { status: 200 })
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
  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })
  
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

