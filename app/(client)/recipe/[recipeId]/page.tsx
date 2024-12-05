import { Recipe } from '@/lib/types/types';
import { fetchDetailedRecipe } from '@/lib/services/recipeService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function DetailedRecipe({ params }: { params: { recipeId: string } }) {
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