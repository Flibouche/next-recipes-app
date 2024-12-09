import { db } from "@/lib/db";
import { ApiResponse } from "@/lib/types/types";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ recipeSlug: string }>
}

interface Recipe {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    category: Category;
    imageUrl: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
    ingredients: Ingredients[];
    steps: Steps[];
}

interface Category {
    id: string;
    name: string;
}

interface Ingredients {
    id: string;
    quantity: number;
    unit: string;
    ingredient: { id: string, name: string };
}

interface Steps {
    id: string;
    stepNumber: number;
    description: string;
    duration: number;
}

export async function GET(request: NextRequest, { params }: Props): Promise<NextResponse> {
    try {
        const { recipeSlug } = await params;

        const recipe: Recipe | null = await db.recipe.findUnique({
            where: { slug: recipeSlug },
            include: {
                category: true,
                steps: true,
                ingredients: {
                    include: {
                        ingredient: true,
                    }
                }
            },
        });

        if (!recipe) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Recipe not found", success: false }, { status: 404 });
        }

        return NextResponse.json<ApiResponse<Recipe>>({ data: recipe, message: "Recipe found", success: true }, { status: 200 });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[RECIPE_GET]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}