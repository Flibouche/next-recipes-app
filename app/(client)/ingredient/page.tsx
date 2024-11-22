import type { Ingredient } from "@/lib/types/types";
import { fetchIngredients } from "@/utils/ingredientUtils";
import Link from "next/link";

export default async function Ingredient() {
    let ingredients: Ingredient[] | null = null;
    let error: string | null = null;

    try {
        ingredients = await fetchIngredients();
        console.log(ingredients);
    } catch (e) {
        error = e instanceof Error ? e.message : 'An error occured';
    }

    return (
        <>
            <h1>Ingredients :</h1>
            <nav>
                <Link href='/ingredient/add'>Add an ingredient</Link>
                <div className="grid grid-cols-4">
                    {ingredients?.map((ingredient: Ingredient) => (
                        <div key={ingredient.id}>
                            <h2>{ingredient.name}</h2>
                        </div>
                    ))}
                </div>
            </nav>
            {error && <p>{error}</p>}
        </>
    )
}