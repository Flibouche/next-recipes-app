import { IngredientUnit } from "../enums/enums";
import { type UserResource } from '@clerk/types';

export interface ApiResponse<T> {
    data?: T;
    message: string;
    success: boolean;
}

export interface ErrorDisplayProps {
    message: string
    reset: () => void
}

// Recipe

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

// Ingredient

export interface Ingredient {
    id: string;
    name: string;
}

export interface IngredientRequest {
    name: string;
}

// Category

export interface Category {
    id: string;
    name: string;
}

export interface CategoryRequest {
    name: string;
}

// Form

export interface FormInputProps {
    htmlFor: string;
    labelText: string;
    idName: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

// Session

export interface Session {
    user: UserResource;
}