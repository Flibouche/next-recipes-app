import { Recipe } from '@/lib/types/types';
import { fetchDetailedRecipe } from '@/lib/services/recipeService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ recipeId: string }> }): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const recipe = await fetchDetailedRecipe(resolvedParams.recipeId);
        return {
            title: recipe.name,
            description: `Détails de la recette ${recipe.name}`,
        };
    } catch (error) {
        console.error('[RECIPE_METADATA]', error);
        return {
            title: 'Recette non trouvée',
        };
    }
}

export default async function DetailedRecipe({ params }: { params: Promise<{ recipeId: string }> }) {
    const resolvedParams = await params;
    const data: Recipe = await fetchDetailedRecipe(resolvedParams.recipeId);
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