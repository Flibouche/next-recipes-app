import Image from "next/image";
import { ImQuotesLeft } from "react-icons/im";
import Link from "next/link";
import SponsorsSwiper from "@/components/SponsorsSwiper";
import { fetchLastAddedRecipes } from "@/lib/services/recipeService";
import RecipeCard from "./(client)/recipe/_components/RecipeCard";

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

export default async function Home() {
    let recipes: Recipe[] | null = null;
    let error: string | null = null;

    try {
        recipes = await fetchLastAddedRecipes();
        console.log(recipes);
    } catch (e) {
        error = e instanceof Error ? e.message : 'An error occurred';
    }

    return (
        <>
            {/* Hero */}
            <section className="relative bg-primary-50 py-20 md:min-h-[60vh] lg:min-h-[92vh]">
                {/* Background image */}
                <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-center gap-10 px-6 md:flex-row md:gap-[3%]">
                    <div className="flex w-full justify-center md:w-1/2">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={450}
                            height={450}
                            className="hidden md:block md:rounded-e-full"
                        />
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={600}
                            height={450}
                            className="h-[450px] rounded-bl-xl rounded-br-[10%] rounded-tl-[10%] rounded-tr-xl object-cover md:hidden"
                        />
                    </div>
                    <div className="mx-auto w-full max-w-screen-xl space-y-4 px-3 md:w-1/2">
                        <h1 className="text-4xl font-bold uppercase text-primary md:text-6xl">Your <br /> <span className="text-6xl md:text-7xl lg:text-8xl">Next.js</span><br />cooking recipe</h1>
                        <h2 className="text-xl">Discover Recipes Crafted by Food Lovers, for Food Lovers</h2>
                        <p>Unleash your inner chef with dishes designed to inspire, created with passion, and perfect for every skill level. Join our community and turn everyday meals into extraordinary moments.</p>
                        <Link href="/recipe">
                            <button className="my-3 rounded-3xl bg-primary px-7 py-3 font-bold text-text-50 hover:bg-primary-700">
                                Discover all recipes
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sponsors swiper */}
            <section className="h-[20vh] bg-white">
                <SponsorsSwiper />
            </section>

            {/* Citation */}
            <section className="bg-accent-100 py-20 md:h-[60vh] lg:h-[80vh]">
                <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center space-y-5 px-6">
                    <ImQuotesLeft className="text-4xl text-secondary-800" />
                    <p className="text-center text-2xl md:text-3xl">Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors... It&apos;s how you combine them that sets you apart. Each meal is a canvas, each ingredient a color, and every chef an artist creating something unique and memorable.</p>
                    <span className="italic md:text-lg">Claude Anthropic - 2024</span>
                </div>
            </section>

            {/* About */}
            <section className="py-20 md:h-[60vh] md:py-0">
                <div className="grid grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-0">
                    {/* Section texte */}
                    <div className="mx-auto max-w-screen-xl px-6">
                        <h2 className="text-4xl font-bold">About</h2>
                        <p className="mt-4 leading-relaxed">
                            Our Chefs offer you perfect cooking, best served dishes with fresh ingredients and old recipes.
                        </p>
                        <p className="mt-4 leading-relaxed">
                            We have carefully sourced and seasonal ingredients in our disposal to make rustic dishes.
                        </p>
                        <a
                            href="#"
                            className="mt-6 inline-block rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-900"
                        >
                            Read More
                        </a>
                    </div>

                    {/* Section image */}
                    <div className="relative h-[60vh] w-full overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732314440/chef.jpg"
                            alt="Chefs"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="rounded-bl-[10%] rounded-br-xl rounded-tl-xl rounded-tr-[10%] object-cover md:rounded-none"
                        />
                    </div>
                </div>
            </section>

            {/* Last Recipes */}
            <section className="bg-accent-100 py-20">
                <div className="mx-auto max-w-screen-xl px-6">
                    <h2 className="text-4xl font-bold">Last recipes added</h2>
                    <div className='flex flex-col justify-between gap-10 p-6 md:flex-row'>
                        {recipes?.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                slug={recipe.slug}
                                imageUrl={recipe.imageUrl}
                                name={recipe.name}
                                category={recipe.category}
                                numberOfServings={recipe.numberOfServings}
                                cookingTime={recipe.cookingTime}
                            />
                        ))}
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </section>
        </>
    );
}