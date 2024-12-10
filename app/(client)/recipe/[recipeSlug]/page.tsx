
import { fetchDetailedRecipe } from '@/lib/services/recipeService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { PiCookingPotFill } from "react-icons/pi";
import { IoMdPerson, IoIosTimer } from 'react-icons/io';

type Props = {
    params: Promise<{ recipeSlug: string }>
}

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
    ingredients: Ingredients[];
    steps: Steps[];
}

interface Category {
    id: string;
    name: string;
}

interface Ingredients {
    id: string;
    quantity: number;
    unit: string;
    ingredient: { id: string, name: string };
}

interface Steps {
    id: string;
    stepNumber: number;
    description: string;
    duration: number;
}

export default async function DetailedRecipe({ params }: Props) {
    const { recipeSlug } = await params;
    const data: Recipe = await fetchDetailedRecipe(recipeSlug);
    // console.table(data.ingredients[0].ingredient.name);
    console.log(data);
    if (!data) {
        return notFound();
    }

    // const recipe = data[0];
    const { id, name, categoryId, category, imageUrl, cookingTime, numberOfServings, difficulty, vegan, healthy, ingredients, steps } = data;

    return (
        <section className="container pb-10">
            <div className='mb-10 flex flex-col gap-8 rounded-xl bg-accent-100 p-5 lg:flex-row'>
                <div className="relative h-[30vh] w-full overflow-hidden rounded-lg md:h-[40vh] lg:w-1/2 xl:h-[50vh]">
                    <Image
                        src={imageUrl || ''}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className='flex flex-col justify-center space-y-6 px-4'>
                    <h1 className='text-4xl font-bold uppercase'>{name}</h1>
                    <div className='flex flex-row items-center space-x-2'>
                        {Array.from({ length: difficulty }, (_, i) => (
                            <PiCookingPotFill key={i} className='text-primary' />
                        ))}
                        <span>({difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'})</span>
                    </div>
                    <div className='flex flex-row justify-start space-x-10'>
                        <div className='text-center'>
                            <div className='flex size-12 items-center justify-center rounded-lg bg-white'>
                                <IoIosTimer className='size-7 fill-black' />
                            </div>
                            <p>{cookingTime}&quot;</p>
                        </div>

                        <div className='text-center'>
                            <div className='flex size-12 items-center justify-center rounded-lg bg-white'>
                                <IoMdPerson className='size-8 fill-black' />
                            </div>
                            <p>{numberOfServings}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between gap-5 lg:flex-row'>
                <div className='w-full bg-secondary-100'>
                    <h2 className='text-2xl font-bold uppercase'>Ingredients</h2>
                    <ul className='flex flex-col space-y-4'>
                        {ingredients.map((ingredient, index) => (
                            <li className='flex flex-row justify-between' key={index}>
                                <span>{ingredient.ingredient.name}</span>
                                <div className='space-x-5'>
                                    <span>{ingredient.quantity}</span>
                                    <span>{ingredient.unit}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='w-full bg-secondary-100'>
                    <h2 className='text-2xl font-bold uppercase'>Steps</h2>
                    <ul className='flex flex-col space-y-4'>
                        {steps.map((step, index) => (
                            <li key={index}>
                                <h3>Step {step.stepNumber}</h3>
                                <p>{step.description}</p>
                                <p>{step.duration}&quot;</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p>{id}</p>
            <p>{categoryId}</p>
            <p>{category?.name}</p>
            <p>{vegan ? 'Vegan' : 'Non-Vegan'}</p>
            <p>{healthy ? 'Healthy' : 'Not Healthy'}</p>

        </section>
    );
}