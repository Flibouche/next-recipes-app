export interface ApiResponse<T> {
    data?: T;
    message: string;
    success: boolean;
}

export interface ErrorDisplayProps {
    message: string
    reset: () => void
}

export interface Recipe {
    id: string;
    name: string;
}