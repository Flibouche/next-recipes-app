
import { fetchDetailedRecipe } from '@/lib/services/recipeService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{ recipeSlug: string }>
}

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
    ingredients: Ingredients[];
    steps: Steps[];
}

interface Category {
    id: string;
    name: string;
}

interface Ingredients {
    id: string;
    quantity: number;
    unit: string;
    ingredient: { id: string, name: string };
}

interface Steps {
    id: string;
    stepNumber: number;
    description: string;
    duration: number;
}

export default async function DetailedRecipe({ params }: Props) {
    const { recipeSlug } = await params;
    const data: Recipe = await fetchDetailedRecipe(recipeSlug);
    console.table(data.ingredients[0].ingredient.name);
    if (!data) {
        return notFound();
    }

    // const recipe = data[0];
    const { id, name, categoryId, category, imageUrl, cookingTime, numberOfServings, difficulty, vegan, healthy } = data;

    return (
        <>
            <p>{id}</p>
            <h1>{name}</h1>
            <p>{cookingTime}</p>
            <p>{categoryId}</p>
            <p>{category?.name}</p>
            <Image
                src={imageUrl || ''}
                alt={name}
                width={300}
                height={300}
            />
            <p>{numberOfServings}</p>
            <p>{difficulty}</p>
            <p>{vegan ? 'Vegan' : 'Non-Vegan'}</p>
            <p>{healthy ? 'Healthy' : 'Not Healthy'}</p>
        </>
    );
}