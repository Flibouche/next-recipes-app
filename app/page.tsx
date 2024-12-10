"use client";

import Image from "next/image";
import { ImQuotesLeft } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";

export default function Home() {
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

    return (
        <>
            {/* Hero */}
            <section className="relative bg-primary-50 py-20 md:min-h-[60vh] lg:min-h-[92vh]">
                {/* Background image */}
                <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-center gap-10 px-6 md:flex-row md:gap-[3%]">
                    <div className="flex w-full justify-center md:w-1/2">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={450}
                            height={450}
                            className="hidden md:block md:rounded-e-full"
                        />
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={600}
                            height={450}
                            className="h-[450px] rounded-bl-xl rounded-br-[10%] rounded-tl-[10%] rounded-tr-xl object-cover md:hidden"
                        />
                    </div>
                    <div className="mx-auto w-full max-w-screen-xl space-y-4 px-3 md:w-1/2">
                        <h1 className="text-4xl font-bold uppercase text-primary md:text-6xl">Your <br /> <span className="text-6xl md:text-7xl lg:text-8xl">Next.js</span><br />cooking recipe</h1>
                        <h2 className="text-xl">Discover Recipes Crafted by Food Lovers, for Food Lovers</h2>
                        <p>Unleash your inner chef with dishes designed to inspire, created with passion, and perfect for every skill level. Join our community and turn everyday meals into extraordinary moments.</p>
                        <Link href="/recipe">
                            <button className="my-3 rounded-3xl bg-primary px-7 py-3 font-bold text-text-50 hover:bg-primary-700">
                                Discover all recipes
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sponsors swiper */}
            <section className="h-[20vh] bg-white">
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
            </section>

            {/* Citation */}
            <section className="bg-accent-100 py-20 md:h-[60vh] lg:h-[80vh]">
                <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center space-y-5 px-6">
                    <ImQuotesLeft className="text-4xl text-secondary-800" />
                    <p className="text-center text-2xl md:text-3xl">Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors... It&apos;s how you combine them that sets you apart. Each meal is a canvas, each ingredient a color, and every chef an artist creating something unique and memorable.</p>
                    <span className="italic md:text-lg">Claude Anthropic - 2024</span>
                </div>
            </section>

            {/* About */}
            <section className="py-20 md:h-[60vh] md:py-0">
                <div className="grid grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-0">
                    {/* Section texte */}
                    <div className="mx-auto max-w-screen-xl px-6">
                        <h2 className="text-4xl font-bold">About</h2>
                        <p className="mt-4 leading-relaxed">
                            Our Chefs offer you perfect cooking, best served dishes with fresh ingredients and old recipes.
                        </p>
                        <p className="mt-4 leading-relaxed">
                            We have carefully sourced and seasonal ingredients in our disposal to make rustic dishes.
                        </p>
                        <a
                            href="#"
                            className="mt-6 inline-block rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-900"
                        >
                            Read More
                        </a>
                    </div>

                    {/* Section image */}
                    <div className="relative h-[60vh] w-full overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732314440/chef.jpg"
                            alt="Chefs"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="rounded-bl-[10%] rounded-br-xl rounded-tl-xl rounded-tr-[10%] object-cover md:rounded-none"
                        />
                    </div>
                </div>
            </section>

            {/* Last Recipes */}
            <section className="h-[65vh] bg-accent-100">
                <div className="container flex h-full flex-col items-center justify-center space-y-5">
                    <ImQuotesLeft className="text-4xl text-secondary-800" />
                    <p className="text-center text-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, tempora! Repellendus, deleniti totam iste omnis, adipisci cum modi qui dicta aperiam eum at delectus quaerat dolore. Consequatur delectus aspernatur deserunt.</p>
                    <span className="italic md:text-sm">Lorem ipsum dolor sit amet.</span>
                </div>
            </section>
        </>
    );
}
