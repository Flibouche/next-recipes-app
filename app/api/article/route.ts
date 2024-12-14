import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Article {
    id: string;
    title: string;
    text: string;
}

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des articles
        const articles: Article[] = await db.article.findMany({
            select: {
                id: true,
                title: true,
                text: true
            },
            orderBy: {
                title: 'asc'
            }
        });
        if (!articles) {
            console.log(articles);
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Articles not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Article[]>>({ data: articles, message: "Articles found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[ARTICLES_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}