import Link from 'next/link'
import { fetchRecipes } from '@/utils/recipeUtils';
import type { Recipe } from '@/lib/types/types';
import Image from 'next/image';

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
            <div className='grid grid-cols-4'>
                {recipes?.map((recipe: Recipe) => (
                    <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        {recipe.imageUrl ? (
                            <Image
                                src={recipe.imageUrl}
                                alt={recipe.name}
                                width={200}
                                height={200}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
        </>
    )
}