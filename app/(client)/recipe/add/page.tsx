"use client";

import { useEffect, useState } from 'react';
import { z } from 'zod';

// Components
import FormInput from '@/components/FormInput';
import { RecipeIngredient, RecipeStep } from '@/lib/types/types';
import { IngredientUnit } from '@/lib/enums/enums';

const AddRecipe = () => {
    //#region //* STATES
    //? Recipe states
    const [recipe, setRecipe] = useState({
        name: '', categoryId: '', imageUrl: '', cookingTime: 0, numberOfServings: 0,
    });

    //? Categories states
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    //? Ingredients states
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
        { ingredientId: '', quantity: 0, unit: IngredientUnit.GRAM },
    ]);
    const [availableIngredients, setAvailableIngredients] = useState<{ id: string; name: string, imageUrl: string }[]>([]);
    const units = Object.values(IngredientUnit);

    //? Steps states
    const [steps, setSteps] = useState<RecipeStep[]>([
        { stepNumber: 1, description: '', duration: 0 },
    ]);

    //? Error states
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<{
        name?: string;
        categoryId?: string;
        imageUrl?: string;
        cookingTime?: string;
        numberOfServings?: string;
        ingredients?: string[];
        steps?: string[];
    }>({});
    //#endregion

    //#region //* DATA FETCHING
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const { data } = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('/api/ingredient');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }

                const { data } = await response.json();
                setAvailableIngredients(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };
        fetchIngredients();
    }, []);
    //#endregion

    //#region //* RECIPE
    // Fonction pour gérer le changement d'un champ spécifique de la recette
    const handleRecipeChange = (key: keyof typeof recipe, value: string | number) => {
        setRecipe((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    //#endregion

    //#region //* INGREDIENTS
    // Fonction pour gérer le changement d'un champ spécifique d'un ingrédient
    const handleIngredientChange = <T extends keyof RecipeIngredient>(index: number, field: T, value: RecipeIngredient[T]) => {
        const updatedIngredients = [...ingredients]; // Création d'une copie du tableau des ingrédients pour éviter de muter l'état directement        
        updatedIngredients[index][field] = value; // Mise à jour du champ spécifié de l'ingrédient à l'index donné
        setIngredients(updatedIngredients);// Mise à jour de l'état avec le tableau des ingrédients modifié
    };

    // Fonction pour ajouter un nouvel ingrédient vide à la liste
    const addIngredient = () => {
        setIngredients([...ingredients, { ingredientId: '', quantity: 0, unit: IngredientUnit.GRAM }]); // Ajout d'un nouvel ingrédient vide avec des valeurs par défaut pour chaque champ
    };

    // Fonction pour supprimer un ingrédient de la liste en fonction de son index
    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index); // Filtrage des ingrédients pour exclure celui à l'index donné       
        setIngredients(updatedIngredients); // Mise à jour de l'état avec le tableau filtré (sans l'ingrédient supprimé)
    };
    //#endregion

    //#region //* STEPS
    // Fonction pour gérer le changement d'un champ spécifique d'une étape
    const handleStepChange = <T extends keyof RecipeStep>(index: number, field: T, value: RecipeStep[T]) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    // Fonction pour ajouter une nouvelle étape
    const addStep = () => {
        setSteps([...steps, { stepNumber: steps.length + 1, description: '', duration: 0 }]);
    }

    // Fonction pour supprimer une étape
    const removeStep = (index: number) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    }
    //#endregion

    //#region //* SCHEMA VALIDATION
    const recipeSchema = z.object({
        name: z.string({ required_error: "Name field is missing" }).min(1, 'Recipe name is required'),
        categoryId: z.string({ required_error: "Category field is missing" }).min(1, 'Category is required'),
        imageUrl: z.string({ required_error: "Image field is missing" }).optional(),
        cookingTime: z.number({ required_error: "Cooking time field is missing" }).min(1, 'Cooking time must be greater than 0'),
        numberOfServings: z.number({ required_error: "Number of servings field is missing" }).min(1, 'Number of servings must be greater than 0'),
        ingredients: z.array(
            z.object({
                ingredientId: z.string({ required_error: "Ingredient field is missing" }).min(1, 'Ingredient is required'),
                quantity: z.number({ required_error: "Quantity field is missing" }).min(1, 'Quantity must be greater than 0'),
                unit: z.nativeEnum(IngredientUnit, { required_error: "Unit field is missing", invalid_type_error: "Invalid unit selected" }),
            })
        ).min(1, 'At least one ingredient is required'),
        steps: z.array(
            z.object({
                stepNumber: z.number(),
                description: z.string({ required_error: "Description field is missing" }).min(1, 'Description is required'),
                duration: z.number({ required_error: "Duration field is missing" }).min(1, 'Duration must be greater than 0'),
            })
        ).min(1, 'At least one step is required'),
    });
    //#endregion

    //#region //* SUBMISSION
    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Je crée un objet recipeData qui contient toutes les informations de la recette que je viens de saisir
        const recipeData = {
            ...recipe,
            ingredients,
            steps,
        };

        // Je crée un objet newErrors qui va contenir les erreurs de validation
        const newErrors: { [key: string]: string } = {};

        try {
            recipeSchema.parse(recipeData);

            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                setMessage('Recipe added successfully');
                setRecipe({
                    name: '',
                    categoryId: '',
                    imageUrl: '',
                    cookingTime: 0,
                    numberOfServings: 0,
                });
                setIngredients([{ ingredientId: '', quantity: 0, unit: IngredientUnit.GRAM }]);
                setSteps([{ stepNumber: 1, description: '', duration: 0 }]);
                setErrors({});
            } else {
                const errorText = await response.text();
                setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((error) => {
                    if (error.path.length > 0) {
                        newErrors[error.path[0]] = error.message;
                    }
                });
                setErrors(newErrors);
            } else {
                console.log('Error in handleSubmit:', error);
                setMessage(`Error: ${error}`);
            }
        }
    };
    //#endregion

    return (
        <div className="p-4 bg-red-200 text-black">
            <h1 className="text-lg font-bold mb-4">Add a recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <FormInput
                    htmlFor="recipeName"
                    labelText="Name of the recipe"
                    idName="recipeName"
                    type="text"
                    value={recipe.name}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    onChange={(e) => handleRecipeChange('name', e.target.value)}
                    placeholder="Name of the recipe"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={recipe.categoryId}
                        onChange={(e) => handleRecipeChange('categoryId', e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category: { id: string; name: string }) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.categoryId && <p className="text-red-500">{errors.categoryId}</p>}

                {/* ImageUrl */}
                <FormInput
                    htmlFor="recipeImageUrl"
                    labelText="Image URL"
                    idName="recipeImageUrl"
                    type="text"
                    value={recipe.imageUrl}
                    onChange={(e) => handleRecipeChange('imageUrl', e.target.value)}
                    placeholder="Image URL"
                />
                {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}

                {/* Cooking Time */}
                <FormInput
                    htmlFor="cookingTime"
                    labelText="Cooking Time (minutes)"
                    idName="cookingTime"
                    type="number"
                    value={recipe.cookingTime}
                    onChange={(e) => handleRecipeChange('cookingTime', parseInt(e.target.value, 10))}
                    placeholder="Cooking Time"
                />
                {errors.cookingTime && <p className="text-red-500">{errors.cookingTime}</p>}

                {/* Number of servings */}
                <FormInput
                    htmlFor="numberOfServings"
                    labelText="Number of servings"
                    idName="numberOfServings"
                    type="number"
                    value={recipe.numberOfServings}
                    onChange={(e) => handleRecipeChange('numberOfServings', parseInt(e.target.value, 10))}
                    placeholder="Number of servings"
                />
                {errors.numberOfServings && <p className="text-red-500">{errors.numberOfServings}</p>}

                {/* Ingredients */}
                <div className="space-y-4">
                    <h2 className="text-md font-semibold">Ingredients</h2>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <select
                                value={ingredient.ingredientId}
                                onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value as IngredientUnit)}
                                required
                                className="border p-1"
                            >
                                <option value="">Select an ingredient</option>
                                {availableIngredients.map((ingredient: { id: string; name: string }) => (
                                    <option key={ingredient.id} value={ingredient.id}>
                                        {ingredient.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value as IngredientUnit))}
                                placeholder="Quantity"
                                required
                                className="border p-1"
                            />

                            <select
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value as IngredientUnit)}
                                required
                                className="border p-1"
                            >
                                <option value="">Select a unit</option>
                                {units.map((unit, idx) => (
                                    <option key={idx} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                X
                            </button>

                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Add Ingredient
                    </button>
                </div>
                {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}

                {/* Steps */}
                <div className='space-y-4'>
                    <h2>Add a step</h2>
                    {steps.map((step, index) => (
                        <div key={index} className="flex space-x-2">
                            <div className='flex flex-col'>
                                <label htmlFor={`step-${index}-description`}>Step {step.stepNumber} Description</label>
                                <textarea
                                    id={`step-${index}-description`}
                                    value={step.description}
                                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                    placeholder={`Description of step ${step.stepNumber}`}
                                    required
                                />
                                <label htmlFor={`step-${index}-duration`}>Duration (minutes)</label>
                                <input
                                    type="number"
                                    id={`step-${index}-duration`}
                                    value={step.duration}
                                    onChange={(e) => handleStepChange(index, 'duration', parseInt(e.target.value))}
                                    placeholder="Duration"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeStep(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                X
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addStep} className='bg-blue-500 text-white px-2 py-1 rounded'>
                        Add step
                    </button>
                </div>
                {errors.steps && <p className="text-red-500">{errors.steps}</p>}

                {/* Submit button */}

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Add Recipe
                </button>
            </form>

            {message && <p className="mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default AddRecipe;