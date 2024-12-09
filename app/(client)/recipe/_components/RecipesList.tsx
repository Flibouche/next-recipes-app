"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import RecipeCard from './RecipeCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Recipe {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    category: Category;
    numberOfServings: number;
    cookingTime: number;
}

interface Category {
    id: string;
    name: string;
}

interface RecipesList {
    recipes: Recipe[];
}

const RecipesList = ({ recipes }: RecipesList) => {
    return (
        <Swiper
            modules={[Navigation, A11y, Autoplay]}
            a11y={{
                enabled: true,
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            }}
            spaceBetween={35}
            slidesPerView={4}
            navigation={true}
            autoplay={{
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }}
            loop={true}
            slideNextClass='bg-red-700'
            slideActiveClass='bg-pink-500'
            centeredSlides={true}
            wrapperClass='bg-blue-500'
        >
            {recipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                    <RecipeCard
                        id={recipe.id}
                        slug={recipe.slug}
                        imageUrl={recipe.imageUrl}
                        name={recipe.name}
                        category={recipe.category}
                        numberOfServings={recipe.numberOfServings}
                        cookingTime={recipe.cookingTime}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default RecipesList