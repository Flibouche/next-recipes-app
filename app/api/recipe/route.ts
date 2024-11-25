import { db } from '@/lib/db';
import { ApiResponse, Recipe, RecipeIngredient, RecipeStep } from '@/lib/types/types';
import { checkIsExisting } from '@/lib/validators/db-validators';
import { NextRequest, NextResponse } from 'next/server';

type GetUndetailedRecipe = Omit<Recipe, "ingredients" | "steps">;

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get('type');
        const id = url.searchParams.get('id') || undefined;

        let recipes: Recipe[] | GetUndetailedRecipe[];

        switch (type) {
            case "detailed":
                const recipe = await db.recipe.findUnique({
                    where: { id: id },
                    include: {
                        category: true,
                    },
                }) as Recipe;

                if (!recipe) {
                    recipes = [];
                } else {
                    recipes = [recipe];
                }

                break;

            default:
                recipes = await db.recipe.findMany({
                    select: {
                        id: true,
                        name: true,
                        category: true,
                        imageUrl: true,
                        cookingTime: true,
                        numberOfServings: true,
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }) as GetUndetailedRecipe[];
                break;
        }

        if (!recipes) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Recipes not found", success: false }, { status: 404 });
        }

        return NextResponse.json<ApiResponse<Recipe[] | GetUndetailedRecipe[]>>({ data: recipes, message: "Recipes found", success: true }, { status: 200 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}

type RecipeRequest = Omit<Recipe, "id" | "createdAt" | "updatedAt">;
type RecipeResponse = Omit<Recipe, "category" | "ingredients" | "steps">;

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name, categoryId, imageUrl, cookingTime, numberOfServings, difficulty, vegan, healthy, ingredients, steps }: RecipeRequest = await req.json();

        const requiredFields = [
            { field: name, message: "Name is required" },
            { field: categoryId, message: "Category is required" },
            { field: imageUrl, message: "Image URL is required" },
            { field: cookingTime, message: "Cooking time is required" },
            { field: numberOfServings, message: "Number of servings is required" },
            { field: difficulty, message: "Difficulty is required" },
            { field: vegan, message: "Vegan is required" },
            { field: healthy, message: "Healthy is required" },
            { field: ingredients, message: "Ingredients are required" },
            { field: steps, message: "Steps are required" }
        ];

        for (const { field, message } of requiredFields) {
            if (!field) {
                return NextResponse.json<ApiResponse<null>>({ data: null, message, success: false }, { status: 400 });
            }
        };

        const isExisting: boolean = await checkIsExisting('recipe', name);
        if (isExisting) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "A recipe with this name already exists", success: false }, { status: 409 })
        }

        const newRecipe: RecipeResponse = await db.recipe.create({
            data: {
                name: name.trim(),
                categoryId,
                imageUrl,
                cookingTime,
                numberOfServings,
                difficulty,
                vegan,
                healthy,
                ingredients: {
                    create: ingredients.map((ingredient: RecipeIngredient) => ({
                        ingredient: {
                            connect: {
                                id: ingredient.ingredientId
                            }
                        },
                        quantity: parseFloat(ingredient.quantity),
                        unit: ingredient.unit
                    })),
                },
                steps: {
                    create: steps.map((step: RecipeStep, index: number) => ({
                        stepNumber: index + 1,
                        description: step.description,
                        duration: step.duration,
                    })),
                },
            },
        });

        return NextResponse.json<ApiResponse<RecipeResponse>>({ data: newRecipe, message: "Recipe created", success: true }, { status: 201 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}