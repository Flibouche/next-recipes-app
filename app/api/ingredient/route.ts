import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Ingredient {
    id: string;
    name: string;
    imageUrl: string | null;
}

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des ingrédients
        const ingredients: Ingredient[] = await db.ingredient.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        if (!ingredients) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Ingredients not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Ingredient[]>>({ data: ingredients, message: "Ingredients found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[INGREDIENTS_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}