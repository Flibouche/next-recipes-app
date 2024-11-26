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
    category: { id: string, name: string };
    categoryId: string;
    imageUrl: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
    createdAt: Date;
    updatedAt: Date;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
}

export interface RecipesList {
    recipes: Recipe[];
}

export interface RecipeIngredient {
    ingredientId: string;
    quantity: number;
    unit: IngredientUnit;
}

export interface RecipeStep {
    stepNumber: number;
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