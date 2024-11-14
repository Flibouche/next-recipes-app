import { ErrorDisplayProps } from "@/lib/types/types"

const ErrorDisplay = ({ message, reset }: ErrorDisplayProps) => {
    return (
        <div>
            <h2>{message}</h2>
            <button
                onClick={() => reset()}
            >
                Try again !
            </button>
        </div>
    )
}

export default ErrorDisplay