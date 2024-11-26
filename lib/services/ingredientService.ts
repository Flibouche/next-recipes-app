import { ApiResponse } from "@/lib/types/types";
import { Ingredient } from "@prisma/client";

export async function fetchIngredients(): Promise<Ingredient[]> {
    try {
        const response: Response = await fetch("http://localhost:3000/api/ingredient", { method: 'GET', next: { revalidate: 10 } });
        if (!response.ok) {
            throw new Error('Failed to fetch ingredients');
        }

        const data: ApiResponse<Ingredient[]> = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data ?? [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
}