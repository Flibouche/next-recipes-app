"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import RecipeCard from './RecipeCard';
import { RecipeList } from '@/lib/types/types';
import 'swiper/css';

const RecipesList = ({ recipes }: RecipeList) => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {recipes.map((recipe) => (
                    <SwiperSlide key={recipe.id}>
                        <RecipeCard
                            id={recipe.id}
                            imageUrl={recipe.imageUrl}
                            name={recipe.name}
                            category={recipe.category}
                            numberOfServings={recipe.numberOfServings}
                            cookingTime={recipe.cookingTime}
                        />
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    )
}

export default RecipesList