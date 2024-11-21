import { db } from '@/lib/db';
import { ApiResponse, Recipe } from '@/lib/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        const recipes: Recipe[] = await db.recipe.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        if (!recipes) {
            return NextResponse.json<ApiResponse<null>>({ message: "Recipes not found", success: false }, { status: 404 });
        }

        return NextResponse.json<ApiResponse<Recipe[]>>({ data: recipes, message: "Recipes found", success: true }, { status: 200 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return NextResponse.json<ApiResponse<null>>({ message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, categoryId, imageUrl, cookingTime, numberOfServings, ingredients, steps } = await req.json();

        const requiredFields = [
            { field: name, message: "Name is required" },
            { field: categoryId, message: "Category is required" },
            { field: imageUrl, message: "Image URL is required" },
            { field: cookingTime, message: "Cooking time is required" },
            { field: numberOfServings, message: "Number of servings is required" },
            { field: ingredients, message: "Ingredients are required" },
            { field: steps, message: "Steps are required" }
        ];

        for (const { field, message } of requiredFields) {
            if (!field) {
                return new NextResponse(message, { status: 400 });
            }
        };

        const newRecipe = await db.recipe.create({
            data: {
                name,
                categoryId,
                imageUrl,
                cookingTime,
                numberOfServings,
                ingredients: {
                    create: ingredients.map((ingredient: { ingredientId: string; quantity: string; unit: string }) => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: parseFloat(ingredient.quantity),
                        unit: ingredient.unit
                    })),
                },
                steps: {
                    create: steps.map((step: { description: string; duration: number }, index: number) => ({
                        stepNumber: index + 1,
                        description: step.description,
                        duration: step.duration,
                    })),
                },
            },
        });

        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return new NextResponse(`Internal Error: ${(error as Error).message}`, { status: 500 });
    }
}