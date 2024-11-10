"use client";

import { useEffect, useState } from "react";

// Components
import ErrorDisplay from "@/components/ErrorDisplay";

interface ErrorProps {
    error: Error
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(error.message);
        console.error(error);
    }, [error]);

    return (
        <>
            <h1>App Page Error</h1>
            <ErrorDisplay message={message} reset={reset} />
        </>
    )
}