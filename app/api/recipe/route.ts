import { db } from '@/lib/db';
import { ApiResponse } from '@/lib/types/types';
import { NextResponse } from 'next/server';

interface Recipe {
    id: string;
    slug: string;
    name: string;
    categoryId: string;
    category: Category;
    imageUrl?: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
}

interface Category {
    id: string;
    name: string;
}

export async function GET(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    try {
        const recipes = await getRecipesByType(type);

        if (recipes.length === 0) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Recipes not found", success: false }, { status: 404 });
        }

        return NextResponse.json<ApiResponse<readonly Recipe[]>>({ data: recipes, message: "Recipes found", success: true }, { status: 200 });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[RECIPES_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}

async function getRecipesByType(type: string | null): Promise<readonly Recipe[]> {
    switch (type) {
        case "lastAdded":
            return await db.recipe.findMany({
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    categoryId: true,
                    category: true,
                    imageUrl: true,
                    cookingTime: true,
                    numberOfServings: true,
                    difficulty: true,
                    vegan: true,
                    healthy: true,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 3
            });

        default:
            return await db.recipe.findMany({
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    categoryId: true,
                    category: true,
                    imageUrl: true,
                    cookingTime: true,
                    numberOfServings: true,
                    difficulty: true,
                    vegan: true,
                    healthy: true,
                },
                orderBy: {
                    name: 'asc'
                }
            });
    }
}