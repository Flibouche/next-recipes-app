"use client";

// React
import React, { useState } from 'react'

// Packages
import toast from 'react-hot-toast';

// Components
import FormInput from '@/components/FormInput';

interface AddIngredientProps {
    onIngredientAdded: () => void;
}

interface IngredientResponse {
    message: string;
}

// Le composant AddIngredient permet aux utilisateurs d'ajouter un nouvel ingrédient à la liste.
// Il prend une prop `onIngredientAdded` qui est une fonction de rappel pour rafraîchir la liste des ingrédients après l'ajout d'un nouvel ingrédient.
export default function AddIngredient({ onIngredientAdded }: AddIngredientProps) {
    // Etat local pour stocker le nom de l'ingrédient
    const [name, setName] = useState<string>('');

    // Fonction pour gérer la soumission du formulaire et ajouter un nouvel ingrédient
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            // 1. Appel de l'API pour ajouter un ingrédient
            const response: Response = await fetch('/api/ingredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            // 2. Vérification de la réponse de l'API
            if (response.ok) {
                setName('');
                toast.success('Ingredient added successfully');
                onIngredientAdded();
            } else {
                const errorData: IngredientResponse = await response.json();
                console.log(errorData.message);
                toast.error(`Error: ${errorData.message}`);
            }

        } catch (error) { // 3. Si une erreur se produit, affichez un message d'erreur
            console.error('Error adding ingredient:', error);
            toast.error(`An unexpected error occurred. Please try again later.`);

        } finally {  // 4. Dans tous les cas, réinitialisez le nom de l'ingrédient
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <FormInput
                htmlFor='name'
                labelText='Name'
                idName='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name of the ingredient'
            />
            <button type='submit' className='my-3 rounded-3xl bg-primary px-7 py-3 font-bold text-text-50 hover:bg-primary-700'>Add ingredient</button>
        </form>
    );
};