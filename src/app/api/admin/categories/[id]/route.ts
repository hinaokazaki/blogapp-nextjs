import { CategoryData } from "@/app/_types/type";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient()

// GET: /api/admin/categories/[id] 管理者_カテゴリー詳細取得API
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string }}
) => {
  const { id } = params

  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)
  if (error) 
    return NextResponse.json({ status: error.message },{ status: 400 })

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    })

    return NextResponse.json({ status: 'OK', category: category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// PUT: /api/admin/categories/[id] 管理者_カテゴリー更新API

// カテゴリーの更新時に送られてくるリクエストのbodyの型
type UpdateCategoryRequestBody = {
  name: string,
}

// PUT request
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  //paramsからIDを取得
  const { id } = params

  // request bodyから必要なデータを取得
  const { name }: UpdateCategoryRequestBody = await request.json()

  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    // idを指定してcategoryを更新
    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    })

    return NextResponse.json<{
      status: string;
      category: CategoryData;
    }>({ status: 'OK', category: updatedCategory }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ ststus: error.message }, { status: 400 })
  }
  
}

// DELETE: /api/admin/categories/[id] 管理者_カテゴリー削除API

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params

  // tokenの確認
  const token = request.headers.get('Authorization') ?? ''
  const { error } = await supabase.auth.getUser(token)
  if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    })

    return NextResponse.json({ status: 'OK' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}