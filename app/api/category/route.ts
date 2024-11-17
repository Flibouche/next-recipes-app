import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        // 1. Je récupère la liste des catégories
        const categories = await db.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}