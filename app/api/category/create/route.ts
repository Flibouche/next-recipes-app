import { db } from "@/lib/db";
import { ApiResponse } from "@/lib/types/types";
import { checkIsExisting } from "@/lib/validators/db-validators";
import { NextRequest, NextResponse } from "next/server";

interface Category {
    name: string;
}

interface CategoryRequest {
    name: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // 1. J'extrait et je vérifie les données reçues
        const { name }: CategoryRequest = await request.json();
        if (!name) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "Name is required", success: false }, { status: 400 })
        }

        // 2. Je vérifie si la catégorie existe déjà
        const isExisting: boolean = await checkIsExisting('category', name);
        if (isExisting) {
            return NextResponse.json<ApiResponse<null>>({ data: null, message: "A category with this name already exists", success: false }, { status: 409 })
        }

        // 3. J'ajoute la catégorie en base de données
        const newCategory: Category = await db.category.create({
            data: { name: name.trim(), slug: name.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') }
        })

        return NextResponse.json<ApiResponse<Category>>({ data: newCategory, message: "Category created", success: true }, { status: 201 });
    } catch (error) {
        console.log("[CATEGORY_POST]", error);
        return NextResponse.json<ApiResponse<null>>({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}