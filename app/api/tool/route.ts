import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Tool {
    id: string;
    name: string;
    imageUrl: string | null;
}

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des outils
        const tools: Tool[] = await db.ingredient.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        if (!tools) {
            console.log(tools);
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Tools not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Tool[]>>({ data: tools, message: "Tools found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[TOOL_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}