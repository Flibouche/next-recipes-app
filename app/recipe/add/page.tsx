"use client";

import { useState } from 'react'

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setMessage('Recipe added successfully');
                setName('');
            } else {
                const errorText = await response.text();
                setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            setMessage(`Error: ${error}`);
        }
    }

    return (
        <div>
            <h1>Add a recipe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of the recipe'
                    required
                />
                <button type='submit'>Add recipe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRecipe