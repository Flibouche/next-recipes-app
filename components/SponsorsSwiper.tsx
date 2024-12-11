"use client";

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

const sponsors = [
    {
        name: "Cristel",
        alt: "Cristel",
        image: "/marques/cristel.jpg",
    },
    {
        name: "De Buyer",
        alt: "De Buyer",
        image: "/marques/debuyer.jpg",
    },
    {
        name: "Gobel",
        alt: "Gobel",
        image: "/marques/gobel.jpg",
    },
    {
        name: "Le Creuset",
        alt: "Le Creuset",
        image: "/marques/lecreuset.jpg",
    },
    {
        name: "Magimix",
        alt: "Magimix",
        image: "/marques/magimix.jpg",
    },
    {
        name: "Mauviel 1830",
        alt: "Mauviel 1830",
        image: "/marques/mauviel1830.jpg",
    },
    {
        name: "Monbento",
        alt: "Monbento",
        image: "/marques/monbento.jpg",
    },
    {
        name: "Opinel",
        alt: "Opinel",
        image: "/marques/opinel.jpg",
    },
    {
        name: "Peugeot",
        alt: "Peugeot",
        image: "/marques/peugeot.jpg",
    },
    {
        name: "Roger Orfèvre",
        alt: "Roger Orfèvre",
        image: "/marques/rogerorfevre.jpg",
    },
    {
        name: "Staub",
        alt: "Staub",
        image: "/marques/staub.jpg",
    },
    {
        name: "Valrhona",
        alt: "Valrhona",
        image: "/marques/valrhona.jpg",
    }
]

const SponsorsSwiper = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            autoplay={true}
            slidesOffsetBefore={50}
            loop={true}
            breakpoints={{
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }}
        >
            {sponsors.map((sponsor, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={sponsor.image}
                        alt={sponsor.alt}
                        width={200}
                        height={180}
                        className="grayscale duration-300 ease-in-out hover:grayscale-0"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SponsorsSwiper;