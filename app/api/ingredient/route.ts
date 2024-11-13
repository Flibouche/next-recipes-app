import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        const ingredients = await db.ingredient.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error) {
        console.log("[INGREDIENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { name } = await request.json();

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const newIngredient = await db.ingredient.create({
            data: { name }
        })

        return NextResponse.json(newIngredient, { status: 201 });
    } catch (error) {
        console.log("[INGREDIENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}