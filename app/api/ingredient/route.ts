import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des ingrédients
        const ingredients = await db.ingredient.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error) {
        console.log("[INGREDIENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // 1. J'extrait et je vérifie les données reçues
        const { name } = await request.json();
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        // 2. Je vérifie si l'ingrédient existe déjà
        const existing = await db.ingredient.findUnique({
            where: { name: name.trim() }
        })

        if (existing) {
            return new NextResponse("An ingredient with this name already exists", { status: 409 });
        }

        // 3. J'ajoute l'ingrédient en base de données
        const newIngredient = await db.ingredient.create({
            data: { name: name.trim() }
        })

        return NextResponse.json(newIngredient, { status: 201 });
    } catch (error) {
        console.log("[INGREDIENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}