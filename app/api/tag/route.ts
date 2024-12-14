import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Tag {
    id: string;
    name: string;
}

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des tags
        const tags: Tag[] = await db.tag.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc'
            }
        });
        if (!tags) {
            console.log(tags);
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Tags not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Tag[]>>({ data: tags, message: "Tags found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[TAGS_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}