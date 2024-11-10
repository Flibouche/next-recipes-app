"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ErrorDisplay from '@/components/ErrorDisplay';

const Ingredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await fetch('/api/ingredient');
            if (!response.ok) {
                throw new Error('Something went wrong while fetching ingredients');
            }

            const data = await response.json();

            setIngredients(data);
        }
        fetchIngredients();
    }, []);

    return (
        <>
            <h1>Ingredients :</h1>
            <nav>
                <Link href='/ingredient/add'>Add ingredient</Link>
            </nav>
            <div>
                {ingredients.map((ingredient: any) => (
                    <div key={ingredient.id}>
                        <h2>{ingredient.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Ingredient