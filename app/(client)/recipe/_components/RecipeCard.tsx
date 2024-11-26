import { Recipe } from '@/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoMdPerson, IoIosTimer } from 'react-icons/io';

const RecipeCard = ({ id, imageUrl, name, category, numberOfServings, cookingTime }: Recipe) => {
    return (
        <div
            key={id}
            className='group'
        >
            <Link href={`/recipe/${id}`}>
                {imageUrl ? (
                    <div className="relative">
                        <div className='overflow-hidden'>
                            <Image
                                src={imageUrl}
                                alt={name}
                                width={500}
                                height={500}
                                className="h-auto w-full border-2 border-red-500 object-cover transition duration-300 ease-out group-hover:scale-110"
                            />
                        </div>
                        <div className="flex justify-center">
                            <h2 className="absolute bottom-0 bg-white px-5 py-2 text-center text-sm font-bold uppercase text-blue-500">
                                {category?.name}
                            </h2>
                        </div>
                    </div>
                ) : (
                    <p>No image available</p>
                )}
                <div className="mt-2 flex justify-center capitalize">
                    <h2 className="text-lg font-bold">{name}</h2>
                </div>
                <div className="mt-2 flex justify-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <IoMdPerson />
                        <p>{numberOfServings} servings</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <IoIosTimer />
                        <p>{cookingTime} mins</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecipeCard;
