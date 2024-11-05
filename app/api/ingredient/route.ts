import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
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