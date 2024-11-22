import { Recipe } from '@/lib/types/types';
import Image from 'next/image';
import React from 'react';
import { IoMdPerson, IoIosTimer } from 'react-icons/io';

const RecipeCard = ({ id, imageUrl, name, category, numberOfServings, cookingTime }: Recipe) => {
    return (
        <div key={id}>
            {imageUrl ? (
                <div className="relative">
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                    <div className="flex justify-center">
                        <h2 className="absolute bottom-0 py-2 px-5 bg-white text-center text-blue-500 font-bold text-sm uppercase">
                            {category?.name}
                        </h2>
                    </div>
                </div>
            ) : (
                <p>No image available</p>
            )}
            <div className="flex justify-center capitalize mt-2">
                <h2 className="font-bold text-lg">{name}</h2>
            </div>
            <div className="flex justify-center gap-4 mt-2">
                <div className="flex flex-row items-center gap-2">
                    <IoMdPerson />
                    <p>{numberOfServings} servings</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <IoIosTimer />
                    <p>{cookingTime} mins</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
