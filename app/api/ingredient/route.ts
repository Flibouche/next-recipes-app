import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(req: NextRequest) {
    try {
        
    } catch (error) {
        
    }
}