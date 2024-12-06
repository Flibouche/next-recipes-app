import { Recipe } from '@/lib/types/types';
import { fetchDetailedRecipe } from '@/lib/services/recipeService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';

type RecipePageProps = {
    params: {
        recipeId: string;
    };
};

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
    try {
        const recipe = await fetchDetailedRecipe(params.recipeId);
        return {
            title: recipe.name,
            description: `Détails de la recette ${recipe.name}`
        };
    } catch (error) {
        console.error('[RECIPE_METADATA]', error);
        return {
            title: 'Recette non trouvée'
        };
    }
}

export default async function DetailedRecipe({ params }: RecipePageProps) {
    const data: Recipe = await fetchDetailedRecipe(params.recipeId);
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
            <p>{category.name}</p>
            <Image
                src={imageUrl || ''}
                alt={name}
                width={300}
                height={300}
            />
            <p>{numberOfServings}</p>
            <p>{difficulty}</p>
            <p>{vegan}</p>
            <p>{healthy}</p>
        </>
    )
}