import { ApiResponse, Recipe } from "@/lib/types/types";

export async function fetchRecipes(): Promise<Recipe[]> {
    try {
        const response: Response = await fetch("http://localhost:3000/api/recipe", { method: 'GET', next: { revalidate: 10 } });
        // const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/recipe`, { method: 'GET', next: { revalidate: 10 } });
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        const data: ApiResponse<Recipe[]> = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        console.log(data);

        return data.data ?? [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
}

export async function fetchDetailedRecipe(recipeId: string): Promise<Recipe[]> {
    try {

        if (recipeId === undefined) {
            throw new Error('Recipe ID is required');
        }

        const response: Response = await fetch(`http://localhost:3000/api/recipe?type=detailed&id=${recipeId}`, { method: 'GET', next: { revalidate: 10 } });
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }

        const data: ApiResponse<Recipe[]> = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        if (!data.data) {
            throw new Error('Recipe data is undefined');
        }

        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
}