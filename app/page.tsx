"use client";

import Image from "next/image";
// import { checkUserRole } from "../utils/userUtils";
// import { useSession, useUser } from "@clerk/nextjs";
import { ImQuotesLeft } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home() {
    // const { session } = useSession();
    // const { user } = useUser();
    // const userRole = checkUserRole(session);

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
        <div>
            {/* Hero */}
            <section className="relative h-screen bg-primary-50 py-20">
                {/* Background image */}
                <div className="container flex flex-row items-center gap-[3%]">
                    <div className="flex w-1/2 justify-center">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={450}
                            height={450}
                            className="rounded-e-full"
                        />
                    </div>
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-6xl font-bold uppercase text-primary">Your <br /> <span className="text-8xl">Next.js</span><br />cooking recipe</h1>
                        <h2 className="text-xl">Discover Recipes Crafted by Food Lovers, for Food Lovers</h2>
                        <p>Unleash your inner chef with dishes designed to inspire, created with passion, and perfect for every skill level. Join our community and turn everyday meals into extraordinary moments.</p>
                        <button className="rounded-3xl bg-primary px-7 py-3 font-bold text-text-50">Discover all recipes</button>
                    </div>
                </div>
            </section>

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
                                width={180}
                                height={300}
                                className="grayscale duration-300 ease-in-out hover:grayscale-0"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section className="h-[65vh] bg-accent-100">
                <div className="container flex h-full flex-col items-center justify-center space-y-5">
                    <ImQuotesLeft className="text-4xl text-secondary-800" />
                    <p className="text-center text-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, tempora! Repellendus, deleniti totam iste omnis, adipisci cum modi qui dicta aperiam eum at delectus quaerat dolore. Consequatur delectus aspernatur deserunt.</p>
                    <span className="text-sm italic">Lorem ipsum dolor sit amet.</span>
                </div>
            </section>

            <section className="mx-auto">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    {/* Section texte */}
                    <div>
                        <h2 className="text-3xl font-bold">About</h2>
                        <p className="mt-4 leading-relaxed text-gray-700">
                            Our Chefs offer you perfect cooking, best served dishes with fresh ingredients and old recipes.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-700">
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
                    <div className="relative h-[500px] w-full overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732314440/chef.jpg"
                            alt="Chefs"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </div>
                </div>
            </section>

            {/* <h1>Home</h1>
            {session ? (
                <p>Welcome, you are connected !</p>
            ) : (
                <p>Welcome, you are not connected !</p>
            )}

            {user?.publicMetadata?.role ? (
                <p className="mt-2 text-red-700">{String(user.publicMetadata.role)}</p>
            ) : (
                <p className="mt-2 text-red-500">Aucune description n'est encore définie.</p>
            )}
            {user?.publicMetadata?.description ? (
                <p className="mt-2 text-red-700">{String(user.publicMetadata.description)}</p>
            ) : (
                <p className="mt-2 text-red-500">Aucune description n'est encore définie.</p>
            )} */}



        </div>
    );
}
