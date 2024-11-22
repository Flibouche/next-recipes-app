import { ApiResponse, Recipe } from "@/lib/types/types";

export async function fetchRecipes(): Promise<Recipe[]> {
    try {
        const response: Response = await fetch("http://localhost:3000/api/recipe", { method: 'GET', next: { revalidate: 10 } });
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        const data: ApiResponse<Recipe[]> = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data ?? [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
}