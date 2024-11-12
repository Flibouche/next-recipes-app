"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/recipe');
                if (!response.ok) {
                    setError('Failed to fetch recipes');
                }

                const data = await response.json();

                setRecipes(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            }
        }
        fetchRecipes();
    }, []);

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <h1>Ingredients :</h1>
            <nav>
                <Link href='/recipe/add'>Add a recipe</Link>
            </nav>
            <div>
                {recipes.map((recipe: any) => (
                    <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Recipe