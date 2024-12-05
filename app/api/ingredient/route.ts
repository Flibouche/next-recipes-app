import { db } from '@/lib/db';
import { ApiResponse, IngredientRequest } from '@/lib/types/types';
import { checkIsExisting } from '@/lib/validators/db-validators';
import { Ingredient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

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
            console.log(ingredients);
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Ingredients not found", success: false }, { status: 404 })
        }

        return NextResponse.json<ApiResponse<Ingredient[]>>({ data: ingredients, message: "Ingredients found", success: true }, { status: 200 })
    } catch (error) {
        console.log("[INGREDIENTS_GET]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // 1. J'extrait et je vérifie les données reçues
        const { name }: IngredientRequest = await request.json();
        if (!name) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Name is required", success: false }, { status: 400 })
        }

        // 2. Je vérifie si l'ingrédient existe déjà
        const isExisting: boolean = await checkIsExisting('ingredient', name);
        if (isExisting) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "An ingredient with this name already exists", success: false }, { status: 409 })
        }

        // 3. J'ajoute l'ingrédient en base de données
        const newIngredient: Ingredient = await db.ingredient.create({
            data: { name: name.trim() }
        })

        return NextResponse.json<ApiResponse<Ingredient>>({ data: newIngredient, message: "Ingredient created", success: true }, { status: 201 });
    } catch (error) {
        console.log("[INGREDIENTS_POST]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}