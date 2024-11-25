import { fetchDetailedRecipe } from '@/utils/recipeUtils';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function DetailedRecipe({ params }: { params: { recipeId: string } }) {
    const data = await fetchDetailedRecipe(params.recipeId);
    if (!data) {
        return notFound();
    }
    console.log(data);

    const recipe = data[0];

    return (
        <>
            <h1>{recipe.name}</h1>
        </>
    )
}