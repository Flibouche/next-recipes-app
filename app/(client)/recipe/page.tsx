import Link from 'next/link'
import { fetchRecipes } from '@/lib/services/recipeService';
import RecipesList from './_components/RecipesList';

interface Recipe {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    category: Category;
    imageUrl: string | null;
    cookingTime: number;
    numberOfServings: number;
    difficulty: number;
    vegan: boolean;
    healthy: boolean;
}

interface Category {
    id: string;
    name: string;
}

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
        <section className="min-h-screen py-20">
            <div className="container">
                <h1>Recipes :</h1>
                <nav>
                    <Link href='/recipe/add'>Add a recipe</Link>
                </nav>
                <div className='px-4 py-6'>
                    {recipes ? (
                        <RecipesList recipes={recipes} />
                    ) : (
                        <p>No recipes available</p>
                    )}
                </div>
                {error && <p>{error}</p>}
            </div>
        </section>
    )
}