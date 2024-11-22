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
            <section className="relative h-[500px] bg-cover bg-center text-white py-20">
                {/* Background image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="https://res.cloudinary.com/dqg5ioq7x/image/upload/v1732313991/background.jpg"
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>

                <div className="mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase">Your Next.js recipes</h1>
                    <p className="mt-4 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a
                        href="#menu"
                        className="mt-6 inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
                    >
                        See Our Menu
                    </a>
                </div>
            </section>

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
