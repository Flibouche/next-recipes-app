import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Category {
    id: string;
    name: string;
}

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des catégories
        const categories: Category[] = await db.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        if (!categories) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Categories not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Category[]>>({ data: categories, message: "Categories found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[CATEGORIES_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}