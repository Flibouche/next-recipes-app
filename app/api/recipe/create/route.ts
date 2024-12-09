import { db } from "@/lib/db";
import { IngredientUnit } from "@/lib/enums/enums";
import { ApiResponse } from "@/lib/types/types";
import { checkIsExisting } from "@/lib/validators/db-validators";
import { NextRequest, NextResponse } from "next/server";

interface Recipe {
    name: string;
    slug: string;
    categoryId: string;
    imageUrl?: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
}

interface RecipeRequest extends Recipe {
    ingredients: RecipeIngredientRequest[];
    steps: RecipeStepRequest[];
}

interface RecipeIngredientRequest {
    ingredientId: string;
    quantity: number;
    unit: IngredientUnit;
}

interface RecipeStepRequest {
    stepNumber: number;
    description: string;
    duration: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name, categoryId, imageUrl, cookingTime, numberOfServings, difficulty, vegan, healthy, ingredients, steps }: RecipeRequest = await req.json();

        const isExisting: boolean = await checkIsExisting('recipe', name);
        if (isExisting) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "A recipe with this name already exists", success: false }, { status: 409 })
        }

        const newRecipe: Recipe = await db.recipe.create({
            data: {
                name: name.trim(),
                slug: name.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
                categoryId,
                imageUrl: imageUrl || undefined,
                cookingTime,
                numberOfServings,
                difficulty,
                vegan,
                healthy,
                ingredients: {
                    create: ingredients.map((ingredient: RecipeIngredientRequest) => ({
                        ingredient: {
                            connect: {
                                id: ingredient.ingredientId
                            }
                        },
                        quantity: ingredient.quantity,
                        unit: ingredient.unit
                    })),
                },
                steps: {
                    create: steps.map((step: RecipeStepRequest, index: number) => ({
                        stepNumber: index + 1,
                        description: step.description,
                        duration: step.duration,
                    })),
                },
            },
        });

        return NextResponse.json<ApiResponse<Recipe>>({ data: newRecipe, message: "Recipe created", success: true }, { status: 201 });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log("[RECIPES_POST]", error);
        }
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}