"use client";

import { useState } from 'react'
import toast from 'react-hot-toast';

const AddIngredient = () => {
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
            } else {
                const errorText = await response.text();
                toast.error(errorText)
                // setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            toast.error("This didn't work.")
            setMessage(`Error: ${error}`);
        }
    }

    return (
        <div>
            <h1>Add an ingredient</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of the ingredient'
                    required
                />
                <button type='submit'>Add ingredient</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddIngredient