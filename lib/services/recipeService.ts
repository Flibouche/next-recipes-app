import { ApiResponse } from "@/lib/types/types";
import { API_ROUTES } from "../routes";

interface Recipe {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    category: Category;
    imageUrl: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
}

interface RecipeWithSlug extends Recipe {
    ingredients: Ingredients[];
    steps: Steps[];
}

interface Category {
    id: string;
    name: string;
}

interface Ingredient {
    id: string;
    name: string;
}

interface Ingredients {
    id: string;
    quantity: number;
    unit: string;
    ingredient: Ingredient;
}

interface Steps {
    id: string;
    stepNumber: number;
    description: string;
    duration: number;
}

export async function fetchRecipes(): Promise<Recipe[]> {
    try {
        const response: Response = await fetch(API_ROUTES.RECIPES.GET_ALL, { method: 'GET' });
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

export async function fetchLastAddedRecipes(): Promise<Recipe[]> {
    try {
        const response: Response = await fetch(API_ROUTES.RECIPES.GET_LAST_ADDED, { method: 'GET' });
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

export async function fetchDetailedRecipe(recipeSlug: string): Promise<RecipeWithSlug> {
    try {

        if (!recipeSlug) {
            throw new Error('Recipe slug is required');
        }

        const response: Response = await fetch(API_ROUTES.RECIPES.GET_ONE(recipeSlug), { method: 'GET', cache: 'no-cache' });
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }

        const data: ApiResponse<RecipeWithSlug> = await response.json();
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