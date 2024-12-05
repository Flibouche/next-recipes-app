"use client";

import type { Ingredient } from "@/lib/types/types";
// import { fetchIngredients } from "@/lib/services/ingredientService";
import Link from "next/link";
import AddIngredient from "./_components/AddIngredient";
import { useEffect, useState } from "react";
// import { fetchIngredients } from "@/lib/services/ingredientService";

const IngredientPage = () => {
    /* Liste des ingredients */
    // let ingredients: Ingredient[] | null = null;
    // let error: string | null = null;

    const [ingredients, setIngredients] = useState<Ingredient[] | null>([]);

    const fetchIngredients = async () => {
        const response = await fetch('/api/ingredient');
        const data = await response.json();
        setIngredients(data.data);
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

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
                    {/* {error && <p>{error}</p>} */}
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

export default IngredientPage;


// export default async function Ingredient() {
//     /* Liste des ingredients */
//     let ingredients: Ingredient[] | null = null;
//     let error: string | null = null;

//     try {
//         ingredients = await fetchIngredients();
//         console.log(ingredients);
//     } catch (e) {
//         console.log(error);
//         error = e instanceof Error ? e.message : 'An error occured';
//     }

//     return (
//         <section className="min-h-screen py-20">
//             <div className="container flex flex-row space-x-[50%]">
//                 {/* Liste des ingredients */}
//                 <div className="bg-accent-50">
//                     <h2 className="text-4xl font-bold">Ingredients</h2>
//                     <Link href='/ingredient/add'>Add an ingredient</Link>
//                     <div className="grid grid-cols-4">
//                         {ingredients?.map((ingredient: Ingredient) => (
//                             <div key={ingredient.id}>
//                                 <h2>{ingredient.name}</h2>
//                             </div>
//                         ))}
//                     </div>
//                     {error && <p>{error}</p>}
//                 </div>

//                 {/* Ajouter un ingrédient */}
//                 <div>
//                     <h2 className="text-4xl font-bold">Add an ingredient</h2>
//                     <AddIngredient />
//                 </div>
//             </div>
//         </section>
//     )
// }