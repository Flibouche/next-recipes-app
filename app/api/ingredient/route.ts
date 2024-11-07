import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const ingredients = await db.ingredient.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(ingredients);
    } catch (error) {
        console.log("[INGREDIENTS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}