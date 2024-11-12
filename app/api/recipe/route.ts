import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const recipes = await db.recipe.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, cookingTime, numberOfServings, ingredients, steps } = await req.json();

        const requiredFields = [
            { field: name, message: "Name is required" },
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
                cookingTime,
                numberOfServings,
                ingredients: {
                    create: ingredients
                },
                steps: {
                    create: steps
                }
            }
        });

        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        console.log("[RECIPES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}