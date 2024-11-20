"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Ingredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('/api/ingredient');
                if (!response.ok) {
                    setError('Failed to fetch ingredients');
                }

                const data = await response.json();

                setIngredients(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            }
        }
        fetchIngredients();
    }, []);

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <h1>Ingredients :</h1>
            <nav>
                <Link href='/ingredient/add'>Add ingredient</Link>
            </nav>
            <div>
                {ingredients.map((ingredient: { id: string, name: string }) => (
                    <div key={ingredient.id}>
                        <h2>{ingredient.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Ingredient