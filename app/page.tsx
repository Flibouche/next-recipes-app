"use client";

import Image from "next/image";
import { checkUserRole } from "../utils/userUtils";
import { useSession, useUser } from "@clerk/nextjs";

export default function Home() {
    const { session } = useSession();
    const { user } = useUser();
    const userRole = checkUserRole(session);

    return (
        <div>
            {/* Hero */}
            <section className="relative h-[100vh] py-20">
                {/* Background image */}
                <div className="container flex flex-row items-center gap-[3%]">
                    <div className="w-[50%] flex justify-center">
                        <Image
                            src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732360066/next-recipe-hero.jpg"
                            alt="Hero"
                            width={450}
                            height={450}
                        />
                    </div>
                    <div className="w-[50%] space-y-4">
                        <h1 className="text-7xl text-primary font-bold uppercase">Your <br /> <span className="text-8xl">Next.js</span><br />cooking recipe</h1>
                        <h2 className="text-xl">Discover Recipes Crafted by Food Lovers, for Food Lovers</h2>
                        <p>Unleash your inner chef with dishes designed to inspire, created with passion, and perfect for every skill level. Join our community and turn everyday meals into extraordinary moments.</p>
                        <button className="bg-primary py-3 px-7 rounded-3xl text-text-50 font-bold">Discover all recipes</button>
                    </div>
                </div>
            </section>

            <section className="h-[45vh] bg-secondary-100"></section>

            <section className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Section texte */}
                    <div>
                        <h2 className="text-3xl font-bold">About</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            Our Chefs offer you perfect cooking, best served dishes with fresh ingredients and old recipes.
                        </p>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            We have carefully sourced and seasonal ingredients in our disposal to make rustic dishes.
                        </p>
                        <a
                            href="#"
                            className="mt-6 inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-900"
                        >
                            Read More
                        </a>
                    </div>

                    {/* Section image */}
                    <div className="relative w-full h-[500px] overflow-hidden">
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
