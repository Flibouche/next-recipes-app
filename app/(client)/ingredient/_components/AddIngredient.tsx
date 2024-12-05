"use client";

import { useState } from 'react'
import toast from 'react-hot-toast';

interface AddIngredientProps {
    onIngredientAdded: () => void;
}

const AddIngredient = ({ onIngredientAdded }: AddIngredientProps) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/ingredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setName('');
                setMessage('Ingredient added successfully');
                setError('');
                onIngredientAdded();
            } else {
                const errorText = await response.text();
                console.log(errorText);
                toast.error(errorText)
                // setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            toast.error("This didn't work.")
            setMessage(`Error: ${error}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor={name}>Name</label>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name of the ingredient'
                required
            />
            <button type='submit' className='my-3 rounded-3xl bg-primary px-7 py-3 font-bold text-text-50 hover:bg-primary-700'>Add ingredient</button>
        </form>
    );
};

export default AddIngredient