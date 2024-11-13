"use client";

import Image from "next/image";
import { checkUserRole } from "../utils/userUtils";
import { useSession } from "@clerk/nextjs";

export default function Home() {
    const { session } = useSession();
    const userRole = checkUserRole(session);

    return (
        <section>
            <h1>Home</h1>
            {session ? (
                <p>Welcome, you are connected !</p>
            ) : (
                <p>Welcome, you are not connected !</p>
            )}
        </section>
    );
}
