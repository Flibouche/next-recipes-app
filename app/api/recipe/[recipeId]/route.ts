import { db } from "@/lib/db";
import { ApiResponse, Recipe } from "@/lib/types/types";
import { NextResponse } from "next/server";

type Params = {
    recipeId: string;
};

export async function GET(context: { params: Params }): Promise<NextResponse> {
    try {
        const recipeId = context.params.recipeId;

        const recipe = await db.recipe.findUnique({
            where: { id: recipeId },
            include: {
                category: true,
            },
        }) as Recipe;

        if (!recipe) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Recipe not found", success: false }, { status: 404 });
        }

        return NextResponse.json<ApiResponse<Recipe>>({ data: recipe, message: "Recipe found", success: true }, { status: 200 });
    } catch (error) {
        console.log("[RECIPE_GET]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}