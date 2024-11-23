import { IngredientUnit } from "../enums/enums";

export interface ApiResponse<T> {
    data?: T;
    message: string;
    success: boolean;
}

export interface ErrorDisplayProps {
    message: string
    reset: () => void
}

export interface Recipe {
    id: string;
    name: string;
    category?: {
        id: string;
        name: string;
    }
    imageUrl: string | null;
    numberOfServings: number;
    cookingTime: number;
}

export interface RecipesList {
    recipes: Recipe[];
}

export interface RecipeRequest {
    id: string;
    categoryId: string;
    name: string;
    imageUrl: string | null;
    cookingTime: number;
    numberOfServings: number;
    ingredients: IngredientRequest[];
    steps: StepRequest[];
}

export interface IngredientRequest {
    ingredientId: string;
    quantity: string;
    unit: IngredientUnit;
}

export interface StepRequest {
    description: string;
    duration: number;
}

export interface Ingredient {
    id: string;
    name: string;
}

export interface IngredientRequest {
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface CategoryRequest {
    name: string;
}