import Link from 'next/link'
import { fetchRecipes } from '@/utils/recipeUtils';
import type { Recipe } from '@/lib/types/types';

export default async function Recipe() {
    let recipes: Recipe[] | null = null;
    let error: string | null = null;

    try {
        recipes = await fetchRecipes();
    } catch (e) {
        error = e instanceof Error ? e.message : 'An error occurred';
    }

    return (
        <>
            <h1>Recipes :</h1>
            <nav>
                <Link href='/recipe/add'>Add a recipe</Link>
            </nav>
            <div>
                {recipes?.map((recipe: { id: string, name: string }) => (
                    <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
        </>
    )
}