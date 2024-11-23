import Link from 'next/link'
import { fetchRecipes } from '@/utils/recipeUtils';
import type { Recipe } from '@/lib/types/types';
import RecipesList from './_components/RecipesList';

export default async function Recipe() {
    let recipes: Recipe[] | null = null;
    let error: string | null = null;

    try {
        recipes = await fetchRecipes();
        console.log(recipes);
    } catch (e) {
        error = e instanceof Error ? e.message : 'An error occurred';
    }

    return (
        <>
            <h1>Recipes :</h1>
            <nav>
                <Link href='/recipe/add'>Add a recipe</Link>
            </nav>
            <div className='container mx-auto px-4 py-6'>
                {recipes ? (
                    <RecipesList recipes={recipes} />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            {error && <p>{error}</p>}
        </>
    )
}