import { UserResource } from '@clerk/types';

// API

export interface ApiResponse<T> {
    data?: T;
    message: string;
    success: boolean;
}

// Error

export interface ErrorDisplayProps {
    message: string
    reset: () => void
}

// Form

export interface FormInputProps {
    htmlFor: string;
    labelText: string;
    idName: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

// Session

export interface Session {
    user: UserResource;
}