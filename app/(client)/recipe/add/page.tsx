"use client";

import FormInput from '@/components/FormInput';
import { useEffect, useState } from 'react'

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [numberOfServings, setNumberOfServings] = useState(0);
    // const [ingredients, setIngredients] = useState([]);
    // const [steps, setSteps] = useState(['']);

    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');
                if (!response.ok) {
                    setError('Failed to fetch categories');
                }

                const data = await response.json();

                console.log('Categories data:', data);
                setCategories(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occured');
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, categoryId, imageUrl, cookingTime, numberOfServings }),
            });

            if (response.ok) {
                setMessage('Recipe added successfully');
                setName('');
                setCategoryId('');
                setImageUrl('');
                setCookingTime(0);
                setNumberOfServings(0);
            } else {
                const errorText = await response.text();
                setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            setMessage(`Error: ${error}`);
        }
    }

    if (error) {
        throw new Error(error);
    }

    return (
        <div>
            <h1>Add a recipe</h1>
            <form onSubmit={handleSubmit} className='text-black'>
                {/* Name */}
                <FormInput
                    htmlFor="recipeName"
                    labelText="Name of the recipe"
                    idName="recipeName"
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder='Name of the recipe'
                />

                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category: { id: string, name: string }) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ImageUrl */}
                <div className='flex flex-col'>
                    <label htmlFor="recipeImageUrl">Image of the recipe</label>
                    <input
                        id='recipeImageUrl'
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder='Image URL'
                        required
                    />
                </div>

                {/* Cooking Time */}
                <div className='flex flex-col'>
                    <label htmlFor="cookingTime">Cooking Time</label>
                    <input
                        id='cookingTime'
                        type="number"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(parseInt(e.target.value))}
                        placeholder='Cooking Time'
                        required
                    />
                </div>

                {/* Number of servings */}
                <div className='flex flex-col'>
                    <label htmlFor="numberOfServings">Number of servings</label>
                    <input
                        id='numberOfServings'
                        type="number"
                        value={numberOfServings}
                        onChange={(e) => setNumberOfServings(parseInt(e.target.value))}
                        placeholder='Number of servings'
                        required
                    />
                </div>

                <button type='submit'>Add recipe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRecipe