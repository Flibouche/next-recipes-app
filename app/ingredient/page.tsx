"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Ingredient = () => {
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await fetch('/api/ingredient');
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