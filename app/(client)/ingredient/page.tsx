"use client";

// React
import { useEffect, useState } from "react";

// Routes
import { API_ROUTES } from "@/lib/routes";

// Interfaces & Types
interface Ingredient {
    id: string;
    name: string;
}

// Components
import AddIngredient from "./_components/AddIngredient";

export default function IngredientPage() {
    // Etat local pour stocker les ingrédients
    const [ingredients, setIngredients] = useState<Ingredient[] | null>([]);

    // Fonction pour récupérer les ingrédients
    const fetchIngredients = async () => {
        const response = await fetch(API_ROUTES.INGREDIENTS.GET_ALL);
        const ingredients = await response.json();
        setIngredients(ingredients.data);
    }

    // Appel de la fonction fetchIngredients au chargement de la page
    useEffect(() => {
        fetchIngredients();
    }, []);

    // Fonction pour rafraîchir la liste des ingrédients
    const handleIngredientAdded = () => {
        fetchIngredients();
    }

    return (
        <section className="min-h-screen py-20">
            <div className="container flex flex-row space-x-[50%]">

                {/* Liste des ingredients */}
                <div className="bg-accent-50">
                    <h2 className="text-4xl font-bold">Ingredients</h2>
                    <div className="grid grid-cols-4">
                        {ingredients?.map((ingredient: Ingredient) => (
                            <div key={ingredient.id}>
                                <h2>{ingredient.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ajouter un ingrédient */}
                <div>
                    <h2 className="text-4xl font-bold">Add an ingredient</h2>
                    <AddIngredient onIngredientAdded={handleIngredientAdded} />
                </div>

            </div>
        </section>
    )
}