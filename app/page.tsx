"use client";

import Image from "next/image";
import { checkUserRole } from "../utils/userUtils";
import { useSession, useUser } from "@clerk/nextjs";

export default function Home() {
    const { session } = useSession();
    const { user } = useUser();
    const userRole = checkUserRole(session);

    return (
        <section>
            <h1>Home</h1>
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
        </section>
    );
}
